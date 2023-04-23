import { request } from "@/utils/request";
import Config from "@/utils/config";

// 根据组织机构或者线路获取车辆，不传线路就是组织结构下满所有的车
export async function car(params?: any) {
  return request(Config.tomcatUrl + '/masterData/Organization/getCarNoByLineCode', {
    data: params,
  });
}

// 获取组织机构
export async function org(params?: any) {
  return request(Config.tomcatUrl + '/masterData/Organization/getPermissionOrg', {
    data: params,
  });
}

export const liveMessageURL = Config.webSocket + '/tsvcloud/ws/byc/pushMessage';
