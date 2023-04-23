import { request } from "@/utils/request";
import Config from "@/utils/config";

// 动漫分页
type params = {
  current: number,
  size: number,
}
export async function getByPage(params: any) {
  return request(Config.tomcatUrl2 + '/shizukuAnimeTable/getPageList', {
    data: params,
  });
}
