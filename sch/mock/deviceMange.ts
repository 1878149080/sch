import mockjs from 'mockjs';

/**
 * 草稿
 * */
export default {
  // 分页查询
  'POST /hong/deviceMangeGetPage': (req: any, res: any) => {
    const {pageSize = 10, pageIndex = 1, conditions = [] } = req.body.queryPager;
    const total = 888;
    res.json(mockjs.mock({
      statusCode: 200,
      content: {
        queryPager: {
          // pageSize: Math.ceil(888/pageSize),
          pageSize: pageSize,
          pageIndex: pageIndex,
          firstResult: 0,
          recordCount: 888,

          conditions: conditions,

          orderConditions: [],
        },

        [`recordSet|${pageSize}`]: [
          {
            "id|1-9999": 1,
            "lineId|1-5": 1,
            "submitName|": "@cname",
            "taskState|0-2": 0,
            submitTime: "@datetime",
            endTime: "@datetime",
            carNo: 123
          },
        ],
      },
    }));
  },
  'POST /sasds/deviceMangeGetPage': {"statusCode":200,"message":"提交审核"},

  // 获取区间初始运营信息、开始结束站点轨迹串：
  'POST /drt/connectLineTool/getSectionOperateInfo': {"statusCode": 200,
    "content":
      {"getSectionOperateInfo":
          {"sectionLineId": 1,
            "sectionLineName": "38路区2",
            "sectionLineCode": "20412038",
            "runRule": 1,
            "lineCode": "38",
            "lineVersion": "",
            "startStationSeq": 1,
            "endStationSeq": 12,
            "startStationName": "宝龙中心站",
            "endStationName": "国贸中心站",
            "sectionState": 0,
            "creatTime": "2021-08-27 16:00:00",
            "updateTime": null,
            "sectionStime": "06:00",
            "sitme": "06:00",
            "etime": "07:40",
            "numPassenger": 49,
            "sectionMlg": 9.358,
            "isDelete": null,
            "gpsList": "118.233,34.12312;118.233,34.12312;118.233,34.12312;118.233,34.12312;118.233,34.12312;"
          }
      }
  },

  // 区间推荐(多选一)：
  'POST /drt/connectLineTool/getCommendSectionOfSingle': {
    statusCode: 200,
    content: {
      "getCommendSectionOfSingle": [
        {
          "sectionLineId": 1,
          "sectionLineName": "38路",
          "sectionLineCode": "20412038",
          "runRule": 0,
          "lineCode": "38",
          "lineVersion": "",
          "startStationSeq": 7,
          "endStationSeq": 20,
          "startStationName": "宝龙中心站",
          "endStationName": "国贸中心站",
          "sectionState": 0,
          "creatTime": null,
          "updateTime": null,
          "sectionMlg": 9.358,
          "isDelete": 0,
          "numPassenger": 45,
          "gpsList": null,
          "sectionStime": "06:00",
          "stime": "06:00",
          "etime": "07:10"
        },
        {
          "sectionLineId": 1,
          "sectionLineName": "38路",
          "sectionLineCode": "20412038",
          "runRule": 0,
          "lineCode": "38",
          "lineVersion": "",
          "startStationSeq": 7,
          "endStationSeq": 20,
          "startStationName": "宝龙中心站",
          "endStationName": "国贸中心站",
          "sectionState": 0,
          "creatTime": null,
          "updateTime": null,
          "sectionMlg": 9.358,
          "isDelete": 0,
          "numPassenger": 45,
          "gpsList": null,
          "sectionStime": "06:00",
          "stime": "06:00",
          "etime": "07:10"
        }
      ]
    },
    message: '查询成功',
  },

  // 草稿新增
  'POST /drt/connectLineTool/addDrtLine': {"statusCode":200,"message":"草稿新增"},

  // 草稿编辑
  'POST /drt/connectLineTool/updateDrtLine': {"statusCode":200,"message":"草稿编辑"},

  // 提交审核
  'POST /drt/connectLineTool/submitReview': {"statusCode":200,"message":"提交审核"},

  // 系统推荐(4个方案,多条区间)
  'POST /drt/connectLineTool/getSysCommendSchemeSection': {
    statusCode: 200,
    content: [],
    message: '查询成功',
  },

  // 查看详情
  'POST /drt/connectLineTool/getDetail': {
    statusCode: 200,
    content: {"section":[
        {"sectionLineId": 0,
          "sectionLineName": "38路",
          "sectionLineCode": "123456",
          "runRule": 0,
          "lineCode": 123456,
          "lineVersion": "",
          "startStationSeq": 0,
          "endStationSeq": 8,
          "startStationName": "开始站点名称",
          "endStationName": "结束站点名称",
          "sectionState": 0,
          "creatTime": "2021-08-27 17:47:45",
          "updateTime": "2021-08-27 17:47:45",
          "sectionMlg": 10.22,
          "isDelete": 0,
          "numPassenger": 45,
          "gpsList": "118.233,34.12312;118.233,34.12312;118.233,34.12312;118.233,34.12312;118.233,34.12312;",
          "sectionStime": "2021-08-27 17:47:45",
          "stime": "2021-08-27 17:47:45",
          "etime": "2021-08-27 17:47:45"
        }],
      "emulateResult":null},
    message: '查询成功',
  },

};
