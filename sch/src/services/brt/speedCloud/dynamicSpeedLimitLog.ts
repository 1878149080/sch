// import { download } from '@/utils/downloadFile';
// @ts-ignore
import { request } from '@/utils/request';
// @ts-ignore
import Config from '@/utils/config';
import {exportFile} from "@/utils/down";

/**
 * @desc 车速云控 -> 动态限速配置日志
 * **/

// 分页查询
export async function getByPage(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/brtapi/ruleparam/dtxshty/getByPage', {
    data: params,
  });
}

// 获取所有操作者
export async function getDtOperator(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/brtapi/ruleparam/dtxshty/getDtOperator', {
    data: params,
  });
}

// 获取所有操作类型
export async function getAllOpType(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/brtapi/ruleparam/dtxshty/getAllOpType', {
    data: params,
  });
}

// 获取配置过的所有站点区域
export async function getDtStationRegion(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/brtapi/ruleparam/dtxshty/getDtStationRegion', {
    data: params,
  });
}

// 列表下载
export const downloadURL =
  Config.tomcatUrl + '/tsvcloud/api/brtapi/ruleparam/dtxshty/export?cond=';

// 导出方法
export function downExcel(params: any) {
  exportFile({
    ...params,
    url: downloadURL + (params?.param || '') + '&fields=' + (params?.fields || ''),
  });
}
