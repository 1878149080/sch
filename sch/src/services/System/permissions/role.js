import { request } from "../../../utils/request";
import Config from "@/utils/config";

/**
 *  角色管理
 * */

// 分页查询
export async function getByPage(params) {
  return request(Config.tomcatUrl + '/sysadmin/role/getByPage', {
    data: params,
  });
}

// ADD
export async function update(params) {
  return request(Config.tomcatUrl + '/sysadmin/role/updateRole', {
    data: params,
  });
}

// 删除
export async function deleteByIds(params) {
  return request(Config.tomcatUrl + '/sysadmin/role/deleteByIds', {
    data: params,
  });
}

// 根据用户id，查询树状结构
export async function getValidMenuTreeByUser(params) {
  return request(Config.tomcatUrl + '/sysadmin/menu/getValidMenuTreeByUser', {
    data: params,
  });
}

// 获取所有厂商
export async function getTerminalSupplierAll(params) {
  return request(Config.tomcatUrl + '/tsvcloud/api/terminalSupplier/getAll', {
    data: params,
  });
}

// 获取角色数据权限
export async function getRolePermission(params) {
  return request(Config.tomcatUrl + '/sysadmin/role/getRolePermission', {
    data: params,
  });
}

// 修改角色数据权限
export async function updateRolePermission(params) {
  return request(Config.tomcatUrl + '/sysadmin/role/updateRolePermission', {
    data: params,
  });
}
