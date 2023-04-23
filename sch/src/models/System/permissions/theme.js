import { deleteByIds, getAllMenuTree, update } from "../../../services/System/permissions/theme";
import { addEditError, addEditSuccess } from "../../../utils/messages";
import { message } from "antd";

/**
 * 菜单管理
 * @吴昊
 * */
export default {
  namespace: 'theme',
  state: {
    loading: false,
    list: [],
    visible: false,
    spinLoad: false,
    modalsList: [],
    confirmLoading: false,
    name: '',
    isInvalid: false,
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
          list: [],
          pagination: {
            showSizeChanger: false,
            showTotal: (total) => `共 ${total} 条`,
            total: null,
            size: 'default',
            current: 1,
          },
          visible: false,
          spinLoad: false,
          modalsList: [],
          confirmLoading: false,
          name: '',
          isInvalid: false,
          queryPager: {
            conditions: [],
            firstResult: 0,
            orderConditions: [],
            pageIndex: 1,
            pageSize: 10,
            recordCount: 0,
          },
        },
      });
    },

    *getPage({ payload }, { call, put }) {
      yield put({
        type: 'commonState',
        payload: {
          loading: true,
        },
      });
      let list = [];
      const data = yield call(getAllMenuTree, payload);
      if (data.statusCode === 200) {
        list = data.content.map((item, index) => {
          item.title = item.menuName;
          item.value = item.menuId;
          item.key = 'theme_getPage_' + item.menuId;
          item.visible = true;
          if (item.children) {
            item.children = setTreeData(item.children);
          }
          return item;
        });
        /* start 忘记逻辑，暂时先注释，后面有问题再改 @wuhao 2020-07-30 ******/
        // const USERINFO = data.content;
        // const geMenu = USERINFO.menuTree || [];
        // let mentTree = [];
        // if (geMenu.length > 0 && geMenu[0].menuName === "系统管理") {
        //     mentTree = geMenu[0].children;
        // } else {
        //     mentTree = geMenu;
        // }
        // // localStorage.setItem("tsvcloud_menuTree", JSON.stringify(mentTree));
        // yield put({
        //     type: 'caiDanTree',
        //     payload: {
        //         list: mentTree,
        //     },
        // });
        /* end 忘记逻辑，暂时先注释，后面有问题再改 @wuhao 2020-07-30 ******/
      } else if (data.statusCode === 500) {
        // message.error(data.message);
      }
      yield put({
        type: 'commonState',
        payload: {
          list,
          loading: false,
        },
      });
    },

    *add({ payload, callback }, { call, put }) {
      const { menu, modalsList } = payload;
      const data = yield call(update, { menu });
      if (data.statusCode === 200) {
        addEditSuccess(modalsList);
        if (callback) callback();
      } else if (data.statusCode === 500) {
        addEditError(modalsList, data);
      }
      yield put({
        type: 'commonState',
        payload: {
          confirmLoading: false,
        },
      });
    },

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
  },
  reducers: {
    commonState(state, action) {
      return { ...state, ...action.payload };
    },
    /* start 忘记逻辑，暂时先注释，后面有问题再改 @wuhao 2020-07-30 ******/
    // caiDanTree(state, action) {
    //     const name = state.name;
    //     const isInvalid = state.isInvalid;
    //     const tree = action.payload.list;
    //     // 名字存在且关闭
    //     if (name !== "" && isInvalid) {
    //    tree.map((item) => {
    //       if (item.menuName.indexOf(name) > -1) {
    //           item.visible = false;
    //       } else {
    //           if (item.children) {
    //               item.children = childTree(item.children, name, isInvalid);
    //           }
    //       }
    //       return item;
    //    });
    //         localStorage.setItem("tsvcloud_menuTree", JSON.stringify(tree));
    //     } else if (name !== "" && isInvalid === false) {
    //         tree.map((item) => {
    //             if (item.menuName.indexOf(name) > -1) {
    //                 item.visible = true;
    //             } else {
    //                 if (item.children) {
    //                     item.children = childTree(item.children, name, isInvalid);
    //                 }
    //             }
    //             return item;
    //         });
    //         localStorage.setItem("tsvcloud_menuTree", JSON.stringify(tree));
    //     }
    //     return {...state, ...action.payload};
    // }
    /* end 忘记逻辑，暂时先注释，后面有问题再改 @wuhao 2020-07-30 ******/
  },
};

// function childTree(list, name, isInvalid) {
//     if (name !== "" && isInvalid) {
//         list.map((item) => {
//             if (item.menuName.indexOf(name) > -1) {
//                 item.visible = false;
//             } else {
//                 if (item.children) {
//                     item.children = childTree(item.children, name, isInvalid);
//                 }
//             }
//             return item;
//         });
//     } else if (name !== "" && isInvalid === false) {
//         list.map((item) => {
//             if (item.menuName.indexOf(name) > -1) {
//                 item.visible = true;
//             } else {
//                 if (item.children) {
//                     item.children = childTree(item.children, name, isInvalid);
//                 }
//             }
//             return item;
//         });
//     }
//     return list;
// }

// 重新给子级菜单赋值，变为树形菜单数据
function setTreeData(arrList) {
  arrList.map((item) => {
    item.title = item.menuName;
    item.value = item.menuId;
    item.key = 'theme_getPage_' + item.menuId;
    item.visible = true;
    if (item.children) {
      item.children = setTreeData(item.children);
    }
    return item;
  });
  return arrList;
}
