// import { download } from '@/utils/downloadFile';
import { request } from "@/utils/request";
import Config from "@/utils/config";

// 分页查询
export async function getByPage(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/car/api/ota/pager', {
    data: params,
  });
}

// 申请
export async function applyOTA(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/car/api/ota/reg', {
    data: params,
  });
}

// 详情包括前置ota
export async function getDetail(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/car/api/ota/view', {
    data: params,
  });
}

// 获取流程状态
export async function getFlow(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/car/api/ota/task', {
    data: params,
  });
}

// ota编辑
export async function edit(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/car/api/ota/complete', {
    data: params,
    upData: true,
  });
}

// 设备导入
export async function deviceImport(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/car/api/ota/import', {
    data: params,
    upData: true,
  });
}

// 证书下载
// export const certDownloadURL = Config.tomcatUrl + "/tsvcloud/api/cert/download/crt";
// 密钥下载
export const keyDownloadURL =
  Config.tomcatUrl + '/tsvcloud/api/cert/download/crt';
// 列表导出
export const downloadURL = Config.tomcatUrl + '/tsvcloud/api/cert/server/export';
