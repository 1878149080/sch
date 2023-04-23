// @ts-ignore
import { request } from '@/utils/request';
// @ts-ignore
import Config from '@/utils/config';
import { exportFile } from '@/utils/down';

/**
 * @desc 车速云控 -> 柔性编队 -> 日志记录
 * **/

// 分页查询
export async function getByPage(params: any) {
  return request(
    Config.tomcatUrl + '/tsvcloud/flexfast/openRecord/pager',
    {
      data: params,
    },
  );
}

// 列表下载
export const downloadURL =
  Config.tomcatUrl + '/tsvcloud/flexfast/openRecord/export?cond=';

// 导出方法
export function downExcel(params: any) {
  exportFile({
    ...params,
    url: downloadURL + (params?.param || '') + '&fields=' + (params?.fields || ''),
  });
}
