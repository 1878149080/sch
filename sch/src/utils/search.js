import { getDisposalPull } from '@/services/cheLuXieTong/roadsideDataQualityEvaluation/earlyWarningRule/earlyWarningRule';
import {
  getPointTypePull,
  getSupplierPull,
  getEvaluationPull,
  getPointPull,
} from '@/services/cheLuXieTong/roadsideDataQualityEvaluation/periodicAssessment/periodicAssessment';
import { getUnitPull } from '@/services/cheLuXieTong/roadsideDataQualityEvaluation/disposerOfUser/disposerOfUser';
import {
  getSupplierDisposerPull,
  getUnitInfoUserPull,
} from '@/services/cheLuXieTong/roadsideDataQualityEvaluation/roadsideEquipment/roadsideEquipment';

/**
 * @公用options
 */

// 处置时长下拉列表
export const getDisposal = async ({ setDisposalOpt, params = null }) => {
  let res = await getDisposalPull(params);
  if (res.statusCode === 200) {
    let arr = res.content.map((item) => {
      return { label: item.dictName, value: item.dictValue };
    });
    setDisposalOpt(arr);
  }
};

// 点位类型下拉列表
export const getPointType = async ({ setPointTypeOpt, params = null }) => {
  let res = await getPointTypePull(params);
  if (res.statusCode === 200) {
    let arr = res.content.map((item) => {
      return { label: item.dictName, value: item.dictValue };
    });
    setPointTypeOpt(arr);
  }
};

// 厂商下拉列表
export const getSupplier = async ({ setManufacturerOpt, params = null }) => {
  let res = await getSupplierPull(params);
  if (res.statusCode === 200) {
    let arr = res.content.map((item) => {
      return { label: item.dictName, value: item.dictValue };
    });
    setManufacturerOpt(arr);
  }
};

// 厂商处置人下拉列表
export const getSupplierDisposer = async ({
  setSupplierDisposerOpt,
  params = null,
}) => {
  let res = await getSupplierDisposerPull(params);
  if (res.statusCode === 200) {
    let arr = res.content.map((item) => {
      return { label: item.dictName, value: item.dictValue };
    });
    setSupplierDisposerOpt(arr);
  }
};

// 使用单位处置人下拉列表
export const getUnitInfoUser = async ({
  setUnitInfoUserOpt,
  params = null,
}) => {
  let res = await getUnitInfoUserPull(params);
  if (res.statusCode === 200) {
    let arr = res.content.map((item) => {
      return { label: item.dictName, value: item.dictValue };
    });
    setUnitInfoUserOpt(arr);
  }
};

// 点位下拉列表
export const getPoint = async ({ setPointOpt, params = null }) => {
  let res = await getPointPull(params);
  if (res.statusCode === 200) {
    let arr = res.content.map((item) => {
      return { label: item.dictName, value: item.dictValue };
    });
    setPointOpt(arr);
  }
};

// 评估参数下拉列表
export const getEvaluation = async ({ setEvaluationOpt, params = null }) => {
  let res = await getEvaluationPull(params);
  if (res.statusCode === 200) {
    let arr = res.content.map((item) => {
      return { label: item.dictName, value: item.dictValue };
    });
    setEvaluationOpt(arr);
  }
};

// 使用单位下拉列表
export const getUnit = async ({ setUnitOption }) => {
  let res = await getUnitPull();
  if (res.statusCode === 200) {
    let arr = res.content.map((item) => {
      return { label: item, value: item };
    });
    setUnitOption(arr);
  }
};

// 路侧数据预警信息模块
// 预警等级下拉
export const warningLevelOpt = [
  { label: '一级预警', value: 1 },
  { label: '二级预警', value: 2 },
  { label: '三级预警', value: 3 },
];

// 处置进度下拉
export const disposalProgressOpt = [
  { label: '一级预警已通知', value: 1 },
  { label: '二级预警已通知', value: 2 },
  { label: '三级预警已通知', value: 3 },
  { label: '三级预警已超时', value: 4 },
  { label: '已完成', value: 5 },
];
