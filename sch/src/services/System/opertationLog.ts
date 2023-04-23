// import { download } from '@/utils/downloadFile';
import { request } from "@/utils/request";
import Config from "@/utils/config";

// 分页查询
export async function getByPage(params: any) {
  return request(Config.tomcatUrl + '/operlog/pager', {
    data: params,
  });
}

// 列表导出
export const downloadURL = Config.tomcatUrl + '';
