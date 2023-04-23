import { getByPage } from "@/services/base/userManage";
import { getByPageState, getQueryPager } from "@/utils/queryPage/modelsUtil";
import { ApiResult } from "@/utils/modelUtil/interfaces";

/**
 * @desc 系统管理 -> 日志管理 -> 异常日志
 * **/
const defaultOrder = {
  orderConditions: [
    // {
    //   fieldName: 'accessTime',
    //   isAsc: false,
    // },
  ],
};
export default {
  namespace: 'userManage',
  state: {
    // 查询条件
    queryPager: {
      pageIndex: 1,
      pageSize: 20,
    },
    // 分页参数
    pagination: {
      current: 1,
      pageSize: 20,
      total: 0,
    },
    // 加载状态
    loading: false,
    // 表格数据
    list: [],
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
          queryPager: {
            pageIndex: 1,
            pageSize: 20,
          },
          pagination: {
            current: 1,
            pageSize: 20,
            total: 0,
          },
          loading: false,
          list: [],
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
          queryPager: payload,
        },
      });
    },
  },
  reducers: {
    commonState(state: any, action: any) {
      return { ...state, ...action.payload };
    },
    getByPageState(state: any, action: any) {
      getByPageState(state, action, 'exceptionLog', 'infoId');
      return state;
    },
  },
};
