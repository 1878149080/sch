import React, { useEffect, useRef, useState } from 'react';
import Table from '@/component/tables/index';
import { getRoleBarBtn } from '@/utils/logo/roleBtn';
import TableToolbar from '@/pages/component/common/tableToolbar/tableToolbar';
import getColumns from './columns';
import Register from './register';
// import downloadFile, { download } from '@/utils/downloadFile';
// import { downloadURL } from '@/services/serverCertificationManage';
import { message, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { add, edit, remove } from '@/services/System/dataManage';
// interface
import {
  BarBtn,
  ListProps,
  OrdersType,
  TableToolbarType,
  TableType,
} from '@/utils/interfaces';

const { confirm } = Modal;

type visibleType = 'register' | 'edit' | 'delete' | null;

const List: React.FC<ListProps> = (props) => {
  const { getPage2 } = props;
  const [columns, setColumn] = useState(getColumns({ onEdit, onDelete }));
  const [visible, setVisible] = useState<visibleType>(null);
  const [currentRow, setCurrentRow] = useState<object | null>(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const selectedRows = useRef<any[]>();
  // 清空选中
  useEffect(() => {
    setSelectedRowKeys([]);
    selectedRows.current = [];
  }, [props.table]);

  // 列配置处理
  const handleSetColumn = (column: any) => {
    setColumn(column);
  };

  function onEdit(record: any) {
    setCurrentRow(record);
    setVisible('edit');
  }

  function onDelete(record: any) {
    deleteConfirm([record]);
  }

  // 删除弹框
  function deleteConfirm(list: any[]) {
    confirm({
      title: '是否要删除这些数据?',
      icon: <ExclamationCircleOutlined />,
      content: list.map((item: any) => (
        <p className="confirm-delete">{item.dictName}</p>
      )),
      onOk() {
        return new Promise((resolve, reject) => {
          remove({ ids: list.map((item: any) => item.dictCode) })
            .then((res) => {
              if (res.statusCode === 200) {
                getPage2();
                resolve(1);
                message.success(res.message);
              } else {
                reject(1);
              }
            })
            .finally(() => {
              setVisible(null);
              setCurrentRow(null);
              setSelectedRowKeys([]);
              selectedRows.current = [];
            });
        });
      },
      onCancel() {},
    });
  }

  // 列表下载
  // const downLoadFile = () => {
  //   const { conditions, orderConditions } = props.queryPager;
  //   download({ conditions, orderConditions, url: downloadURL });
  // };

  // 工具栏按钮
  const getTableBarRoleBtn = () => {
    let btnList: Array<BarBtn> = [
      {
        name: '新增',
        disabled: false,
        // role: "",
        icon: <span className="iconfont icon-daochu" />,
        handle: () => setVisible('register'),
      },
      {
        name: '删除',
        disabled: selectedRowKeys.length > 0 ? false : true,
        // role: "",
        icon: <span className="iconfont icon-daochu" />,
        handle: () => {
          if (selectedRows.current) {
            console.log(selectedRows.current);
            deleteConfirm(selectedRows?.current);
          }
        },
      },
      // {
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
    title: '数据字典列表',
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
      loading: props.table.loading,
      dataSource: props.table.dataSource,
      columns,
      scroll: {
        y: 14,
      },
      columnSorter,
      rowSelection: {
        columnWidth: 20,
        selectedRowKeys,
        onChange: (selectedRowKeys: any, selectedRow: any) => {
          selectedRows.current = selectedRow;
          setSelectedRowKeys(selectedRowKeys);
        },
      },
    },
  };

  // 注册弹框参数
  const registerProps = {
    echo: currentRow,
    modal: {
      title: visible === 'edit' ? '修改' : '新增',
      onOk: (form: any, setConfirmLoading: any) => {
        if (visible === 'edit') {
          edit(form)
            .then((res) => {
              if (res.statusCode === 200) {
                registerProps.modal.onCancel();
                getPage2();
                message.success(res.message);
              }
            })
            .finally(() => {
              setConfirmLoading(false);
            });
        } else {
          add(form)
            .then((res) => {
              if (res.statusCode === 200) {
                registerProps.modal.onCancel();
                getPage2();
                message.success(res.message);
              }
            })
            .finally(() => {
              setConfirmLoading(false);
            });
        }
      },
      onCancel: () => {
        setVisible(null);
        setCurrentRow(null);
        setSelectedRowKeys([]);
        selectedRows.current = [];
      },
    },
  };

  const visibleList: any = ['edit', 'register'];
  return (
    <>
      <TableToolbar {...tableToolbarProps}>
        <Table {...tableProps} />
      </TableToolbar>

      {/* 数字证书生成 */}
      {visibleList?.includes(visible) ? <Register {...registerProps} /> : null}
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
