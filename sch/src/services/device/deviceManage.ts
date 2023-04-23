import { request } from "@/utils/request";
import Config from "@/utils/config";

// 分页
export async function getByPage(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/terminal/pager', {
    data: params,
  });
}

// 获取车辆
export async function getCar(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/car/getCarNoDict', {
    data: params,
  });
}

// 设备注册
export async function deviceRegister(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/terminal/reg', {
    data: params,
  });
}

// 设备编辑
export async function deviceEdit(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/terminal/edit', {
    data: params,
  });
}

// 批量注册模板
export async function getTemplate(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/terminal/template', {
    data: params,
  });
}

// 文件上传
export async function uploadRegisterFile(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/terminal/batch', {
    data: params,
    upData: true,
  });
}

// 维修
export async function repair(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/terminal/repair', {
    data: params,
  });
}

// 上传日志
export async function log(params: any) {
  return request(
    Config.tomcatUrl + '/tsvcloud/api/terminalHWLog/sendCommand',
    {
      data: params,
    },
  );
}

// 获取日志类型
export async function getLogType(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/terminalHWLog/dict', {
    data: params,
  });
}

// 获取硬件日志
export async function getLog(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/terminalHWLog/list', {
    data: params,
  });
}

// 获取硬件日志删除
export async function logDelete(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/terminalHWLog/delete', {
    data: params,
  });
}

// 获取认证记录列表
export async function certRecord(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/terminalHWLog/delete', {
    data: params,
  });
}

// 获取维护日志
export async function getRepairRecord(params: any) {
  return request(
    Config.tomcatUrl + '/tsvcloud/api/terminal/cert/getRespectRecord',
    {
      data: params,
    },
  );
}

// 获取认证记录列表 --- 认证记录
export async function getCertRecord(params: any) {
  return request(
    Config.tomcatUrl + '/tsvcloud/api/terminal/cert/getAuthRecord',
    {
      data: params,
    },
  );
}

// 硬件日志下载
export const logDownloadURL =
  Config.tomcatUrl + '/tsvcloud/api/terminalHWLog/download';

// 批量注册模板
export const templateDownloadURL =
  Config.tomcatUrl + '/tsvcloud/api/terminal/template/download';
// 列表下载
export const downloadURL = Config.tomcatUrl + '/tsvcloud/api/terminal/export';
