import React, { useEffect, useState } from 'react';
import TableToolbar from '@/pages/component/common/tableToolbar/tableToolbar';
import Table from '@/component/tables';
import { getRoleBarBtn } from '@/utils/logo/roleBtn';
import getColumns from './columns';
import BatchDelete from './batchDelete';
import Register from './register';
import { upDateUser, addUser } from '@/services/base/userManage';
import { message } from 'antd';
// @ts-ignore
import sha256 from 'crypto-js/sha256';


// interface
import {
  BarBtn,
  ListProps,
  OrdersType,
  TableToolbarType,
  TableType,
} from '@/utils/interfaces';

type visibleType = 'register' | 'edit' | 'delete' | null;

const List: React.FC<ListProps> = (props) => {
  const { getPage2 } = props;
  const [columns, setColumn] = useState(getColumns({ onEdit }));
  const [visible, setVisible] = useState<visibleType>(null);
  const [currentRow, setCurrentRow] = useState<{ [index: string]: any }>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

  // 清空选中
  useEffect(() => {
    setSelectedRowKeys([]);
    setCurrentRow([]);
  }, [props.table]);

  function onEdit(record: any) {
    setCurrentRow([record]);
    setVisible('edit');
  }

  // 列配置处理
  const handleSetColumn = (column: any) => {
    setColumn(column);
  };

  // 列表下载
  const downLoadFile = () => {
    const { conditions, orderConditions } = props.queryPager;
    // download({ conditions, orderConditions, url: downloadURL });

  };
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
    ];
    return getRoleBarBtn(btnList);
  };

  // 表格工具参数
  const tableToolbarProps: TableToolbarType = {
    columns: columns,
    title: '用户列表',
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
      scroll: {},
      columnSorter,
    },
    pagination: props.pagination,
  };

  // 注册编辑
  const registerProps = {
    echo: visible === 'edit' && currentRow.length > 0 ? currentRow[0] : null,
    type: visible,
    modal: {
      title: visible === 'register' ? '新增' : '编辑',
      onOk: (form: any, setConfirmLoading: any) => {


        if (visible === 'register') {
          addUser({
            ...form,
            password: sha256(form.password).toString()
          })
            .then((res) => {
              if (res.code === 200) {
                message.success(res.message);
                registerProps.modal.onCancel();
                getPage2();
              }
            })
            .finally(() => {
              setConfirmLoading(false);
            });
        } else {
          upDateUser(form)
            .then((res) => {
              if (res.code === 200) {
                message.success(res.message);
                registerProps.modal.onCancel();
                getPage2();
              }
            })
            .finally(() => {
              setConfirmLoading(false);
            });
        }
      },
      onCancel: () => {
        setVisible(null);
        setCurrentRow([]);
      },
    },
  };

  let visibleList: any = ['register', 'edit'];
  return (
    <>
      <TableToolbar {...tableToolbarProps}>
        <Table {...tableProps} />
      </TableToolbar>

      {/* 注册/编辑 */}
      {visibleList.includes(visible) ? <Register {...registerProps} /> : null}
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
    let fieldName = columnKey;
    if (columnKey === 'versionId') fieldName = 'a.versionId';
    if (columnKey === 'terminalTypeName') fieldName = 'tt.terminalTypeName';
    if (columnKey === 'versionNo') fieldName = 'a.versionNo';
    if (columnKey === 'versionFile') fieldName = 'a.versionFile';
    if (columnKey === 'isDelete') fieldName = 'a.isDelete';
    if (columnKey === 'createTime') fieldName = 'a.createTime';
    if (columnKey === 'updateTime') fieldName = 'a.updateTime';
    if (columnKey === 'versionDesc') fieldName = 'a.versionDesc';
    orders = [
      {
        fieldName: fieldName,
        isAsc: order === 'ascend',
      },
    ];
  }

  return orders;
}
