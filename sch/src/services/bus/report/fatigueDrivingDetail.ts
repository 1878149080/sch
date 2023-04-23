import { request } from "@/utils/request";
import Config from "@/utils/config";

// 分页http://192.168.50.69:9211
export async function getByPage(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/brt/fatigueDriving/getDetailedList', {
    data: params,
  });
}

export async function getData(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/impala/cardata/getGpsTrace', {
    data: params,
  });
}

export async function getOption(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/brt/down/getDropDownList/' + params, {
    data: params,
    methods: "get"
  });
}

// 列表导出
export const downloadURL = Config.tomcatUrl + '/tsvcloud/api/brt/fatigueDriving/export';