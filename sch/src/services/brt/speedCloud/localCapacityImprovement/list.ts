// import { download } from '@/utils/downloadFile';
// @ts-ignore
import { request } from "@/utils/request";
import Config from "@/utils/config";
import {exportFile} from "@/utils/down";

/**
 * @desc 车速云控 -> 局部运力提升 -> 列表
 * **/

// 分页查询
export async function getByPage(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/brtapi/ruleparam/jbyl/getByPage', {
    data: params,
  });
}

// 获取所有站点区域
export async function getDtStationRegion(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/brtapi/ruleparam/jbyl/getYlStationRegion', {
    data: params,
  });
}

// 获取所有创建者
export async function getDtCreator(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/brtapi/ruleparam/jbyl/getYlCreator', {
    data: params,
  });
}

// 列表下载
export const downloadURL =
  Config.tomcatUrl + '/tsvcloud/api/brtapi/ruleparam/jbyl/export?cond=';

// 导出方法
export function downExcel(params: any) {
  exportFile({
    url: downloadURL + (params?.param || '') + '&fields=' + (params?.fields || ''),
    fileName: params?.fileName,
    callback: params?.callback,
  });
}
