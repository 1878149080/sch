import { request } from "@/utils/request";
import Config from "@/utils/config";

/**
 * @desc 云控分析 -> OD推断及统计分析 -> 出行时间分析
 * **/

// 周值
type Week = 1 | 2 | 3 | 4 | 5 | 6 | 7;

// 分页
export async function getByPage(params: {
  startStation?: string; // 开始站
  endStation?: string; // 结束站
  startTime: string; // 开始时间
  endTime: string; // 结束时间
  startDay: string; // 开始日期
  endDay: string; // 结束日期
  weekDay: Week[]; // 星期
  isAvg: boolean; // 是否求均值
  interval: number; // 粒度
}) {
  return request(
    Config.tomcatUrl +
      "/tsvcloud/api/brtapi/cloudcontrol/BrtTradeOd/travelTimeTrendAnalyse",
    {
      method: "post",
      data: params,
    }
  );
}
