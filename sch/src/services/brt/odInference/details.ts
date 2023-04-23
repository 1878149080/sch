import { request } from "@/utils/request";
import Config from "@/utils/config";

/**
 * @desc 云控分析 -> OD推断及统计分析 -> 详细数据
 * **/

// 分页
export async function getByPage(params: any) {
  return request(
    Config.tomcatUrl + "/tsvcloud/api/brtapi/cloudcontrol/BrtOd/getByPage",
    {
      method: "post",
      data: params,
    }
  );
}

// 获取所有车牌号
export async function getCarList() {
  return request(Config.tomcatUrl + "/tsvcloud/api/car/getAll", {
    method: "post",
  });
}
