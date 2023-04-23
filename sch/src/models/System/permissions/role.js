import {
  deleteByIds,
  getByPage,
  getValidMenuTreeByUser,
  update,
} from '../../../services/System/permissions/role';
import { message } from 'antd';
// import { enableMapSet } from 'immer';
import {
  getByPageState,
  getQueryPager,
} from '../../../utils/queryPage/modelsUtil';

// enableMapSet();
window.num = 0;

/**
 * 角色管理
 * @吴昊
 * */
export default {
  // namespace: 'role',
  namespace: 'roleUser',
  state: {
    queryPager: getQueryPager({
      orderConditions: [
        {
          fieldName: 'T1.name',
          isAsc: false,
        },
      ],
      pageSize: 20,
    }),
    pagination: {
      current: 1,
      pageSize: 20,
      total: 0,
    },
    loading: false,
    list: [],
    permission: [],
    // 存储目录菜单id，用于编辑时的回显判断
    rootMenus: [],
    rootMap: {},
    visible: false,
    spinLoad: false,
    modalsList: [],
  },
  subscriptions: {},
  effects: {
    *commonHandle({ payload }, { call, put }) {
      yield put({
        type: 'commonState',
        payload,
      });
    },

    *clearState({ payload }, { call, put }) {
      yield put({
        type: 'commonState',
        payload: {
          queryPager: getQueryPager({
            orderConditions: [
              {
                fieldName: 'T1.name',
                isAsc: false,
              },
            ],
            pageSize: 20,
          }),
          pagination: {
            current: 1,
            pageSize: 20,
            total: 0,
          },
          loading: false,
          list: [],
          permission: [],
          // 存储目录菜单id，用于编辑时的回显判断
          rootMenus: [],
          rootMap: {},
          visible: false,
          spinLoad: false,
          modalsList: [],
        },
      });
    },

    // 添加
    *add({ payload, callback }, { call, put }) {
      const data = yield call(update, payload);
      let state = false;
      if (data.statusCode === 200) {
        message.success('操作成功！');
        state = true;
      } else {
        // message.error('查询失败，系统错误是：' + data.message);
      }
      if (callback) callback(state);
    },

    // 删除
    *deletes({ payload, callback }, { call, put }) {
      yield put({
        type: 'commonState',
        payload: {
          loading: true,
        },
      });
      const data = yield call(deleteByIds, payload);
      if (data.statusCode === 200) {
        message.success('删除成功');
        callback();
      } else if (data.statusCode === 500) {
        // message.error('删除失败! 错误：' + data.message);
        yield put({
          type: 'commonState',
          payload: {
            loading: false,
          },
        });
      }
    },

    // 获取权限树的下拉数据
    *getPermission({ payload }, { call, put }) {
      let permission = [];
      // 存储目录菜单id，用于编辑时的回显判断
      let rootMenus = [];
      let rootMap = {};
      let data = yield call(getValidMenuTreeByUser, payload);
      if (data.statusCode === 200) {
        permission = data.content.map((item) => {
          let permissionId = item.menuId;
          item.title = item.menuName;
          item.key = permissionId;
          item.value = permissionId;
          if (item.children) {
            item.children = setTreeData(item.children, rootMenus, rootMap);
            rootMenus.push(permissionId);
            rootMap[permissionId] = item.children.map((item) => item.menuId)
          }
          return item;
        });
      } else if (data.statusCode === 500) {
        // message.error(data.message);
      }
      yield put({
        type: 'commonState',
        payload: {
          permission,
          rootMenus,
          rootMap,
        },
      });
    },

    // 分页
    *getPage({ payload }, { call, put }) {
      yield put({
        type: 'commonState',
        payload: {
          loading: true,
        },
      });
      let data = yield call(getByPage, payload);
      yield put({
        type: 'getByPageState',
        payload: {
          data,
          queryPager: payload.queryPager,
        },
      });
    },
  },
  reducers: {
    commonState(state, action) {
      return { ...state, ...action.payload };
    },
    // 修改page页
    getByPageState(state, action) {
      getByPageState(state, action, 'roleUser', 'roleId');
      return state;
    },
    // 结束
  },
};

// 重新给子级菜单赋值，变为树形菜单数据
function setTreeData(arrList = [], rootMenus, rootMap) {
  window.num = window.num + 1;
  arrList.map((item) => {
    item.title = item.menuName;
    item.key = item.menuId;
    if (item.children) {
      rootMenus.push(item.menuId);
      item.children = setTreeData(item.children, rootMenus, rootMap);
      rootMap[item.menuId] = item.children.map((item) => item.menuId);
    }
    return item;
  });
  if (arrList[0].permissionCode) {
    const list = {
      title: '按钮',
      menuId: 1000 + window.num,
      children: null,
      permissionCode: null,
      key: 1000 + window.num,
      value: 1000 + window.num,
      perssionType: 5,
      menuParId: arrList[0].menuParId,
    };
    arrList.push(list);
  }
  return arrList;
}
