// import { download } from '@/utils/downloadFile';
import { request } from "@/utils/request";
import Config from "@/utils/config";

// 分页查询
export async function getByPage(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/server/cert/pager', {
    data: params,
  });
}

// 废除
export async function abolishCertification(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/server/cert/invalid', {
    data: params,
  });
}

// 获取服务名
export async function getServeName(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/sysService/getSvcDict', {
    data: params,
  });
}

// 获取签名证书
export async function getCert(params: any) {
  return request(
    Config.tomcatUrl + '/tsvcloud/api/server/cert/getCertByCertType',
    {
      data: params,
    },
  );
}

// 证书生成
export async function registerCert(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/server/cert/self/issue', {
    data: params,
  });
}

// 证书详情
export async function certDetail(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/server/cert/view', {
    data: params,
  });
}

// 密钥下载
export const keyDownloadURL =
  Config.tomcatUrl + '/tsvcloud/api/server/cert/download/crt';
// 列表导出
export const downloadURL = Config.tomcatUrl + '/tsvcloud/api/server/cert/export';
