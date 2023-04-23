import { request } from '../utils/request';
import Config from '@/utils/config';

// 登录
export async function login(params) {
  return request(Config.tomcatUrl2 + '/login', {
    data: params,
    login: true,
  });
}

// 退出登录
export async function logout(params) {
  return request(Config.tomcatUrl2 + '/logout', {
    data: params,
    logout: true,
  });
}
// 注册
export async function register(params) {
  return request(Config.tomcatUrl2 + '/sysUser/add', {
    data: params,
    login: true,
  });
}











// 刷新token
export async function refreshToken(params) {
  return request(Config.tomcatUrl + '/sysadmin/user/refreshToken', {
    method: 'post',
    data: params,
    refreshToken: true,
  });
}

// 用户修改密码
export async function updatePwdById(params) {
  return request(Config.tomcatUrl + '/sysadmin/user/updatePwdById', {
    data: params,
  });
}

// 用户访问菜单
export async function insertMenuLog(params) {
  return request(Config.tomcatUrl + '/operlog/insertMenuLog', {
    data: params,
  });
}
