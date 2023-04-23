import { request } from "../../../utils/request";
import Config from "@/utils/config";

/**
 * 组织机构管理
 * @吴昊
 * */

// 根据父级机构获取一级子机构
export async function getByParentId(params) {
  return request(Config.tomcatUrl + '/masterData/Organization/getByParentId', {
    data: params,
  });
}

// 获取所有的组织机构
export async function getAll(params) {
  return request(Config.tomcatUrl + '/masterData/Organization/getAll', {
    data: params,
  });
}

// 获取所有的组织机构 - 无权限
export async function getOrgAll(params) {
  return request(Config.tomcatUrl + '/masterData/Organization/getByOrgId', {
    data: params,
  });
}


// 添加子机构 / 修改机构
export async function update(params) {
  return request(
    Config.tomcatUrl + '/masterData/Organization/updateOrganization',
    {
      data: params,
    },
  );
}

// 批量删除机构
export async function deleteByIds(params) {
  return request(Config.tomcatUrl + '/masterData/Organization/deleteByIds', {
    data: params,
  });
}

// 行政区域
export async function getRegion(params) {
  return request(Config.tomcatUrl + '/sysadmin/district/getByParentId', {
    data: params,
  });
}

// 查询该组织机构下的线路和线路下的车辆
export async function getOrgLine(params) {
  return request(Config.tomcatUrl + '/masterData/Organization/getLineByOrgId', {
    data: params,
  });
}

// 查询该组织机构下的线路和线路下的车辆
export async function getByOrgIdRefLine(params) {
  return request(
    Config.tomcatUrl + '/masterData/Organization/getByOrgIdRefLine',
    {
      data: params,
    },
  );
}

// 根据父级机构获取多级子机构
export async function getRecursionByParentId(params) {
  return request(
    // Config.tomcatUrl + '/masterData/Organization/getPermissionOrg',
    // 数据权限，接口测试
    Config.tomcatUrl + '/masterData/Organization/getPermissionOrgBak',
    {
      data: params,
    },
  );
}
