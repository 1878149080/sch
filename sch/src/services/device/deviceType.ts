import { request } from "@/utils/request";

// 分页
export async function getByPage(params: any) {
  // return request(Config.tomcatUrl + '/hong/deviceMangeGetPage', {
  return request('/hong/deviceMangeGetPage', {
    data: params,
  });
}
