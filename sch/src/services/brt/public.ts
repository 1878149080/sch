// import { download } from '@/utils/downloadFile';
// @ts-ignore
import { request } from "@/utils/request";
import Config from "@/utils/config";

/**
 * @desc 车速云控 -> 动态限速
 * **/

// 分页查询
export async function getBrtLine(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/brtapi/ruleparam/BrtLine/getBrtLine', {
    data: params,
  });
}
