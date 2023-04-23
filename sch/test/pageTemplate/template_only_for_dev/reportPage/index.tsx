import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'umi';
import { Form } from 'antd';
import Search from './search';
import List from './list';
import dayjs from 'dayjs';
import './index.less';
import { handleCondition } from '@/utils/listPageUtils';

// interface
import { conditionType } from '@/utils/listPageUtils';

const Index: React.FC<any> = (props) => {
  const { queryPager: queryPagers, loading, list, pagination } = props;
  const [form] = Form.useForm();
  const search = useRef<HTMLElement | null>(null);

  // 页面关闭清空全局状态
  useEffect(() => {
    return () =>
      props.dispatch({
        type: 'softVersion/clearState',
      });
  }, []);

  // 分页请求
  const getList = (params: any) => {
    props.dispatch({
      type: 'softVersion/getPage',
      payload: params,
    });
  };

  // 获取分页数据
  const getPage = (queryPager: any) => {
    getList({ queryPager: queryPager ? queryPager : props.queryPager });
  };

  const getPage2 = () => {
    getList({queryPager: queryPagers});
  }

  // 搜索参数
  const searchProps = {
    form: form,
    refs: (node: HTMLElement | null) => {
      search.current = node;
    },
    onSearch: (form: object) => {
      let queryPager = Object.assign({}, queryPagers);
      queryPager.conditions = handleCondition(form, condition);
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
    <div>
      <Search {...searchProps}></Search>
      <List {...listProps} />
    </div>
  );
};

export default connect((model: any) => model.softVersion)(Index);


const condition: conditionType = {
  date: (key: string, value: any) => {
    return Array.isArray(value) && value.length > 0
      ? [
          {
            fieldName: 'createTime',
            dataType: 'string',
            conditionType: 'nosmaller',
            type: 'and',
            value: dayjs(value[0]).format('YYYY-MM-DD 00:00:00'),
            group: 't1',
          },
          {
            fieldName: 'createTime',
            dataType: 'string',
            conditionType: 'nobigger',
            type: 'and',
            value: dayjs(value[1]).format('YYYY-MM-DD 23:59:59'),
            group: 't1',
          },
        ]
      : [];
  },
  terminalType(key: string, value: any) {
    return [
      {
        fieldName: 'terminalType',
        dataType: 'int',
        conditionType: 'in',
        type: 'and',
        value: value,
        group: 't1',
      },
    ];
  },
  status(key: string, value: any) {
    return value?.length > 0
      ? [
          {
            fieldName: 'isDelete',
            dataType: 'int',
            conditionType: 'in',
            type: 'and',
            value: value.join(','),
            group: 't1',
          },
        ]
      : [];
  },
  version(key: string, value: any) {
    return [
      {
        fieldName: 'versionNo',
        dataType: 'string',
        conditionType: 'like',
        type: 'and',
        value: value,
        group: 't1',
      },
    ];
  },
  versionDesc(key: string, value: any) {
    return [
      {
        fieldName: 'versionDesc',
        dataType: 'string',
        conditionType: 'like',
        type: 'and',
        value: value,
        group: 't1',
      },
    ];
  },
};