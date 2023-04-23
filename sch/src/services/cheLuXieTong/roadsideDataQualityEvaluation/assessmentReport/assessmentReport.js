import { request } from '../../../../utils/request';
import Config from '@/utils/config';
import { exportFile } from '@/utils/down';

/**
 *  评估报告
 * */

// 分页查询
export async function getByPage(params) {
  return request(
    Config.tomcatUrl + '/tsvcloud/api/bus/qualityReport/getByPager',
    {
      data: params,
    },
  );
}

// 删除
export async function deleteByIds(params) {
  return request(Config.tomcatUrl + '/tsvcloud/api/bus/qualityReport/del', {
    data: params,
  });
}

// 路侧数据评估报告参数
export async function reportAndParameter(params) {
  return request(
    Config.tomcatUrl +
      '/tsvcloud/api/bus/qualityReport/show/reportAndParameter',
    {
      data: params,
    },
  );
}

// 路侧数据评估报告创建(保存草稿)
export async function reportSave(params) {
  return request(Config.tomcatUrl + '/tsvcloud/api/bus/qualityReport/save', {
    data: params,
  });
}

// 路侧数据评估报告创建(指标计算)
export async function saveAndAnalysis(params) {
  return request(
    Config.tomcatUrl + '/tsvcloud/api/bus/qualityReport/saveAndAnalysis',
    {
      data: params,
    },
  );
}

// 根据参数查询车辆轨迹点
export async function getCarGpsTrackByCondition(params) {
  return request(
    Config.tomcatUrl +
      '/tsvcloud/api/bus/qualityIndicator/getCarGpsTrackByCondition',
    {
      data: params,
    },
  );
}

// 过滤uuid
export async function filterUuid(params) {
  return request(
    Config.tomcatUrl + '/tsvcloud/api/bus/qualityReport/filter/Uuid',
    {
      data: params,
    },
  );
}

/********报告编辑start**********/
// 根据报告参数查询识别物轨迹点
export async function getParticipantGpsTrack(params) {
  return request(
    Config.tomcatUrl +
      '/tsvcloud/api/bus/qualityIndicator/getParticipantGpsTrack',
    {
      data: params,
    },
  );
}

// 根据报告参数查询车辆轨迹点
export async function getCarGpsTrack(params) {
  return request(
    Config.tomcatUrl + '/tsvcloud/api/bus/qualityIndicator/getCarGpsTrack',
    {
      data: params,
    },
  );
}

// 仅路侧设备评估报告-整体指标
export async function getOnlyRsuInfo(params) {
  return request(
    Config.tomcatUrl + '/tsvcloud/api/bus/qualityIndicator/onlyRsu/info',
    {
      data: params,
    },
  );
}

//  获取路侧识别物轨迹点
export async function getPointByMsg(params) {
  return request(
    Config.tomcatUrl + '/tsvcloud/api/bus/qualityReport/getParticipantGpsTrack',
    {
      data: params,
    },
  );
}

// 获取路侧识别物的趋势数据
export async function getRoadObjData(params) {
  return request(
    Config.tomcatUrl +
      '/tsvcloud/api/bus/qualityReport/getParticipantTrendTrack',
    {
      data: params,
    },
  );
}

// 真值车评估报告-整体指标
export async function getWithCarInfo(params) {
  return request(
    Config.tomcatUrl + '/tsvcloud/api/bus/qualityIndicator/withCar/info',
    {
      data: params,
    },
  );
}

// 仅路侧设备评估报告-识别物指标
export async function getObjInfo(params) {
  return request(
    Config.tomcatUrl + '/tsvcloud/api/bus/qualityIndicator/onlyRsu/obj/info',
    {
      data: params,
    },
  );
}

// 仅路侧设备评估报告-识别物指标列表
export async function getObjList(params) {
  return request(
    Config.tomcatUrl + '/tsvcloud/api/bus/qualityIndicator/onlyRsu/obj/list',
    {
      data: params,
    },
  );
}

// 仅路侧设备评估报告-识别物指标列表-将指标加入/移除报告
export async function changeIndicator(params) {
  return request(
    Config.tomcatUrl + '/tsvcloud/api/bus/qualityReport/change/indicator',
    {
      data: params,
    },
  );
}

// 保存并上传图片
export async function uploadSnapshot(params) {
  return request(
    Config.tomcatUrl + '/tsvcloud/api/bus/qualityIndicator/snapshot/upload',
    {
      data: params,
      upData: true,
    },
  );
}

// 查看图片地址
export const viewImgUrl =
  Config.tomcatUrl + '/tsvcloud/api/bus/rsu/report/images/';
/********报告编辑end**********/

// 设备编码下拉列表
export async function getTerminalNoPull(params) {
  return request(
    Config.tomcatUrl + '/tsvcloud/api/bus/deviceInformation/getTerminalNoPull',
    {
      data: params,
    },
  );
}

//根据设备编码获取点位和点位类型和厂商
export async function getByTerminalNo(params) {
  return request(
    Config.tomcatUrl + '/tsvcloud/api/bus/deviceInformation/getByTerminalNo',
    {
      data: params,
    },
  );
}

// 报告类型下拉列表
export async function getReportTypePull(params) {
  return request(
    Config.tomcatUrl + '/tsvcloud/api/bus/qualityReport/getReportTypePull',
    {
      data: params,
    },
  );
}

// 生成策略下拉列表
export async function getCreatePolicyPull(params) {
  return request(
    Config.tomcatUrl + '/tsvcloud/api/bus/qualityReport/getCreatePolicyPull',
    {
      data: params,
    },
  );
}

// 报告状态下拉列表
export async function getReportStatusPull(params) {
  return request(
    Config.tomcatUrl + '/tsvcloud/api/bus/qualityReport/getReportStatusPull',
    {
      data: params,
    },
  );
}

//路测数据评估报告导出
export const downloadURL =
  Config.tomcatUrl + '/tsvcloud/api/bus/qualityReport/export?cond=';

// 导出方法
export function downExcel(params) {
  exportFile({
    url: downloadURL + (params?.param || ''),
    fileName: params?.fileName,
  });
}
