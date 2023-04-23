import { message } from "antd";
import { deleteByIds, getByPage, getRole, resetPassword, update } from "../../../services/System/permissions/user";
import { getByPageState, getQueryPager } from "../../../utils/queryPage/modelsUtil";

/**
 * 用户管理
 * @吴昊
 * */
export default {
  namespace: 'user',
  state: {
    queryPager: getQueryPager({
      orderConditions: [
        {
          fieldName: 'T1.real_name',
          isAsc: false,
        },
      ],
      pageSize: 20,
    }),
    pagination: {
      current: 1,
      pageSize: 20,
      total: 0,
    },

    loading: false,
    list: [],
    visible: false,
    spinLoad: false,
    modalsList: [],
    buMen: [],
    role: [],
  },
  subscriptions: {},

  effects: {
    *commonHandle({ payload }, { call, put }) {
      yield put({
        type: 'commonState',
        payload,
      });
    },
    *clearState({ payload }, { call, put }) {
      yield put({
        type: 'commonState',
        payload: {
          queryPager: getQueryPager({
            orderConditions: [
              {
                fieldName: 'T1.real_name',
                isAsc: false,
              },
            ],
            pageSize: 20,
          }),
          pagination: {
            current: 1,
            pageSize: 20,
            total: 0,
          },

          loading: false,
          list: [],
          visible: false,
          spinLoad: false,
          modalsList: [],
          buMen: [],
          role: [],
        },
      });
    },
    // 角色
    *role({ payload }, { call, put }) {
      const data = yield call(getRole);
      if (data.statusCode === 200) {
        yield put({
          type: 'commonState',
          payload: {
            role: data.content || [],
          },
        });
      } else if (data.statusCode === 500) {
        // message.error('查询失败，系统错误是：' + data.message);
      }
    },
    *resetPassword({ payload, callback }, { call, put }) {
      const data = yield call(resetPassword, payload);
      if (data.statusCode === 200) {
        message.success('重置密码成功！');
        callback();
      } else if (data.statusCode === 500) {
        // message.error('重置密码失败! 错误：' + data.message);
      }
    },

    *add({ payload, callback }, { call, put }) {
      const { modalsList, user } = payload;
      const data = yield call(update, { user });
      let state = false;
      if (data.statusCode === 200) {
        if (modalsList) {
          message.success('编辑成功');
        } else {
          message.success('添加成功');
        }
        state = true;
      } else if (data.statusCode === 500) {
        // if (modalsList) {
        //   message.error('编辑失败! 错误：' + data.message);
        // } else {
        //   message.error('添加失败! 错误：' + data.message);
        // }
      }

      if (callback) callback(state);
    },
    *deletes({ payload, callback }, { call, put }) {
      const data = yield call(deleteByIds, payload);
      if (data.statusCode === 200) {
        // message.success('删除成功');
        callback();
      } else if (data.statusCode === 500) {
        // message.error('删除失败! 错误：' + data.message);
      }
    },
    *getPage({ payload }, { call, put }) {
      yield put({
        type: 'commonState',
        payload: {
          loading: true,
        },
      });
      const data = yield call(getByPage, payload);
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
    commonState(state, action) {
      return { ...state, ...action.payload };
    },
    getByPageState(state, action) {
      getByPageState(state, action, 'user', 'userId');
      return state;
    },
  },
};
