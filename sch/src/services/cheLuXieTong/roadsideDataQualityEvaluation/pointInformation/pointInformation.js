import { request } from '../../../../utils/request';
import Config from '@/utils/config';
import { exportFile } from '@/utils/down';

/**
 *  @点位信息
 * */

// 点位信息信息分页查询
export async function getByPager(params) {
  return request(
    Config.tomcatUrl + '/tsvcloud/api/bus/pointInformation/getByPager',
    {
      data: params,
    },
  );
}

// 点位信息信息修改
export async function updatePoint(params) {
  return request(Config.tomcatUrl + '/tsvcloud/api/bus/pointInformation/edit', {
    data: params,
  });
}

// 点位信息信息删除
export async function deletePoint(params) {
  return request(
    Config.tomcatUrl + '/tsvcloud/api/bus/pointInformation/inactive',
    {
      data: params,
    },
  );
}

// 点位信息信息新增
export async function addPoint(params) {
  return request(Config.tomcatUrl + '/tsvcloud/api/bus/pointInformation/add', {
    data: params,
  });
}

// 点位信息信息批量导入
export async function importPoint(params) {
  return request(
    Config.tomcatUrl + '/tsvcloud/api/bus/pointInformation/import',
    {
      data: params,
      upData: true,
    },
  );
}

// 地图点位经纬度查询
export async function getLngAndLatList(params) {
  return request(
    Config.tomcatUrl + '/tsvcloud/api/bus/pointInformation/getLngAndLatList',
    {
      data: params,
    },
  );
}

//根据点位名获取点位类型
export async function pointGetPointType(params) {
  return request(
    Config.tomcatUrl + '/tsvcloud/api/bus/pointInformation/pointGetPointType',
    {
      data: params,
    },
  );
}

// 点位信息信息导出
export const downloadURL =
  Config.tomcatUrl + '/tsvcloud/api/bus/pointInformation/export?cond=';

// 导出方法
export function downExcel(params) {
  exportFile({
    url: downloadURL + (params?.param || ''),
    fileName: params?.fileName,
  });
}
