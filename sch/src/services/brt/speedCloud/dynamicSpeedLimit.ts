// import { download } from '@/utils/downloadFile';
// @ts-ignore
import { request } from "@/utils/request";
import Config from "@/utils/config";
import {exportFile} from "@/utils/down";

/**
 * @desc 车速云控 -> 动态限速
 * **/

// 分页查询
export async function getByPage(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/brtapi/ruleparam/dtxs/getByPage', {
    data: params,
  });
}

// 新增/修改配置
export async function addUp(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/brtapi/ruleparam/dtxs/update', {
    data: params,
  });
}

// 删除
export async function deletes(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/brtapi/ruleparam/dtxs/deleteRuleParam', {
    data: params,
  });
}

// 申请启用/停用
export async function applyStartOrStop(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/brtapi/ruleparam/dtxs/applyStartOrStop', {
    data: params,
  });
}

// 撤回申请
export async function cancelApply(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/brtapi/ruleparam/dtxs/cancelApply', {
    data: params,
  });
}

// 审核通过
export async function checkPass(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/brtapi/ruleparam/dtxs/checkPass', {
    data: params,
  });
}

// 审核不通过
export async function checkNoPass(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/brtapi/ruleparam/dtxs/checkNoPass', {
    data: params,
  });
}


// 立即启用/停用
export async function rightNowUseOrNoUse(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/brtapi/ruleparam/dtxs/rightNowUseOrNoUse', {
    data: params,
  });
}


// 获取所有站点区域
export async function getDtStationRegion(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/brtapi/ruleparam/dtxs/getDtStationRegion', {
    data: params,
  });
}

// 获取所有创建者
export async function getDtCreator(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/brtapi/ruleparam/dtxs/getDtCreator', {
    data: params,
  });
}

// 查询路口参数
export async function getCrossingParameter(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/crossing/parameter/getCrossingParameter', {
    data: params,
  });
}

// 根据站点区域获取运营线路
export async function getLineByStationRegion(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/brtapi/ruleparam/dtxs/getLineByStationRegion', {
    data: params,
  });
}

// 列表下载
export const downloadURL =
  Config.tomcatUrl + '/tsvcloud/api/brtapi/ruleparam/dtxs/export?cond=';

// 导出方法
export function downExcel(params: any) {
  exportFile({
    ...params,
    url: downloadURL + (params?.param || '') + '&fields=' + (params?.fields || ''),
  });
}
