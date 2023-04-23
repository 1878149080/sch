// import { download } from '@/utils/downloadFile';
import { request } from "@/utils/request";
import Config from "@/utils/config";

/**
 * @desc 设备管理 -> 类型管理
 * **/

// 分页查询
export async function getByPage(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/terminalType/pager', {
    data: params,
  });
}

// 新增
export async function add(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/terminalType/add', {
    data: params,
  });
}

// 修改
export async function edit(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/terminalType/edit', {
    data: params,
  });
}

// 设备类型失效
export async function deletes(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/terminalType/inactive', {
    data: params,
  });
}

// 列表导出
export const downloadURL =
  Config.tomcatUrl + '/tsvcloud/api/terminalType/export';
