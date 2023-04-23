import { request } from '../../../../utils/request';
import Config from '@/utils/config';
import { exportFile } from '@/utils/down';

/**
 *  @路侧设备信息
 * */

// 路侧设备信息分页查询
export async function getByPager(params) {
  return request(
    Config.tomcatUrl + '/tsvcloud/api/bus/deviceInformation/getByPager',
    {
      data: params,
    },
  );
}

// 路侧设备信息保存/修改
export async function saveDeviceInformation(params) {
  return request(
    Config.tomcatUrl + '/tsvcloud/api/bus/deviceInformation/edit',
    {
      data: params,
    },
  );
}

//路测设备信息删除
export async function deleteDeviceInformation(params) {
  return request(
    Config.tomcatUrl + '/tsvcloud/api/bus/deviceInformation/inactive',
    {
      data: params,
    },
  );
}

//路测设备信息新增
export async function addDeviceInformation(params) {
  return request(Config.tomcatUrl + '/tsvcloud/api/bus/deviceInformation/add', {
    data: params,
  });
}

//路测设备信息批量导入
export async function importDeviceInformation(params) {
  return request(
    Config.tomcatUrl + '/tsvcloud/api/bus/deviceInformation/import',
    {
      data: params,
      upData: true,
    },
  );
}

// 厂商处置人下拉列表
export async function getSupplierDisposerPull(params) {
  return request(
    Config.tomcatUrl +
      '/tsvcloud/api/bus/supplierDisposer/getSupplierDisposerPull',
    {
      data: params,
    },
  );
}

// 使用单位处置人下拉列表
export async function getUnitInfoUserPull(params) {
  return request(
    Config.tomcatUrl + '/tsvcloud/api/bus/unitInfoUser/getUnitInfoUserPull',
    {
      data: params,
    },
  );
}

//路测设备信息导出
export const downloadURL =
  Config.tomcatUrl + '/tsvcloud/api/bus/deviceInformation/export?cond=';

// 导出方法
export function downExcel(params) {
  exportFile({
    url: downloadURL + (params?.param || '') + '&fields=',
    fileName: params?.fileName,
  });
}
