import dayjs from "dayjs";

/**
 * @desc 日期类
 * @author 吴昊 2020/9/24
 */

// 获取指定的日期
function getAppointDay(day, dayNum = 0, weekOfday) {
  return dayjs(day).add(dayNum, 'days').format('YYYY-MM-DD');
}

// 获取本周的第一天
function getMonday(start) {
  return dayjs(start).isoWeekday(1).format('YYYY-MM-DD'); // 获取本周第一天
}

// 获取周一到周日的日期
function getWeekDay(start, end) {
  let Monday = getMonday(start); // 获取本周第一天
  return [
    getAppointDay(Monday, 0),
    getAppointDay(Monday, 1),
    getAppointDay(Monday, 2),
    getAppointDay(Monday, 3),
    getAppointDay(Monday, 4),
    getAppointDay(Monday, 5),
    getAppointDay(Monday, 6),
  ];
}

// 获取周一到周五【5个连续的日期】
function getDateMondayFridayAll(start, end) {
  let Monday = getMonday(start); // 获取本周第一天
  let startTime = getAppointDay(Monday, 0); // 周一日期
  let endTime = getAppointDay(Monday, 4); // 周五日期
  return [
    startTime,
    getAppointDay(Monday, 1),
    getAppointDay(Monday, 2),
    getAppointDay(Monday, 3),
    endTime,
  ];
}

// 获取本周 【工作日】 的第一天和最后一天
function getDateMondayFriday(start, end) {
  let Monday = getMonday(start); // 获取本周第一天
  let startTime = getAppointDay(Monday, 0); // 周一日期
  let endTime = getAppointDay(Monday, 4); // 周五日期
  return {
    startTime,
    endTime,
  };
}

// 获取周六到周日
function getDateWeekend(start) {
  let Monday = getMonday(start); // 获取本周第一天
  let startTime = getAppointDay(Monday, 5); // 周六日期
  let endTime = getAppointDay(Monday, 6); // 周日日期
  return {
    startTime,
    endTime,
  };
}

// 获取本周的第一天和最后一天 【周一和周日】
function getWeekStartEnd(start, end) {
  let Monday = getMonday(start); // 获取本周第一天
  let startDay = getAppointDay(Monday, 0); // 周一日期
  let endDay = getAppointDay(Monday, 6); // 周五日期
  return {
    startDay,
    endDay,
  };
}

// 判断是否周末
function isWeekend(start, end) {
  let weekOfday = window.parseInt(dayjs(start).day());
  return weekOfday === 0 || weekOfday === 6;
}

// 月报 - 获取本月第一天和最后一天
function getMonthStartEnd(start) {
  let startDay = dayjs(start).format('YYYY-MM') + '-01';
  let endDay = dayjs(startDay).endOf('month').format('YYYY-MM-DD');
  return {
    startDay,
    endDay,
  };
}

// 年报 - 获取本年第一天和最后一天
function getYearStartEnd(start) {
  let startDay = dayjs(start).format('YYYY') + '-01-01';
  let endDay = dayjs(start).format('YYYY') + '-12-31';
  return {
    startDay,
    endDay,
  };
}

// 获取上个月份
function getMonth() {
  let curMonth = dayjs().month();
  let months = dayjs().month(curMonth - 1);
  return months;
}

export {
  // 获取周一到周五的开始和结束日期
  getDateMondayFriday,
  // 获取周六到周日
  getDateWeekend,
  // 判断是否周末
  isWeekend,
  // 获取周一到周日的日期
  getWeekDay,
  // 获取周一到周五
  getDateMondayFridayAll,
  // 月报
  getMonthStartEnd,
  // 年报
  getYearStartEnd,
  // 周报
  getWeekStartEnd,
  getMonday,
  // 获取上个月份
  getMonth,
};
