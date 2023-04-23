import { request } from "@/utils/request";
import Config from "@/utils/config";

// OTA管理 - OTA统计分页
export async function getByPage(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/ota/updateList', {
    data: params,
  });
}

// 列表导出
export const downloadURL =
  Config.tomcatUrl + '/tsvcloud/api/ota/updateList/download';
