import { request } from "@/utils/request";
import Config from "@/utils/config";

// 分页
export async function getByPage(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/project/pager', {
    // return request('/tsvcloud/api/project/pager', {
    data: params,
  });
}

// 新增项目
export async function register(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/project/add', {
    data: params,
  });
}

// 新增项目
export async function deleteProject(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/project/inactive', {
    data: params,
  });
}

// 批量注册模板
export const downloadURL = Config.tomcatUrl + '/tsvcloud/api/project/export';
