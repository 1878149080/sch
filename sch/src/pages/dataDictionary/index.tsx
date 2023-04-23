import React, { useRef } from 'react';
import { connect } from 'umi';
import Search from './search';
import List from './list';
import dayjs from 'dayjs';
import './index.less';

const DataDictionary: React.FC<any> = (props) => {
  const { queryPager: queryPagers, loading, list, pagination } = props;
  const search = useRef<HTMLElement | null>(null);

  // 分页请求
  const getList = (params = defaultPageParams) => {
    props.dispatch({
      type: 'dataDictionary/getPage',
      payload: params,
    });
  };

  // 获取分页数据
  const getPage = (queryPager: { orderConditions?: any[] } = {}) => {
    const { orderConditions: order = [] } = queryPager;
    let query = Object.assign({}, props.queryPager, queryPager);
    query.orderConditions = order.length > 0 ? order : defaultOrder;
    getList({ queryPager: query });
  };

  // 搜索参数
  const searchProps = {
    refs: (node: HTMLElement | null) => {
      search.current = node;
    },
    onSearch: (form: object) => {
      let queryPager = Object.assign({}, queryPagers);
      queryPager.conditions = handleCondition(form);
      queryPager.pageIndex = 1;
      getPage(queryPager);
    },
  };
  // 列表参数
  const listProps = {
    getPage,
    pageThis: () => {
      return {
        refList: search.current,
      };
    },
    queryPager: queryPagers,
    pagination: pagination,
    table: {
      loading,
      dataSource: list,
    },
  };
  return (
    <div className="content-box-bg" style={{ padding: '14px' }}>
      <Search {...searchProps}></Search>
      <List {...listProps} />
    </div>
  );
};

export default connect((model: any) => model.dataDictionary)(DataDictionary);

// 处理查询条件
function handleCondition(form: object) {
  let conditions: object[] = [];
  for (let [key, value] of Object.entries(form)) {
    if (value || value === 0) {
      conditions = conditions.concat(condition[key](key, value));
    }
  }
  return conditions;
}

// 默认排序
const defaultOrder = [
  {
    isAsc: false,
    fieldName: 'location_fault_cnt',
  },
];

// 分页参数默认值
const defaultPageParams = {
  queryPager: {
    pageSize: 20,
    pageIndex: 1,
    firstResult: 0,
    recordCount: 0,
    conditions: [],
    orderConditions: defaultOrder,
  },
};

// 查询条件
type conditionType = {
  [index: string]: (key: string, value: any) => [] | object[];
};
const condition: conditionType = {
  date: (key, value) => {
    return [
      {
        fieldName: 'stime',
        dataType: 'String',
        value: dayjs(value[0]).format('YYYY-MM-DD 00:00:00'),
        conditionType: 'nosmaller',
        type: 'and',
      },
      {
        fieldName: 'etime',
        dataType: 'String',
        value: dayjs(value[1]).format('YYYY-MM-DD 23:59:59'),
        conditionType: 'nobigger',
        type: 'and',
      },
    ];
  },
  // lineName(key: string, value: any) {
  //   return value?.length
  //     ? [
  //         {
  //           fieldName: key,
  //           dataType: 'string',
  //           conditionType: 'in',
  //           type: 'and',
  //           value: value,
  //         },
  //       ]
  //     : [];
  // },
  // isFlatPeak(key: string, value: any) {
  //   return [
  //     {
  //       fieldName: key,
  //       dataType: 'String',
  //       value: value,
  //       conditionType: 'equals',
  //       type: 'and',
  //     },
  //   ];
  // },
  // ccBatchName(key: string, value: any) {
  //   return value?.length > 0 ? [
  //     {
  //       fieldName: key,
  //       dataType: 'String',
  //       value: value,
  //       conditionType: 'in',
  //       type: 'and',
  //     },
  //   ] : [];
  // },
};
