import { request } from "@/utils/request";
import Config from "@/utils/config";
import { exportFile } from "@/utils/down";


// 分页
export async function getByPage(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/sendMessage/distributeRecord/pager', {
    data: params,
  });
}

// 列表下载
export const downloadURL = Config.tomcatUrl + '/tsvcloud/sendMessage/distributeRecord/export?cond=';

// 导出方法
export function downExcel(params: any) {
  exportFile({
    ...params,
    url: downloadURL + (params?.param || ''),
  });
}