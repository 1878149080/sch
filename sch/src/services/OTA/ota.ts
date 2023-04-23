// import { download } from '@/utils/downloadFile';
import { request } from "@/utils/request";
import Config from "@/utils/config";

// ota节点信息查询
export async function getOTAMessage(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/ota/details', {
    data: params,
  });
}

// 获取审核人
export async function getApproverByTerminal(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/ota/applyUsers', {
    data: params,
  });
}

// 获取分组下拉数据
export async function getGroup(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/ota/getGroupDict', {
    data: params,
  });
}

// 获取分组数据
export async function getGroupData(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/ota/getGroupValue', {
    data: params,
  });
}

// 根据分组获取车辆
export async function getCarByGroup(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/ota/getTerminalByGroup', {
    data: params,
  });
}

// 申请/保存
export async function apply(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/ota/save', {
    data: params,
  });
}

// 审批通过/拒绝
export async function approval(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/ota/submit', {
    data: params,
  });
}

// 升级跳过
export async function upgrade(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/ota/upgrade', {
    data: params,
  });
}

// 获取设备列表
export async function device(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/ota/getTerminal', {
    data: params,
  });
}

// 评估通过/拒绝
export async function assess(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/ota/assessment', {
    data: params,
    upData: true,
  });
}

// 小批量ota查询
export async function ota(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/ota/getMicroOtaDict', {
    data: params,
  });
}

// 附件下载
export const assessURL = Config.tomcatUrl + '/tsvcloud/api/ota/export/enclosure';

// 列表导出
// export const downloadURL = Config.tomcatUrl + '/tsvcloud/api/cert/server/export';
