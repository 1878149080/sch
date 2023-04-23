import { request } from '../../../../utils/request';
import Config from '@/utils/config';
import { exportFile } from '@/utils/down';
/**
 *  周期评估参数
 * */

// 周期评估参数查询
export async function getByList(params) {
  return request(
    Config.tomcatUrl + '/tsvcloud/api/bus/evaluationParameter/getByPager',
    {
      data: params,
    },
  );
}

// 周期评估参数修改
export async function updatePeriodicAssessment(params) {
  return request(
    Config.tomcatUrl + '/tsvcloud/api/bus/evaluationParameter/edit',
    {
      data: params,
    },
  );
}

// 周期评估参数批量修改
export async function batchUpdatePeriodicAssessment(params) {
  return request(
    Config.tomcatUrl + '/tsvcloud/api/bus/evaluationParameter/editBySupplierId',
    {
      data: params,
    },
  );
}

// 周期评估参数操作查询
export async function getPeriodicAssessmentOperate(params) {
  return request(
    Config.tomcatUrl + '/tsvcloud/api/bus/evaluationParameter/records',
    {
      data: params,
    },
  );
}

// 点位类型下拉列表
export async function getPointTypePull(params) {
  return request(
    Config.tomcatUrl + '/tsvcloud/api/bus/evaluationParameter/getPointTypePull',
    { data: params },
  );
}

// 厂商下拉列表
export async function getSupplierPull(params) {
  return request(
    Config.tomcatUrl + '/tsvcloud/api/bus/evaluationParameter/getSupplierPull',
    { data: params },
  );
}

// 点位名称下拉列表
export async function getPointPull(params) {
  return request(
    Config.tomcatUrl + '/tsvcloud/api/bus/evaluationParameter/getPointPull',
    { data: params },
  );
}

// 评估参数下拉
export async function getEvaluationPull(params) {
  return request(
    Config.tomcatUrl +
      '/tsvcloud/api/bus/evaluationParameter/getEvaluationPull',
    { data: params },
  );
}

// 周期评估参数导出报表--列表下载
export const downloadURL =
  Config.tomcatUrl + '/tsvcloud/api/bus/evaluationParameter/export?cond=';

// 导出方法
export function downExcel(params) {
  exportFile({
    url: downloadURL + (params?.param || ''),
    fileName: params?.fileName,
  });
}
