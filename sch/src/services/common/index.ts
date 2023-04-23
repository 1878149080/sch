import { request } from "@/utils/request";
import Config from "@/utils/config";

// 获取下拉选项
export async function getOption(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/sysdict/getByTypes', {
    data: params,
  });
}

// 获取设备类型
export async function getTerminalType(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/terminalType/dict', {
    data: params,
  });
}

// 获取厂商
export async function getSupplier(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/car/getSupplierNameByUser', {
    data: params,
  });
}
