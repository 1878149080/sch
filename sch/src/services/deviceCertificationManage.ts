import { request } from "@/utils/request";
import Config from "@/utils/config";

// 分页
export async function getByPage(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/terminal/cert/pager', {
    data: params,
  });
}

// 获取查询的车辆
export async function getCar(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/car/getCarNoDict', {
    data: params,
  });
}

// 凭证生成
export async function register(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/terminal/cert/proof', {
    data: params,
    upData: true,
  });
}

// 批量生成
export async function batchRegister(params: any) {
  return request(
    Config.tomcatUrl + '/tsvcloud/api/terminal/cert/importTerminalProof',
    {
      data: params,
      upData: true,
    },
  );
}

// 认证记录
export async function getRecord(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/cert/getCertRecord', {
    data: params,
  });
}

// 批量发放
export async function batchSend(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/terminal/cert/batchGrant', {
    data: params,
  });
}

// 获取车牌和设备编码
export async function getCarCertByTerminalType(params: any) {
  return request(
    Config.tomcatUrl + '/tsvcloud/api/terminal/cert/getTerminalByCarNo',
    {
      data: params,
    },
  );
}

// 获取获取数字证书
export async function getDigTalCert(params: any) {
  return request(
    Config.tomcatUrl + '/tsvcloud/api/terminal/cert/getNumberCert',
    {
      data: params,
    },
  );
}

// 批量删除
export async function batchDelete(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/terminal/cert/invalid', {
    data: params,
  });
}

// 密钥下载
export const keyDownloadURL =
  Config.tomcatUrl + '/tsvcloud/api/cert/download/crt';
//  todo 列表下载t
export const downloadURL =
  Config.tomcatUrl + '/tsvcloud/api/terminal/cert/export';
