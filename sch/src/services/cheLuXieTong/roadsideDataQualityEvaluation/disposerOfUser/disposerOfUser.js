import { request } from '../../../../utils/request';
import Config from '@/utils/config';
import { exportFile } from '@/utils/down';

/**
 *  @使用单位处置人信息
 * */

// 使用单位处置人信息分页查询
export async function getByPager(params) {
  return request(
    Config.tomcatUrl + '/tsvcloud/api/bus/unitInfoUser/getByPager',
    {
      data: params,
    },
  );
}

// 使用单位处置人保存/修改
export async function saveDisposal(params) {
  return request(Config.tomcatUrl + '/tsvcloud/api/bus/unitInfoUser/edit', {
    data: params,
  });
}

//使用单位处置人信息删除
export async function deleteDisposal(params) {
  return request(Config.tomcatUrl + '/tsvcloud/api/bus/unitInfoUser/inactive', {
    data: params,
  });
}

//使用单位处置人信息新增
export async function addDisposal(params) {
  return request(Config.tomcatUrl + '/tsvcloud/api/bus/unitInfoUser/add', {
    data: params,
  });
}

//使用单位下拉列表
export async function getUnitPull(params) {
  return request(
    Config.tomcatUrl + '/tsvcloud/api/bus/unitInfoUser/getUnitPull',
    {
      data: params,
    },
  );
}
// 使用单位处置人信息表导出--列表下载
export const downloadURL =
  Config.tomcatUrl + '/tsvcloud/api/bus/unitInfoUser/export?cond=';

// 导出方法
export function downExcel(params) {
  exportFile({
    url: downloadURL + (params?.param || ''),
    fileName: params?.fileName,
  });
}
