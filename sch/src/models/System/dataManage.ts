import { getByPage } from "@/services/System/dataManage";
import { getByPageState, getQueryPager } from "@/utils/queryPage/modelsUtil";
import { ApiResult } from "@/utils/modelUtil/interfaces";

/**
 *
 * */
const defaultOrder = {
  orderConditions: [
    {
      fieldName: 'createTime',
      isAsc: false,
    },
    // {
    //   "fieldName":"t4.endTime_",
    //   "isAsc": false
    // }
  ],
};
export default {
  namespace: 'dataManage',
  state: {
    // 查询条件
    queryPager: getQueryPager(defaultOrder),
    // 分页参数
    pagination: {
      current: 1,
      pageSize: 50,
      total: 0,
    },
    // 加载状态
    loading: false,
    // 表格数据
    list: [],
    // 线路数据
    fleetList: [],
    lineList: [],
    carList: [],
  },
  subscriptions: {},
  effects: {
    *commonHandle({ payload }: any, { call, put }: any) {
      yield put({
        type: 'commonState',
        payload,
      });
    },

    *clearState({ payload }: any, { call, put }: any) {
      yield put({
        type: 'commonState',
        payload: {
          queryPager: getQueryPager(defaultOrder),
          pagination: {
            current: 1,
            pageSize: 50,
            total: 0,
          },
          loading: false,
          list: [],
          fleetList: [],
          lineList: [],
          carList: [],
        },
      });
    },

    // 分页
    *getPage({ payload }: any, { call, put }: any) {
      yield put({
        type: 'commonState',
        payload: {
          loading: true,
        },
      });
      let data: ApiResult = yield call(getByPage, payload);
      yield put({
        type: 'getByPageState',
        payload: {
          data,
          queryPager: payload.queryPager,
        },
      });
    },
  },
  reducers: {
    commonState(state: any, action: any) {
      return { ...state, ...action.payload };
    },
    getByPageState(state: any, action: any) {
      getByPageState(state, action, 'data_manage', 'dictCode');
      return state;
    },
  },
};

// 遍历组织机构
export function eachOrg(list = []) {
  return list.map((item: any) => {
    let param: any = {
      title: item.orgNameCn,
      value: item.orgId,
    };
    if (item.children !== null && item.children.length > 0) {
      item.children = eachOrg(item.children);
      param.children = item.children;
    }
    return param;
  });
}
