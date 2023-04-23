// import { download } from '@/utils/downloadFile';
import { request } from '@/utils/request';
import Config from '@/utils/config';

// 分页查询
export async function getByPage(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/cert/digest/pager', {
    data: params,
  });
}

// 第三方证书导入
export async function upload(params: any) {
  return request(
    Config.tomcatUrl + '/tsvcloud/api/digest/cert/importThirdPartyCert',
    {
      data: params,
      upData: true,
    },
  );
}

// 数字证书生成
export async function register(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/digest/cert/issue', {
    data: params,
  });
}

// 废除
export async function abolishCertification(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/digest/cert/invalid', {
    data: params,
  });
}

// 密钥下载
export const keyDownloadURL =
  Config.tomcatUrl + '/tsvcloud/api/digest/cert/download/crt';
// 列表导出
export const downloadURL = Config.tomcatUrl + '/tsvcloud/api/digest/cert/export';
