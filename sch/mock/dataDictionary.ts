import mockjs from 'mockjs';

/**
 * 草稿
 * */
export default {
  'POST /mock/dataDictionary/list': (req: any, res: any) => {
    const {pageSize = 10, pageIndex = 1, conditions = [] } = req.body.queryPager;
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

  'POST /mock/carRegister': {"statusCode":200,"message":"Ok"},

};
