import { request } from "@/utils/request";
import Config from "@/utils/config";

// 分页
export async function getByPage(params: any) {
  return request(Config.tomcatUrl + '', {
    data: params,
  });
}

export async function register(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/sendMessage/messageManage/add', {
    data: params,
  });
}
export async function edit(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/sendMessage/messageManage/edit', {
    data: params,
  });
}
export async function remove(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/sendMessage/messageManage/inactive', {
    data: params,
  });
}

// 列表下载
export const downloadURL = Config.tomcatUrl + '';
