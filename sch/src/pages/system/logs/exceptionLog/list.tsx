import React, { useEffect, useState } from "react";
import TableToolbar from "@/pages/component/common/tableToolbar/tableToolbar";
import Table from "@/component/tables/index";
import { getRoleBarBtn } from "@/utils/logo/roleBtn";
import getColumns from "./columns";

// interface
import { BarBtn, ListProps, OrdersType, TableToolbarType, TableType } from "@/utils/interfaces";
// type visibleType = "rootCertificationRegister" | "serverCertificationRegister" | "batchDelete" | "detail" | "keyLoad" | null;

const List: React.FC<ListProps> = (props) => {
  const [columns, setColumn] = useState(getColumns({}));
  // const [visible, setVisible] = useState<visibleType>(null);
  // const [currentRow, setCurrentRow] = useState<{ [index: string]: any }>({});
  // const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  // const selectedRows = useRef<any[]>();
  // const currentRow = useRef<{ [index: string]: any }>({});

  // 清空选中
  useEffect(() => {
    // setSelectedRowKeys([]);
    // selectedRows.current = [];
  }, [props.table]);

  // 列配置处理
  const handleSetColumn = (column: any) => {
    setColumn(column);
  };

  // 工具栏按钮
  const getTableBarRoleBtn = () => {
    let btnList: Array<BarBtn> = [
      //   {
      //   name: '数字证书生成',
      //   disabled: false,
      //   // role: "",
      //   icon: <span className="iconfont icon-daochu" />,
      //   handle: () => setVisible("rootCertificationRegister"),
      // }, {
      //   name: '作废',
      //   disabled: selectedRowKeys.length > 0 ? false : true,
      //   // role: "",
      //   icon: <span className="iconfont icon-daochu" />,
      //   handle: () => setVisible("batchDelete"),
      // }, {
      //   name: '导出',
      //   disabled: props.table.dataSource.length > 0 ? false : true,
      //   // role: "",
      //   icon: <span className="iconfont icon-daochu" />,
      //   handle: downLoadFile,
      // }
    ];
    return getRoleBarBtn(btnList);
  };

  // 表格工具参数
  const tableToolbarProps: TableToolbarType = {
    columns: columns,
    title: '异常日志列表',
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
    table: {
      loading: props.table.loading,
      dataSource: props.table.dataSource,
      columns,
      scroll: {
        y: 14,
      },
      columnSorter,
      // rowSelection: {
      //   columnWidth: 18,
      //   selectedRowKeys,
      //   onChange: (selectedRowKeys: any, selectedRow: any) => {
      //     selectedRows.current = selectedRow;
      //     setSelectedRowKeys(selectedRowKeys);
      //   },
      // }
    },
    pagination: props.pagination,
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
    orders = [
      {
        fieldName: columnKey,
        isAsc: order === 'ascend',
      },
    ];
  }

  return orders;
}
