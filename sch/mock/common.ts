import mockjs from 'mockjs';
import { selectData, line, car } from './mockData';

/**
 * 草稿
 * */
export default {
  // 分页查询
  'POST /mock/select': (req: any, res: any) => {
    res.json(
      mockjs.mock({
        statusCode: 200,
        content: {
          treeData: selectData
        },
        // statusCode: 500,
        // message: "服务端错误"
      }),
    );
  },
  "POST /mock/line": (req: any, res: any) => {
    res.json(
      mockjs.mock({
        statusCode: 200,
        content: line
      })
    )
  },

  "POST /mock/car": (req: any, res: any) => {
    res.json(
      mockjs.mock({
        statusCode: 200,
        content: car
      })
    )
  },

  'POST /sasds/deviceMangeGetPage': { statusCode: 200, message: '提交审核' },

  // 获取区间初始运营信息、开始结束站点轨迹串：
  'POST /drt/connectLineTool/getSectionOperateInfo': {
    statusCode: 200,
    content: {
      getSectionOperateInfo: {
        sectionLineId: 1,
        sectionLineName: '38路区2',
        sectionLineCode: '20412038',
        runRule: 1,
        lineCode: '38',
        lineVersion: '',
        startStationSeq: 1,
        endStationSeq: 12,
        startStationName: '宝龙中心站',
        endStationName: '国贸中心站',
        sectionState: 0,
        creatTime: '2021-08-27 16:00:00',
        updateTime: null,
        sectionStime: '06:00',
        sitme: '06:00',
        etime: '07:40',
        numPassenger: 49,
        sectionMlg: 9.358,
        isDelete: null,
        gpsList:
          '118.233,34.12312;118.233,34.12312;118.233,34.12312;118.233,34.12312;118.233,34.12312;',
      },
    },
  },

  // 区间推荐(多选一)：
  'POST /drt/connectLineTool/getCommendSectionOfSingle': {
    statusCode: 200,
    content: {
      getCommendSectionOfSingle: [
        {
          sectionLineId: 1,
          sectionLineName: '38路',
          sectionLineCode: '20412038',
          runRule: 0,
          lineCode: '38',
          lineVersion: '',
          startStationSeq: 7,
          endStationSeq: 20,
          startStationName: '宝龙中心站',
          endStationName: '国贸中心站',
          sectionState: 0,
          creatTime: null,
          updateTime: null,
          sectionMlg: 9.358,
          isDelete: 0,
          numPassenger: 45,
          gpsList: null,
          sectionStime: '06:00',
          stime: '06:00',
          etime: '07:10',
        },
        {
          sectionLineId: 1,
          sectionLineName: '38路',
          sectionLineCode: '20412038',
          runRule: 0,
          lineCode: '38',
          lineVersion: '',
          startStationSeq: 7,
          endStationSeq: 20,
          startStationName: '宝龙中心站',
          endStationName: '国贸中心站',
          sectionState: 0,
          creatTime: null,
          updateTime: null,
          sectionMlg: 9.358,
          isDelete: 0,
          numPassenger: 45,
          gpsList: null,
          sectionStime: '06:00',
          stime: '06:00',
          etime: '07:10',
        },
      ],
    },
    message: '查询成功',
  },
};
