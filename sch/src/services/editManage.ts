import { request } from "@/utils/request";
import Config from "@/utils/config";

// 分页
export async function getByPage(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/softVersion/pager', {
    data: params,
  });
}

export async function getVersionByTerminalType(params: any) {
  return request(
    Config.tomcatUrl + '/tsvcloud/api/softVersion/getByTerminalType',
    {
      data: params,
    },
  );
}

export async function deleteVersion(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/softVersion/inactive', {
    data: params,
  });
}

// 新增
export async function addVersion(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/softVersion/add', {
    data: params,
    upData: true,
  });
}

// 编辑
export async function editVersion(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/softVersion/edit', {
    data: params,
    upData: true,
  });
}

// 证书下载
// export const certDownloadURL = Config.tomcatUrl + "/tsvcloud/api/cert/download/crt";
// 密钥下载
export const keyDownloadURL =
  Config.tomcatUrl + '/tsvcloud/api/cert/download/crt';
// 列表下载
export const downloadURL = Config.tomcatUrl + '/tsvcloud/api/softVersion/export';
