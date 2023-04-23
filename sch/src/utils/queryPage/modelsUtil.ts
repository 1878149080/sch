import { log } from '@/services/device/deviceManage';
import { message } from 'antd';
import { httpErrFilter } from '../dictionaries';
import { ApiResult } from '@/utils/modelUtil/interfaces';

/**
 * @desc models的工具类
 * @author 吴昊
 * */

// 查询条件默认参数
function getQueryPager(props?: any) {
  const {
    conditions = [],
    firstResult = 0,
    orderConditions = [],
    pageIndex = 1,
    pageSize = 20,
  } = props || {};
  return {
    conditions,
    firstResult,
    orderConditions,
    pageIndex,
    pageSize,
    recordCount: 0,
  };
}

// 分页默认参数
function getPagination(props?: any) {
  const {
    showSizeChanger = true,
    size = 'default',
    pageSize = 20,
    total = 0,
    pageSizeOptions = ['10', '20', '50', '100', '1000'],
  } = props || {};
  return {
    showSizeChanger,
    showQuickJumper: true,
    showTotal: (total: String) => `共 ${total} 条`,
    total,
    size,
    current: 1,
    pageSize,
    pageSizeOptions: pageSizeOptions,
  };
}

// 分页结果处理
function getByPageState(
  state: any,
  action: any,
  modelsName: any,
  keyName: any = undefined,
  queryPagerVisible: any = false,
) {
  const data = action.payload.data;
  const queryPager = action.payload.queryPager;
  let list = [];
  if (data.code === 200) {

    // let queryPager = data.content.queryPager;

    getQueryPage(state, action, queryPagerVisible);

    state.pagination.total = data?.data.total ? Number(data.data.total) : 0;
    state.pagination.current = queryPager.pageIndex;
    state.pagination.pageSize = queryPager.pageSize;
    // state.pagination.pageIndex = queryPager.current;
    // state.pagination.recordCount = state.pagination.total;
    const current = queryPager.current;
    const pageSize = queryPager.pageSize;
    let startIndex = current * pageSize - pageSize + 1;

    const unixTime = new Date().getTime();
    list = data.data.records.map((item: any, index: number) => {
      // item.key = modelsName + '_' + (keyName ? item[keyName] : item.drtLineId);
      item.key = unixTime + index;
      item._index = startIndex;
      startIndex += 1;
      return item;
    });
  } else if (httpErrFilter.indexOf(data.statusCode) === -1) {
    // message.error(data.message);
    state.pagination = {
      current: 1,
      pageSize: 20,
      total: 0,
    };
  }
  state.loading = false;
  state.list = list;
  return state;
}

// queryPagerVisible 当为true的时候使用后端传递的参数

function getQueryPage(state: any, action: any, queryPagerVisible: any = false) {
  const { queryPager = null, queryPagers = null } = action.payload;

  if (queryPager) {
    let oldQueryPage = {};
    if (!queryPagerVisible) {
      oldQueryPage = {
        pageIndex: queryPager.pageIndex,
        pageSize: queryPager.pageSize,
        recordCount: queryPager.recordCount,
        orderConditions: queryPager.orderConditions,
      };
    }
    state.queryPager = {
      ...queryPager,
      ...oldQueryPage,
      // ...queryPager,
    };
    // console.log(state.queryPager);
  } else if (queryPagers) {
    let oldQueryPage = {};
    if (!queryPagerVisible) {
      oldQueryPage = {
        pageIndex: queryPager.pageIndex,
        pageSize: queryPager.pageSize,
        recordCount: queryPager.recordCount,
        orderConditions: queryPager.orderConditions,
      };
    }
    state.queryPagers = {
      ...queryPagers,
      queryPager: {
        ...queryPagers.queryPager,
        ...oldQueryPage,
      },
      // ...queryPager,
    };
    // console.log(state.queryPagers);
  }
}

// 删除
function deleteItem(data: ApiResult, callback: any) {
  if (data.statusCode === 200) {
    message.success('删除成功');
  } else if (httpErrFilter.indexOf(data.statusCode) === -1) {
    message.error('删除失败! 错误：' + data.message);
  }
  if (callback) callback(data);
}

// 添加
function add(data: any, keys: any = undefined, callback: any) {
  if (data.statusCode === 200) {
    // const {message = "", content = ""} = data;
    message.success(keys ? data[keys] : '操作成功');
  } else if (httpErrFilter.indexOf(data.statusCode) === -1) {
    message.error(data.message);
  }
  if (callback) callback(data);
}

// 添加参数和文件上传
function addFileData(data: any, payload: any, callback: any, callBack2: any) {
  const id = payload.modalsList;
  if (data.statusCode === 200) {
    message.success(id ? '编辑成功' : '添加成功');
  } else if (httpErrFilter.indexOf(data.statusCode) === -1) {
    message.error(
      (id ? '编辑失败! 错误：' : '添加失败! 错误：') + data.message,
    );
  }
  if (callback) callback(data);
  if (callBack2) callBack2(data);
}

// 通用下拉数据1 - 直接返回接口的数组
function getResultArray1(data: any) {
  let temList = [];
  if (data.statusCode === 200) {
    temList = data.content || [];
  } else if (httpErrFilter.indexOf(data.statusCode) === -1) {
    message.error(data.message);
  }
  return temList;
}

// 生成规范的下拉数据 - 生成key / value的数据
function getResultOption(data: any, name: any, value: any) {
  let temList = [];
  if (data.statusCode === 200) {
    temList =
      data.content.map((item: any) => {
        return {
          name: item[name],
          value: item[value],
        };
      }) || [];
  } else if (httpErrFilter.indexOf(data.statusCode) === -1) {
    message.error(data.message);
  }
  return temList;
}

export {
  getQueryPager,
  getPagination,
  getByPageState,
  deleteItem,
  add,
  addFileData,
  getResultArray1,
  getResultOption,
};
