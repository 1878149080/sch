/**
 * @desc 开发环境下的自动登录
 * */
import md5 from 'js-md5';
import { login } from '../../services/app';
import { history } from 'umi';
import {filterPerssionType} from './menu';
import sha256 from 'crypto-js/sha256';
import { setStorage } from '../localStorage2';
import { menuTree } from '../../models/menuTree'


export function autoLogin() {
  let res = {};
  let user = {
    username: 'admin',
    password: sha256('abc123456').toString(),
  };
  let c = 1234567
  console.info("开发模式下的自动登录!");
  console.info("开发模式下的自动登录!");
  console.info("开发模式下的自动登录!");
  login({...user})
    .then((list) => {
      setStorage(list);
      res = list;
    })
    .catch((e) => {
      console.error("登录发生了错误!");
      // alert('登录发生了错误！');
    })
    .finally(() => {
      if (res.code === 200) {
        // const USERINFO = data.content;
        // const geMenu = USERINFO.menuTree || [];
        const geMenu = menuTree;
        // const geMenu = menus;
        let mentTree = [];
        if (geMenu.length > 0 && geMenu[0].menuName === '系统管理') {
          mentTree = geMenu[0].children;
        } else {
          mentTree = geMenu;
        }

        // 过滤菜单类型
        const {
          menuTrees,
          perssionBtn = [],
          routers = [],
          routerName = {}
        } = filterPerssionType(mentTree);
        console.log('====================================');
        console.log(menuTrees);
        console.log('====================================');

        const { data } = res;
        const userInfo = data.loginSysUserVo;

        localStorage.setItem('tsvcloud_logined', true);
        localStorage.setItem('tsvcloud_userId', userInfo.roleId);
        localStorage.setItem('tsvcloud_userName', userInfo.username);
        localStorage.setItem('tsvcloud_realName', userInfo.realName);
        localStorage.setItem('tsvcloud_isAdmin', userInfo.roleId === 0);
        localStorage.setItem('tsvcloud_menuTree', JSON.stringify(menuTrees));
        localStorage.setItem('tsvcloud_districtId', userInfo.districtId);
        localStorage.setItem('tsvcloud_isSys', userInfo.isSys);
        localStorage.setItem('tsvcloud_token', data.token);
        localStorage.setItem('tsvcloud_loginTime', new Date().getTime());
        localStorage.setItem('tsvcloud_systemName', 'brain');
        // localStorage.setItem('tsvcloud_isAdmin', user.name === 'admin' ? "true" : "false");
        localStorage.setItem('tsvcloud_role', userInfo.roleId);
        localStorage.setItem("school_head", userInfo.head);
        window.error401 = undefined;
        window.error422 = undefined;
        // history.go('/');
        console.info("登录成功！");
      } else {
        console.error("请重新刷新，尝试登录！");
        console.error(data.message);
        // alert(data.message);
        // alert('请重新刷新，尝试登录！');
      }
    });
}


