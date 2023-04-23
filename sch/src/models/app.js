import { login } from "../services/app";
import { updatePwdById } from "../services/System/permissions/user";
import { getMenuByUserId } from "../services/System/permissions/theme";
import { filterPerssionType } from "../utils/logo/menu";
// import menus from './menuTree';
import { message } from "antd";
import { menuTree } from './menuTree';

// app.js
export default {
  namespace: 'app',
  state: {
    logined: false,
    userName: null,
  },
  subscriptions: {},

  effects: {
    *commonHandle({ payload }, { call, put }) {
      yield put({
        type: 'commonState',
        payload,
      });
    },
    // 登录
    *logins({ payload, callback }, { call, put }) {
      let states = false;
      let data = yield call(login, payload);
      if (data.statusCode === 200) {
        const USERINFO = data.content;
        // const geMenu = USERINFO.menuTree || [];
        const geMenu = menuTree;
        // const geMenu = menus;
        let mentTree = [];
        if (geMenu.length > 0 && geMenu[0].menuName === '系统管理') {
          mentTree = geMenu[0].children;
        } else {
          mentTree = geMenu;
        }
        // console.log('刷新页面');
        // console.log(mentTree);

        // 过滤菜单类型
        const {
          menuTrees,
          perssionBtn = [],
          routers = [],
          routerName = {},
        } = filterPerssionType(mentTree);
        // console.log(menuTrees);
        // console.log('-------------结束--刷新页面---------');

        localStorage.setItem('tsvcloud_logined', true);
        localStorage.setItem('tsvcloud_userId', USERINFO.userId);
        localStorage.setItem('tsvcloud_orgId', USERINFO.orgId);
        localStorage.setItem('tsvcloud_orgName', USERINFO.orgName);
        localStorage.setItem('tsvcloud_userName', USERINFO.userName);
        localStorage.setItem('tsvcloud_realName', USERINFO.realName);
        localStorage.setItem(
          'tsvcloud_isAdmin',
          USERINFO.isAdmin ?? USERINFO.flag1 ?? false,
        );
        localStorage.setItem('tsvcloud_menuTree', JSON.stringify(menuTrees));
        localStorage.setItem(
          'tsvcloud_perssionBtn',
          JSON.stringify(perssionBtn),
        );
        localStorage.setItem('tsvcloud_routers', JSON.stringify(routers));
        localStorage.setItem(
          'tsvcloud_router_name',
          JSON.stringify(routerName),
        );
        localStorage.setItem('tsvcloud_districtId', USERINFO.districtId);
        localStorage.setItem(
          'tsvcloud_isSys',
          USERINFO.isSys ?? USERINFO.flag2 ?? false,
        );
        localStorage.setItem('tsvcloud_token', USERINFO.token);
        localStorage.setItem('tsvcloud_loginTime', new Date().getTime());
        localStorage.setItem('tsvcloud_systemName', 'brain');
        window.error401 = undefined;
        window.error422 = undefined;

        states = true;
      } else {
        // message.error(data.message);
        states = false;
      }

      callback(states, data.message);
    },

    // 刷新系统菜单
    *refreshMenu({ payload, callback }, { call, put }) {
      const data = yield call(getMenuByUserId, payload);
      if (data.statusCode === 200) {
        const USERINFO = data.content;
        // const geMenu = USERINFO.menuTree || [];
        const geMenu = menuTree;

        let mentTree = [];
        console.log('getMenu', geMenu);
        if (geMenu.length > 0 && geMenu[0].menuName === '系统管理') {
          mentTree = geMenu[0].children;
          // mentTree = geMenu[0];
        } else {
          mentTree = geMenu;
        }
        // console.log('刷新页面');
        // console.log(mentTree);

        // 过滤菜单类型
        const {
          menuTrees,
          perssionBtn = [],
          routers = [],
          routerName = {},
        } = filterPerssionType(mentTree);
        // console.log(menuTrees);
        // console.log('-------------结束--刷新页面---------');
        localStorage.setItem('tsvcloud_menuTree', JSON.stringify(menuTrees));
        localStorage.setItem(
          'tsvcloud_perssionBtn',
          JSON.stringify(perssionBtn),
        );
        localStorage.setItem('tsvcloud_routers', JSON.stringify(routers));
        localStorage.setItem(
          'tsvcloud_router_name',
          JSON.stringify(routerName),
        );
        localStorage.removeItem('logout');
        window.__TOKEN = localStorage.getItem('tsvcloud_token');
      } else {
        message.error(data.message);
      }
      window.__userId = localStorage.getItem('tsvcloud_userId') ?? '';
      callback && callback();
    },

    // 用户修改密码
    *editUserPawd({ payload, callback }, { call, put }) {
      const data = yield call(updatePwdById, payload);
      if (data.statusCode === 200) {
        message.success('修改成功，自动退出！');
        window.__userId = undefined;
      } else {
        message.error(data.message);
      }
      if (callback) callback(data.statusCode);
    },
  },

  reducers: {
    commonState(state, action) {
      return { ...state, ...action.payload };
    },
  },
};

// 过滤菜单类型和筛选按钮级别
// function filterPerssionType2(data = []) {
//   // const perssionBtn = [];
//   const perssionBtn = [
//     'sys_org_add',
//     'sys_org_edit',
//     'sys_org_del',
//     'sys_menu_add',
//     'sys_menu_edit',
//     'sys_menu_del',
//     'sys_role_add',
//     'sys_role_edit',
//     'sys_role_del',
//     'sys_role_batchDelete',
//     'sys_user_add',
//     'sys_user_edit',
//     'sys_user_del',
//     'sys_user_batchDelete',
//     'sys_user_batchResetPwd',
//     'lineStation-upDown',
//     'lineTarget_batchImport',
//     'lineTarget_edit',
//     'lineTarget_del',
//     'sys_opinion_edit',
//   ];
//   const menuTrees = data.reduce((newArr, item) => {
//     if (item.menuName === '智慧运营') {
//       if (item.perssionType === 0 || item.perssionType === 3) {
//         if (item.children === null || item.children.length === 0) {
//           newArr.push(item);
//         } else {
//           item.children = eachMenuTree(item.children, perssionBtn);
//           if (item.children.length === 0) item.children = null;
//           newArr.push(item);
//         }
//       } else if (item.perssionType === 1) {
//         // 按钮
//         perssionBtn.push(item.permissionCode);
//       }
//     }
//
//     return newArr;
//   }, []);
//
//   // 权限内指定的菜单
//   let temMenu = menuTrees;
//   // 默认打开首个标签页
//   let defaultTabs = {};
//   // 默认选中首个标签页
//   let defaultMenuKey = '';
//   if (menuTrees.length > 0 && menuTrees[0].children) {
//     temMenu = [...menuTrees[0].children];
//     if (temMenu.length > 0) {
//       let tem = temMenu[0];
//       defaultTabs = {
//         title: tem.menuName,
//         content: tem.menuAddr,
//         key: `${tem.menuName}${tem.menuAddr}`,
//         closable: false,
//         menuID: `${tem.menuId}`,
//       };
//       defaultMenuKey = `${tem.menuId}`;
//     }
//   }
//   return {
//     defaultTabs,
//     defaultMenuKey,
//     menuTrees: temMenu,
//     perssionBtn,
//   };
// }
