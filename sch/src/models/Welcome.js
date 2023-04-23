import { message } from "antd";
import { getAllMenuAndBranch2 } from "../services/dataMap";

/**
 * 首页 - 数据地图
 * @吴昊
 * */
export default {
  namespace: 'Welcome',
  state: {
    // 树结构存储
    treeData: null,
    // 加载状态
    loading: true,
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
          // 树结构存储
          treeData: null,
          // 树结构下方的表格
          treeTable: [],
          // 加载状态
          loading: true,
        },
      });
    },

    // 获取系统的树结构
    *getSystemTree({ payload, callback }, { call, put }) {
      const data = yield call(getAllMenuAndBranch2);
      let treeData = null;
      if (data.statusCode === 200) {
        const tem = data.content;
        let temArr = [];
        Object.keys(tem).forEach((key, value) => {
          temArr.push({
            name: key,
            children: tem[key].map((item) => {
              item.name = item.businessDescription;
              if (item.type !== '0') {
                item.lineStyle = {
                  color: 'red',
                };
              }
              return item;
            }),
          });
        });

        treeData = {
          name: '数据地图',
          children: temArr,
        };
      } else if (data.statusCode === 500) {
        message.error('查询失败，系统错误是：' + data.message);
      }

      yield put({
        type: 'commonState',
        payload: {
          treeData,
          loading: false,
        },
      });
    },
  },

  reducers: {
    commonState(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
