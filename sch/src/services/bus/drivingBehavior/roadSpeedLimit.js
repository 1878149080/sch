import { request } from '@/utils/request';
import Config from '@/utils/config';
import { exportFile } from '@/utils/down';

/**
 *  @道路超速限速统计
 * */

// 各时段道路限速超速分析图
export async function getWarningTrend(params) {
  return request(
    Config.tomcatUrl1 + '/tsvcloud/api/brt/roadSpeedLimit/getWarningTrend',
    {
      data: params,
    },
  );
}

// 各公司道路限速超速分析图
export async function getAnalysisChar(params) {
  return request(
    Config.tomcatUrl1 +
      '/tsvcloud/api/brt/roadSpeedLimit/analysisChartOfRoadSpeedLimit',
    {
      data: params,
    },
  );
}

// 道路限速超速明细列表
export async function getDetailedList(params) {
  return request(
    Config.tomcatUrl1 + '/tsvcloud/api/brt/roadSpeedLimit/getDetailedList',
    {
      data: params,
    },
  );
}

// 道路限速超速热力图
export async function getHeatMap(params) {
  return request(
    Config.tomcatUrl1 + '/tsvcloud/api/brt/roadSpeedLimit/getHeatMap',
    {
      data: params,
    },
  );
}

// 道路限速超速明细列表导出
export const downloadURL =
  Config.tomcatUrl1 + '/tsvcloud/api/brt/roadSpeedLimit/detailExport?cond=';

// 导出方法
export function downExcel(params) {
  exportFile({
    url: downloadURL + (params?.param || ''),
    fileName: params?.fileName,
  });
}
