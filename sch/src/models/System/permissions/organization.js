import { message } from "antd";
import {
  deleteByIds,
  getByParentId,
  getRecursionByParentId,
  getRegion,
  update
} from "../../../services/System/permissions/organization";
import { addEditError, addEditSuccess } from "../../../utils/messages";

/**
 * 组织机构
 * @吴昊
 * */
export default {
  namespace: 'organization',
  state: {
    loading: false,
    treeData: [],
    visible: false,
    spinLoad: false,
    modalsList: [],
    confirmLoading: false,
    list: [],
    treeList: [],
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
          loading: false,
          treeData: [],
          visible: false,
          spinLoad: false,
          modalsList: [],
          confirmLoading: false,
          list: [],
          treeList: [],
        },
      });
    },

    // 获取组织机构树
    *getOrgTree({ payload, callback }, { call, put }) {
      const { id, orgTreeData } = payload;
      let datas = [];
      let treeData = [];
      // const data = yield call(getRecursionByParentId, { id });
      const data = yield call(getRecursionByParentId, { id });
      if (data.statusCode === 200) {
        datas = data.content.map((item, index) => {
          item.title = item.orgNameCn;
          item.value = item.orgCode;
          item.key = item.orgId;
          if (item.children) {
            item.children = getTreeData(item.children);
          }
          return item;
        });
        treeData = data.content.map((item, index) => {
          item.title = item.orgNameCn;
          item.value = item.orgCode;
          item.key = item.orgId;
          if (item.children) {
            item.children = getTreeData2(item.children);
          }
          return item;
        });
      } else if (data.statusCode === 500) {
        // message.error('查询失败，系统错误是：' + data.message);
      }
      // orgTreeData[0].children = datas;
      payload.orgId = datas[0].value;
      yield put({
        type: 'commonState',
        payload: {
          list: datas,
          treeList: treeData,
        },
      });
    },

    // 根据父级机构获取一级子机构
    *getByParentId({ payload }, { call, put }) {
      yield put({
        type: 'commonState',
        payload: {
          loading: true,
        },
      });
      const data = yield call(getByParentId, payload);
      if (data.statusCode === 200) {
        let datas = data.content.map((item) => {
          item.title = item.orgNameCn;
          item.key = 'organization_getByParentId_' + item.orgId;
          return item;
        });
        yield put({
          type: 'commonState',
          payload: {
            treeData: datas,
            loading: false,
          },
        });
      } else if (data.statusCode === 500) {
        // message.error('查询失败，系统错误是：' + data.message);
      }
    },

    // 添加子机构 / 修改机构
    *add({ payload, callback }, { call, put }) {
      const { organization, modalsList } = payload;
      const data = yield call(update, { organization });
      if (data.statusCode === 200) {
        addEditSuccess(modalsList);
        if (callback) callback();
      } else if (data.statusCode === 500) {
        addEditError(modalsList, data);
      }
    },

    // 批量删除机构
    *deletes({ payload, callback }, { call, put }) {
      const data = yield call(deleteByIds, payload);
      if (data.statusCode === 200) {
        message.success('删除成功');
        callback();
      } else if (data.statusCode === 500) {
        // message.error('删除失败! 错误：' + data.message);
      }
    },

    // 行政区域
    *getRegion({ payload, callback }, { call, put }) {
      const data = yield call(getRegion, payload);
      if (data.statusCode === 200) {
        message.success('删除成功');
        callback();
      } else if (data.statusCode === 500) {
        // message.error('删除失败! 错误：' + data.message);
      }
    },
  },
  reducers: {
    commonState(state, action) {
      return { ...state, ...action.payload };
    },
  },
};

// 重新给子级菜单赋值，变为树形菜单数据
function getTreeData(arrList) {
  arrList.map((item) => {
    item.title = item.orgNameCn;
    item.value = item.orgCode;
    item.key = item.orgId;
    if (item.children) {
      item.children = getTreeData(item.children);
    }
    return item;
  });
  return arrList;
}

// 重新给子级菜单赋值，变为树形菜单数据
function getTreeData2(arrList) {
  arrList.map((item) => {
    item.title = item.orgNameCn;
    item.value = item.orgCode;
    item.key = item.orgId;
    if (item.children) {
      item.children = getTreeData(item.children);
    }
    return item;
  });
  return arrList;
}

/**
 * @method zhuanZuZhi
 * @param {Array} arr
 * @return {number} result 返回结果
 */
// function zhuanZuZhi(arr) {
//     const arrMap = new Map();
//     let roots = null;
//     arr.forEach(function (item, index) {
//         const parId = item.parId;
//         item.key = "organization_getByParentId_" + item.orgId;
//         if (index === 0) {
//             item.children = [];
//             item.title = item.name;
//             item.value = item.orgId;
//             roots = item;
//         } else {
//             if (arrMap.has(parId)) {
//                 const mapItem = arrMap.get(parId);
//                 mapItem.push(item);
//             } else {
//                 arrMap.set(parId, [item]);
//             }
//         }
//     });
//     roots.children = eachChild(roots, arrMap);
//     return [roots];
// }

/**
 * @method eachChild
 * @param {object} nodes 对象
 * @param {Map} mapArr 存储所有的父节点的子集
 */
// function eachChild(nodes, mapArr) {
//     const orgId = nodes.orgId;
//     if (mapArr.has(orgId)) {
//         let list = mapArr.get(orgId);
//         let test = list.map((item) => {
//             item.children = eachChild(item, mapArr);
//             item.title = item.name;
//             item.value = item.orgId;
//             return item;
//         });
//         // nodes.children = test;
//         return test;
//     } else {
//         // nodes.children = null;
//         return null;
//     }
//
// }
