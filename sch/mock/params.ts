/**
 * 线路参数配置
 * */
export default {
  // 获取该线路下的参数配置信息
  'POST /schedule/ScheduleTaskParam/getByLineName': {
    statusCode: 200,
    content: {
      id: 1,
      lineId: '101路',
      carNumUp: 10,
      carNumDown: 10,
      driverNum: 12,
      maxFlow: 100,
      firstShiftUp: 9764000,
      lastShiftUp: 52969000,
      firstShiftDown: -4598000,
      lastShiftDown: 45808000,
      highUpDuration: 10,
      flatUpDuration: 20,
      highDownDuration: 10,
      flatDownDuration: 20,
      refuelTimeUpStart: 9831000,
      refuelTimeUpEnd: 13439000,
      refuelDurationUp: 40,
      refuelTimeDownStart: 9852000,
      refuelTimeDownEnd: 13455000,
      refuelDurationDown: 40,
    },
    message: '查询成功',
  },
};
