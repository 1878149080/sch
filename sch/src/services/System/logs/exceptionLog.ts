import { request } from "@/utils/request";
import Config from "@/utils/config";

/**
 * @desc 系统管理 -> 日志管理 -> 异常日志
 * **/
// 分页查询
export async function getByPage(params: any) {
  return request(Config.tomcatUrl + '/exceptionlog/pager', {
    data: params,
  });
}
