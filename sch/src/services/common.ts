import { log } from '@/services/device/deviceManage';
import { request } from "@/utils/request";
import Config from "@/utils/config";

// g
export async function getSelect(params?: any) {
  // return request(Config.tomcatUrl + '/masterData/car/getByPage', {
  return request('mock/select', {
    data: params,
  });
}

// 根据组织机构获取线路
export async function getLineByOrg(params: any) {
  // return request(Config.tomcatUrl + "mock/line", {
  return request('mock/line', {
    data: params,
  });
}

// 根据线路获取车牌
export async function getCarByLine(params: any) {
  // return request(Config.tomcatUrl + "mock/line", {
  return request('mock/car', {
    data: params,
  });
}

// 根据组织机构获取线路车牌的树形结构
export async function getLineCarTreeData(params: any) {
  return request(Config.tomcatUrl + '/masterData/Organization/getByOrgIdRefLine', {
    data: params,
  });
}

// 线路类型: 1.常规线路;2.高峰线路,3.社区公交,4.城际公交,5.大站快线,6.差异化公交,7.旅游专线,8.网约专线,9.定制公交,10.BRT快线,11.其他
type lineTypeList = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"]
interface permissionLine {
  // 组织机构id
  orgId?: number;
  lineType?: keyof lineTypeList;
}
// 根据组织机构获取线路
export async function getPermissionLine(params: permissionLine) {
  return request(Config.tomcatUrl + '/masterData/Line/getPermissionLineBak', {
    data: params,
  });
}

// 根据用户获取组织机构 需要传递token
export async function getPermissionOrg() {
  return request(Config.tomcatUrl + '/masterData/Organization/getPermissionOrg', {
    data: {},
  });
}

// 根据用户获取组织机构和线路
export async function getPermissionCar(params: any) {
  return request(Config.tomcatUrl + '/masterData/Organization/getCarNoByLineCode', {
    data: params,
  });
}

// 根据所有司机
export async function getAllDriver(params: any) {
  return request(Config.tomcatUrl + '/masterData/Driver/getDriverByOrg', {
    data: params,
  });
}



