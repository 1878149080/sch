import coordtransform from "coordtransform";
import { notification } from "antd";

/**
 * 根绝坐标类型转换为搞得坐标
 * @param {Number} gpsType
 * @param {Array} gpsList
 * */
function transformationGpsGD(gpsType = 1, gpsList = []) {
  let gpsObj = {};
  if (gpsType === 1) {
    gpsObj.gps = gpsList;
    gpsObj.gaode = coordtransform.wgs84togcj02(gpsList[0], gpsList[1]);
    gpsObj.baidu = coordtransform.gcj02tobd09(gpsObj.gaode[0], gpsObj.gaode[1]);
  } else if (gpsType === 2) {
    gpsObj.gps = coordtransform.gcj02towgs84(gpsList[0], gpsList[1]);
    gpsObj.gaode = gpsList;
    gpsObj.baidu = coordtransform.gcj02tobd09(gpsList[0], gpsList[1]);
  } else if (gpsType === 3) {
    gpsObj.baidu = gpsList;
    gpsObj.gaode = coordtransform.bd09togcj02(gpsList[0], gpsList[1]);
    gpsObj.gps = coordtransform.gcj02towgs84(gpsObj.gaode[0], gpsObj.gaode[1]);
  }
  return gpsObj;
}

/**
 * 根绝坐标类型转换为高德坐标
 * @param {Number} gpsType
 * @param {Array} gpsList
 * @param {Boolean} gpsList
 * */
function transformationGpsPathArr(gpsType = 1, gpsList = [], isArr = false) {
  let gpsObj = [];
  if (gpsType === 1 || gpsType === 3) {
    for (let i = 0; i < gpsList.length; i++) {
      let item = gpsList[i].split(',');
      // 检验坐标
      if (checkLong(item[0]) && checkLat(item[1])) {
        let tem = [0, 0];
        if (gpsType === 1) {
          tem = coordtransform.wgs84togcj02(item[0], item[1]);
        } else if (gpsType === 3) {
          tem = coordtransform.bd09togcj02(item[0], item[1]);
        }
        if (isArr) {
          gpsObj.push(tem);
        } else {
          gpsObj.push(tem[0] + ',' + tem[1]);
        }
      } else {
        // eslint-disable-next-line no-new
        throw new Error('坐标校验失败！');
      }
    }
  } else if (gpsType === 2) {
    gpsObj = gpsList;
  }
  return gpsObj;
}

/**
 * 校验经度
 * @param {String} lng
 * */
function checkLong(lng = '') {
  const longrg =
    /^(\-|\+)?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,30})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,30}|180)$/;
  // if (!longrg.test(lng)) {
  //   return '经度整数部分为0-180,小数部分为0到30位!';
  // }
  // return true;
  // const tips = longrg.test(lng);
  // return tips;
  // true：正常  false：未通过校验
  return longrg.test(lng);
}

/**
 * 校验纬度
 * @param {String} lat
 * */
function checkLat(lat = '') {
  const latreg = /^(\-|\+)?([0-8]?\d{1}\.\d{0,30}|90\.0{0,30}|[0-8]?\d{1}|90)$/;
  // if(!latreg.test(lat)){
  //   return '纬度整数部分为0-90,小数部分为0到30位!';
  // }
  // return true;
  // const tips = latreg.test(lat);
  // return tips;
  // true: 正常 false：未通过校验
  return latreg.test(lat);
}

function errorTips() {
  notification.error({
    message: '坐标校验未通过!',
    description: '请检查坐标，使用规范的坐标！',
  });
}

// 正则去除、空格、换行、回车
function strReplace(param = '') {
  let str = '';
  // 去除所有的空格
  str = param.replace(/\s*/g, '');
  // 去除所有的换行
  str = param.replace(/\r\n*/g, '');
  // 去除所有的回车
  str = param.replace(/\n*/g, '');

  return str;
}

export {
  transformationGpsGD,
  checkLong,
  checkLat,
  transformationGpsPathArr,
  errorTips,
  strReplace,
};
