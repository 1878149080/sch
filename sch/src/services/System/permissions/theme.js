import { request } from "../../../utils/request";
import Config from "@/utils/config";

/**
 * 主题管理
 * @申帅飞
 * @吴昊
 * */

// 根据用户Id，查询所有获取树状结构
export async function getMenuByUserId(params) {
  return request(Config.tomcatUrl + '/sysadmin/menu/getMenuByUserId', {
    // return request('/system/auth/menu/getMenuByUserId', {
    data: params,
  });
}

// 根据父级菜单获取一级子菜单
export async function getByParentId(params) {
  return request(Config.tomcatUrl + '/sysadmin/menu/getByParentId', {
    data: params,
  });
}

// 添加菜单/修改菜单
export async function update(params) {
  return request(Config.tomcatUrl + '/sysadmin/menu/updateMenu', {
    data: params,
  });
}

// 删除
export async function deleteByIds(params) {
  return request(Config.tomcatUrl + '/sysadmin/menu/deleteByIds', {
    data: params,
  });
}

// 获取所有的菜单
export async function getAllMenuTree(params) {
  return request(Config.tomcatUrl + '/sysadmin/menu/getAllMenuTree', {
    data: params,
  });
}
