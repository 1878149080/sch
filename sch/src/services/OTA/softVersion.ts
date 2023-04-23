import { request } from "@/utils/request";
import Config from "@/utils/config";
import { exportFile } from "@/utils/down";

// 分页
export async function getByPage(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/softVersion/pager', {
    data: params,
  });
}

// 新增
export async function register(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/softVersion/add', {
    data: params,
    upData: true,
  });
}

// 编辑
export async function edit(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/softVersion/edit', {
    data: params,
    upData: true,
  });
}

// 作废
export async function remove(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/softVersion/inactive', {
    data: params,
  });
}

// 获取软件版本
export async function softVersion(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/softVersion/dict', {
    data: params,
  });
}

// 列表下载
export const downloadURL =
  Config.tomcatUrl + '/tsvcloud/api/softVersion/export?cond=';

// 导出方法
export function downExcel(params: any) {
  exportFile({
    ...params,
    url: downloadURL + (params?.param || ''),
  });
}
