import { request } from '../../../../utils/request';
import Config from '@/utils/config';

/**
 *  指标阈值参数
 * */

// 指标阈值查询
export async function getByList(params) {
  return request(Config.tomcatUrl + '/tsvcloud/api/bus/threshold/getByList', {
    data: params,
  });
}

// 指标阈值修改
export async function updateThreshold(params) {
  return request(Config.tomcatUrl + '/tsvcloud/api/bus/threshold/edit', {
    data: params,
  });
}

// 指标阈值操作记录查询
export async function getOperationRecord(params) {
  return request(Config.tomcatUrl + '/tsvcloud/api/bus/threshold/view', {
    data: params,
  });
}
