import React, { useEffect, useRef } from 'react';
import { connect } from 'umi';
import { Form } from 'antd';
import Search from './search';
import List from './list';
import dayjs from 'dayjs';
import '../../loginLog/index.less';
import { setBuryingPoint } from '@/utils/log/request';

const Index: React.FC<any> = (props) => {
  const { queryPager: queryPagers, loading, list, pagination } = props;
  const [form] = Form.useForm();
  const search = useRef<HTMLElement | null>(null);
  useEffect(() => {
    // 用户访问埋点
    setBuryingPoint('异常日志');
  }, []);

  // 页面关闭清空全局状态
  useEffect(() => {
    return () =>
      props.dispatch({
        type: 'exceptionLog/clearState',
      });
  }, []);

  // 分页请求
  const getList = (params = defaultPageParams) => {
    props.dispatch({
      type: 'exceptionLog/getPage',
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
    form: form,
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

export default connect((model: any) => model.exceptionLog)(Index);

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
  {
    isAsc: false,
    fieldName: 'accessTime',
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
  accessTime: (key: string, value: any) => {
    return Array.isArray(value) && value.length > 0
      ? [
          {
            dataTypeEnum: 'STRING',
            conditionTypeEnum: 'NOT_SMALLER',
            fieldName: 'accessTime',
            dataType: 'string',
            conditionType: 'nosmaller',
            type: 'and',
            value: dayjs(value[0]).format('YYYY-MM-DD HH:mm:ss'),
          },
          {
            dataTypeEnum: 'STRING',
            conditionTypeEnum: 'NOT_BIGGER',
            fieldName: 'accessTime',
            dataType: 'string',
            conditionType: 'nobigger',
            type: 'and',
            value: dayjs(value[1]).format('YYYY-MM-DD HH:mm:ss'),
          },
        ]
      : [];
  },
  ipaddr(key: string, value: any) {
    return [
      {
        dataTypeEnum: 'STRING',
        conditionTypeEnum: 'LIKE',
        fieldName: 'ipaddr',
        dataType: 'string',
        conditionType: 'like',
        type: 'and',
        value: value,
      },
    ];
  },
  useName(key: string, value: any) {
    return [
      {
        dataTypeEnum: 'STRING',
        conditionTypeEnum: 'LIKE',
        fieldName: 'userName',
        dataType: 'string',
        conditionType: 'like',
        type: 'and',
        value: value,
      },
    ];
  },
  exceptionName(key: string, value: any) {
    return [
      {
        fieldName: 'exceptionName',
        dataType: 'string',
        conditionType: 'like',
        type: 'and',
        value: value,
      },
    ];
  },
};
