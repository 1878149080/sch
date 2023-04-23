import dayjs from 'dayjs';

/**
 * queryPage的方法
 * */

// 获取指定的参数
function getParams(conditions = [], params) {
  const { conditionType = undefined, fieldName = undefined } = params;
  let filterArr = [];
  if (conditionType) {
    filterArr = conditions.filter(
      (item) => item.conditionType === conditionType,
    );
  } else {
    filterArr = conditions.filter((item) => item.fieldName === fieldName);
  }
  return filterArr.length > 0 ? filterArr[0].value : '';
}

// 获取指定的参数 - 日期类型专用
function getParamsDate(conditions = [], conditionType = undefined) {
  return dayjs(getParams(conditions, { conditionType })).format('YYYY-MM-DD');
}

export { getParams, getParamsDate };
