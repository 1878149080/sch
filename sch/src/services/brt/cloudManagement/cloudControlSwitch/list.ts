// import { download } from '@/utils/downloadFile';
// @ts-ignore
import { request } from "@/utils/request";
import Config from "@/utils/config";
import {exportFile} from "@/utils/down";

/**
 * @desc 云端控制 -> 云控开关 -> 列表
 * **/

// 分页查询
export async function getByPage(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/brtapi/ruleparam/ykkg/getByPage', {
    data: params,
  });
}

// 获取所有站点区域
export async function getDtStationRegion(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/brtapi/ruleparam/ykkg/getYkStationRegion', {
    data: params,
  });
}

// 获取所有创建者
export async function getDtCreator(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/brtapi/ruleparam/ykkg/getYkCreator', {
    data: params,
  });
}

// 列表下载
export const downloadURL =
  Config.tomcatUrl + '/tsvcloud/api/brtapi/ruleparam/ykkg/export?cond=';

// 导出方法
export function downExcel(params: any) {
  exportFile({
    url: downloadURL + (params?.param || '') + '&fields=' + (params?.fields || ''),
    fileName: params?.fileName,
    callback: params?.callback,
  });
}
