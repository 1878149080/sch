import { request } from '@/utils/request';
import Config from '@/utils/config';
import { exportFile } from '@/utils/down';

// 分页查询
export async function getByPage(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/fusionRule/getByPager', {
    data: params,
  });
}

// 新增
export async function register(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/fusionRule/add', {
    data: params,
  });
}

// 删除
export async function remove(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/fusionRule/delete', {
    data: params,
  });
}

// 修改
export async function edit(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/fusionRule/update', {
    data: params,
  });
}

// 详情
export async function detail(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/fusionRule/getDetail', {
    data: params,
  });
}

// 获取事件等级、类型、状态
export async function option(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/fusionRule/getDictData', {
    data: params,
  });
}


// 列表导出
export const downloadURL = Config.tomcatUrl + '/tsvcloud/api/fusionRule/exportAsExcel';

export function downExcel(params: any) {
  exportFile({
    url: downloadURL + "?cond=" + (params?.param || '') + '&fields=' + (params?.fields || ''),
    fileName: params?.fileName,
    callback: params?.callback,
  });
}