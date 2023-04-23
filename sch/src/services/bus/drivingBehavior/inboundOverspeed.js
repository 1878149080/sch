import { request } from '@/utils/request';
import Config from '@/utils/config';
import { exportFile } from '@/utils/down';

/**
 *  @进站超速统计
 * */

//
export async function getByPager(params) {
  return request(
    Config.tomcatUrl + '/tsvcloud/api/bus/unitInfoUser/getByPager',
    {
      data: params,
    },
  );
}

// 使用单位处置人信息表导出--列表下载
export const downloadURL =
  Config.tomcatUrl + '/tsvcloud/api/bus/unitInfoUser/export?cond=';

// 导出方法
export function downExcel(params) {
  exportFile({
    url: downloadURL + (params?.param || ''),
    fileName: params?.fileName,
  });
}
