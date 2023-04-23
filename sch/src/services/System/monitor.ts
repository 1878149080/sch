import { request } from "@/utils/request";
import Config from "@/utils/config";

/**
 * @desc 系统管理 -> 系统监控
 *
 * **/
// 分页查询
export async function getByPage1(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/monitor/sysServer', {
    data: params,
  });
}

export async function getByPage2(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/monitor/moreSysServer', {
    data: params,
  });
}

export async function getSys(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/monitor/getSysConfig', {
    data: params,
  });
}
