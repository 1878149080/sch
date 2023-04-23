import { request } from '../../../../utils/request';
import Config from '@/utils/config';
import { exportFile } from '@/utils/down';

/**
 *  @厂商处置人信息
 * */

// 厂商处置人信息表分页查询
export async function getByPager(params) {
  return request(
    Config.tomcatUrl + '/tsvcloud/api/bus/supplierDisposer/getByPager',
    {
      data: params,
    },
  );
}

// 厂商处置人信息表新增
export async function addManufacturer(params) {
  return request(Config.tomcatUrl + '/tsvcloud/api/bus/supplierDisposer/add', {
    data: params,
  });
}

// 厂商处置人信息表保存/修改
export async function saveManufacturer(params) {
  return request(Config.tomcatUrl + '/tsvcloud/api/bus/supplierDisposer/edit', {
    data: params,
  });
}

//厂商处置人信息表删除
export async function deleteManufacturer(params) {
  return request(
    Config.tomcatUrl + '/tsvcloud/api/bus/supplierDisposer/inactive',
    {
      data: params,
    },
  );
}

//厂商处置人信息表导出
export const downloadURL =
  Config.tomcatUrl + '/tsvcloud/api/bus/supplierDisposer/export?cond=';

// 导出方法
export function downExcel(params) {
  exportFile({
    url: downloadURL + (params?.param || ''),
    fileName: params?.fileName,
  });
}
