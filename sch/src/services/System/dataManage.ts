// import { download } from '@/utils/downloadFile';
import { request } from "@/utils/request";
import Config from "@/utils/config";

// 分页查询
export async function getByPage(params: any) {
  return request(Config.tomcatUrl + '/dict/data/pager', {
    data: params,
  });
}

// 删除
export async function remove(params: any) {
  return request(Config.tomcatUrl + '/dict/data/delete', {
    data: params,
  });
}

// 新增
export async function add(params: any) {
  return request(Config.tomcatUrl + '/dict/data/add', {
    data: params,
  });
}

// 修改
export async function edit(params: any) {
  return request(Config.tomcatUrl + '/dict/data/edit', {
    data: params,
  });
}

// 列表导出
export const downloadURL = Config.tomcatUrl + '';
