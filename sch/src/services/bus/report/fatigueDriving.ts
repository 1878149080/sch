import { request } from "@/utils/request";
import Config from "@/utils/config";

// 分页 疲劳驾驶统计
export async function getByPage(params: any) {
  // return request(Config.tomcatUrl + '/tsvcloud/api/brt/fatigueDriving/getStatementList', {
  return request(Config.tomcatUrl + '/tsvcloud/api/brt/fatigueDriving/getStatementList', {
    data: params,
  });
}

// 分页 状态对比
export async function contrastState(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/brt/fatigueDriving/getStateContrast', {
    data: params,
  });
}

// 趋势图
export async function trend(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/brt/fatigueDriving/getWarningTrend', {
    data: params,
  });
}

// 各纬度最高等级分布图
export async function companyWarning(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/brt/fatigueDriving/getEarlyWarningDistribution', {
  // return request(Config.tomcatUrl + '/tsvcloud/api/brt/fatigueDriving/getEarlyWarningDistribution', {
    data: params,
  });
}
// 疲劳驾驶状态对比图
export async function fatigueState(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/brt/fatigueDriving/getStateContrast', {
    data: params,
  });
}
// 疲劳驾驶状态对比图
export async function fatigueRatio(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/brt/fatigueDriving/getGradeProportion', {
    data: params,
  });
}