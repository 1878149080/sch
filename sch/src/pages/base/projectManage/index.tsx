import React, { useRef } from 'react';
import { connect } from 'umi';
import Search from './search';
import List from './list';
import './index.less';

const ProjectManage: React.FC<any> = (props) => {
  const { queryPager: queryPagers, loading, list, pagination } = props;
  const search = useRef<HTMLElement | null>(null);

  // 分页请求
  const getList = (params = defaultPageParams) => {
    props.dispatch({
      type: 'projectManage/getPage',
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

  const getPage2 = () => {
    getList({ queryPager: queryPagers });
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
    getPage2,
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

export default connect((model: any) => model.projectManage)(ProjectManage);

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
const defaultOrder: any = [
  // {
  //   isAsc: false,
  //   fieldName: 'location_fault_cnt',
  // },
];

// 分页参数默认值
const defaultPageParams = {
  queryPager: {
    pageSize: 20,
    pageIndex: 1,
    firstResult: 0,
    recordCount: 0,
    conditions: [],
    orderConditions: [],
  },
};

// 查询条件
type conditionType = {
  [index: string]: (key: string, value: any) => [] | object[];
};
const condition: conditionType = {
  project(key: string, value: any) {
    return [
      {
        dataTypeEnum: 'STRING',
        conditionTypeEnum: 'LIKE',
        fieldName: 'projectName',
        dataType: 'string',
        conditionType: 'like',
        type: 'and',
        value: value,
      },
    ];
  },
};
