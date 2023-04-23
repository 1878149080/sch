import { request } from "../../../utils/request";
import Config from "@/utils/config";

/**
 * 用户管理
 * @吴昊
 * */

// 分页查询
export async function getByPage(params) {
  return request(Config.tomcatUrl + '/sysadmin/user/getByPage2', {
    data: params,
  });
}

// 角色
export async function getRole(params) {
  return request(Config.tomcatUrl + '/sysadmin/role/getAll', {
    data: params,
  });
}

// ADD
export async function update(params) {
  return request(Config.tomcatUrl + '/sysadmin/user/updateUser', {
    data: params,
  });
}

// 删除
export async function deleteByIds(params) {
  return request(Config.tomcatUrl + '/sysadmin/user/deleteByIds', {
    data: params,
  });
}

// 重置密码
export async function resetPassword(params) {
  return request(Config.tomcatUrl + '/sysadmin/user/updatePwdByIds', {
    data: params,
  });
}

// 用户修改密码
export async function updatePwdById(params) {
  return request(Config.tomcatUrl + '/sysadmin/user/updatePwdById', {
    data: params,
  });
}
