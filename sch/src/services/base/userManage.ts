import { request } from "@/utils/request";
import Config from "@/utils/config";

// 分页
export async function getByPage(params: any) {
  return request(Config.tomcatUrl2 + '/sysUser/getPageList', {
    data: params,
  });
}

export async function upDateUser(params: any) {
  return request(Config.tomcatUrl2 + '/sysUser/update', {
    data: params,
  });
}
export async function addUser(params: any) {
  return request(Config.tomcatUrl2 + '/sysUser/update', {
    data: params,
  });
}
