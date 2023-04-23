// import { download } from '@/utils/downloadFile';
// @ts-ignore
import { request } from '@/utils/request';
// @ts-ignore
import Config from '@/utils/config';
import { exportFile } from '@/utils/down';

/**
 * @desc 车速云控 -> 局部运力提升 -> 日志记录
 * **/

// 分页查询
export async function getByPage(params: any) {
  return request(
    Config.tomcatUrl + '/tsvcloud/api/brtapi/ruleparam/jbylhty/getByPage',
    {
      data: params,
    },
  );
}

// 获取所有操作者
export async function getDtOperator(params: any) {
  return request(
    Config.tomcatUrl + '/tsvcloud/api/brtapi/ruleparam/jbylhty/getYlOperator',
    {
      data: params,
    },
  );
}

// 获取配置过的所有站点区域
export async function getDtStationRegion(params: any) {
  return request(
    Config.tomcatUrl +
      '/tsvcloud/api/brtapi/ruleparam/jbylhty/getYlStationRegion',
    {
      data: params,
    },
  );
}

// 列表下载
export const downloadURL =
  Config.tomcatUrl + '/tsvcloud/api/brtapi/ruleparam/jbylhty/export?cond=';

// 导出方法
export function downExcel(params: any) {
  exportFile({
    ...params,
    url: downloadURL + (params?.param || '') + '&fields=' + (params?.fields || ''),
  });
}
