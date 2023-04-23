import React, { useState } from 'react';
import TableToolbar from '../component/common/tableToolbar/tableToolbar';
import Table from '@/component/tables/index';
import { getRoleBarBtn } from '@/utils/logo/roleBtn';
import getColumns from './columns';
import Register from './register';

// interface
import {
  BarBtn,
  ListProps,
  OrdersType,
  TableToolbarType,
  TableType,
} from '@/utils/interfaces';

type visibleType = 'register' | 'edit' | 'duplicate' | null;

const List: React.FC<ListProps> = (props) => {
  const [columns, setColumn] = useState(getColumns({ onEdit, onDuplicate }));
  const [visible, setVisible] = useState<visibleType>(null);

  function onEdit() {
    setVisible('edit');
  }

  function onDuplicate() {
    setVisible('duplicate');
  }

  const handleSetColumn = (column: any) => {
    setColumn(column);
  };
  const downLoadFile = () => {};
  const getTableBarRoleBtn = () => {
    let btnList: Array<BarBtn> = [
      {
        name: '新增',
        disabled: false,
        role: '',
        icon: <span className="iconfont icon-daochu" />,
        handle: () => setVisible('register'),
      },
      {
        name: '导出',
        disabled: false,
        role: '',
        icon: <span className="iconfont icon-daochu" />,
        handle: downLoadFile,
      },
    ];
    return getRoleBarBtn(btnList);
  };

  // 表格工具参数
  const tableToolbarProps: TableToolbarType = {
    columns: columns,
    title: '数据字典',
    canExpand: true,
    columnFilterEnable: true,
    pageThis: props.pageThis,
    setColumn: handleSetColumn,
    btnList: getTableBarRoleBtn(),
  };

  // 表格参数
  const tableProps: TableType = {
    getPage: props.getPage,
    queryPager: props.queryPager,
    pagination: props.pagination,
    table: {
      rowSelection: {
        type: 'checkbox',
        columnWidth: 12,
      },
      loading: props.table.loading,
      dataSource: props.table.dataSource,
      columns,
      scroll: {},
      columnSorter,
    },
  };
  let mode: { [index: string]: string } = {
    register: '新增',
    edit: '编辑',
    duplicate: '复制',
  };
  const registerProps = {
    modal: {
      title: mode[visible + ''],
      onOk: () => {},
      onCancel: () => {
        setVisible(null);
      },
    },
  };

  const registerList: any[] = ['register', 'edit', 'duplicate'];
  return (
    <>
      <TableToolbar {...tableToolbarProps}>
        <Table {...tableProps} />
      </TableToolbar>
      {registerList.includes(visible) ? <Register {...registerProps} /> : null}
    </>
  );
};

export default List;

// 表头排序
export function columnSorter(columnObj: any) {
  const { order = undefined, columnKey = '' } = columnObj;
  let orders: OrdersType[] = [];
  if (order) {
    // 排序列名 - 后台
    let fieldName = '';
    if (columnKey === 'carNo') fieldName = 'car_no';

    orders = [
      {
        fieldName: fieldName,
        isAsc: order === 'ascend',
      },
    ];
  }

  return orders;
}
