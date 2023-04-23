import React, { useState } from 'react';
import TableToolbar from '@/pages/component/common/tableToolbar/tableToolbar';
import Table from '@/component/tables';
import { getRoleBarBtn } from '@/utils/logo/roleBtn';
import getColumns from './columns';

// interface
import {
  BarBtn,
  ListProps,
  OrdersType,
  TableToolbarType,
  TableType,
} from '@/utils/interfaces';

const List: React.FC<ListProps> = (props) => {
  // const { form } = props;
  const [columns, setColumn] = useState(getColumns({}));
  const handleSetColumn = (column: any) => {
    setColumn(column);
  };
  const downLoadFile = () => {};
  const getTableBarRoleBtn = () => {
    let btnList: Array<BarBtn> = [
      {
        name: '导出',
        // @ts-ignore
        disable: true,
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
    title: '控制器',
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
    pagination: false,
    table: {
      loading: props.table.loading,
      dataSource: props.table.dataSource,
      columns,
      scroll: {},
      columnSorter,
    },
  };

  return (
    <>
      <TableToolbar {...tableToolbarProps}>
        <Table {...tableProps} />
      </TableToolbar>
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
