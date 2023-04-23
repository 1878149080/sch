import { request } from '../../../../utils/request';
import Config from '@/utils/config';

/**
 *  预警规则参数
 * */

// 预警规则参数查询
export async function getByList(params) {
  return request(Config.tomcatUrl + '/tsvcloud/api/bus/alertRules/getByList', {
    data: params,
  });
}

// 预警规则参数修改
export async function updateEarlyWaringRule(params) {
  return request(Config.tomcatUrl + '/tsvcloud/api/bus/alertRules/edit', {
    data: params,
  });
}

// 预警规则参数操作记录查询
export async function getEarlyWaringRule(params) {
  return request(Config.tomcatUrl + '/tsvcloud/api/bus/alertRules/record', {
    data: params,
  });
}

// 处置时长下拉列表
export async function getDisposalPull(params) {
  return request(
    Config.tomcatUrl + '/tsvcloud/api/bus/alertRules/getDisposalPull',
    {
      data: params,
    },
  );
}
