import { request } from "@/utils/request";
import Config from "@/utils/config";

// 分页
export async function getByPage(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/sendMessage/getInfo', {
    data: params,
  });
}

export async function distribution(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/sendMessage/send', {
    data: params,
  });
}

export async function getMessage(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/sendMessage/messageManage/getAll', {
    data: params,
  });
}

// 列表下载
export const downloadURL = Config.tomcatUrl + '';
