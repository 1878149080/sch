import { request } from "@/utils/request";
import Config from "@/utils/config";

// 分页
export async function getByPage(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/terminal/pager', {
    data: params,
  });
}

export async function carRegister(params: any) {
  // return request(Config.tomcatUrl + '/hong/deviceMangeGetPage', {
  return request('/mock/carRegister', {
    data: params,
  });
}

// 获取车辆
export async function getCar(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/car/getCarNoDict', {
    data: params,
  });
}
