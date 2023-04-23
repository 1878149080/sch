// @ts-ignore
import { request } from "@/utils/request";
import Config from "@/utils/config";
import {exportFile} from "@/utils/down";

/**
 * @desc 车速云控 -> 柔性编队 -> 列表
 * **/

// 分页查询
export async function getByPage(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/flexfast/functionOpen/getInfo', {
    data: params,
  });
}

// 柔性编队
export async function flexfast(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/flexfast/functionOpen/flexfast', {
    data: params,
  });
}

// 获取上一站点
export async function getPreviousStation(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/flexfast/getPreviousStation', {
    data: params,
  });
}
