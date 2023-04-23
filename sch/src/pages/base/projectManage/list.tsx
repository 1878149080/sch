import React, { useEffect, useRef, useState } from 'react';
import TableToolbar from '../../component/common/tableToolbar/tableToolbar';
import Table from '@/component/tables/index';
import { getRoleBarBtn } from '@/utils/logo/roleBtn';
import getColumns from './columns';
import Register from './register';
import Invalid from './invalid';
import {
  deleteProject,
  downloadURL,
  register,
} from '@/services/device/projectManage';
import { download } from '@/utils/downloadFile'; // todo 下载的方法需要更换为带token
import { message } from 'antd';

// interface
import {
  BarBtn,
  ListProps,
  OrdersType,
  TableToolbarType,
  TableType,
} from '@/utils/interfaces';

type visibleType = 'register' | 'edit' | 'invalid' | null;

const List: React.FC<ListProps> = (props) => {
  const { getPage2 } = props;
  const [columns, setColumn] = useState(getColumns({ onEdit, onDelete }));
  const [visible, setVisible] = useState<visibleType>(null);
  const [currentRow, setCurrentRow] = useState<{ [index: string]: any }>({});
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const selectedRows = useRef<any[]>([]);

  // 清空选中
  useEffect(() => {
    setSelectedRowKeys([]);
    selectedRows.current = [];
  }, [props.table]);

  console.log('selectedRowKeys', selectedRowKeys);

  function onDelete(record: any) {
    setCurrentRow(record);
    selectedRows.current = [record];
    setVisible('invalid');
  }

  function onEdit(record: any) {
    setCurrentRow(record);
    selectedRows.current = [record];
    setVisible('edit');
  }

  const handleSetColumn = (column: any) => {
    setColumn(column);
  };
  const downLoadFile = () => {
    const { conditions, orderConditions } = props.queryPager;
    download({ conditions, orderConditions, url: downloadURL });
  };
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
        name: '失效',
        disabled: selectedRowKeys.length > 0 ? false : true,
        role: '',
        icon: <span className="iconfont icon-daochu" />,
        handle: () => setVisible('invalid'),
      },
      {
        name: '导出',
        disabled: props.table.dataSource.length > 0 ? false : true,
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
    title: '项目管理',
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
        columnWidth: 20,
        selectedRowKeys,
        onChange: (selectedRowKeys: any, selectedRow: any) => {
          selectedRows.current = selectedRow;
          setSelectedRowKeys(selectedRowKeys);
        },
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
  };
  const registerProps = {
    echo: currentRow,
    modal: {
      title: mode[visible + ''],
      onOk: (form: any, setConfirmLoading: any) => {
        register(form)
          .then((res) => {
            setConfirmLoading(false);
            if (res.statusCode === 200) {
              registerProps.modal.onCancel();
              message.success('作废成功');
              getPage2();
            }
          })
          .catch((error) => {
            setConfirmLoading(false);
          });
      },
      onCancel: () => {
        setVisible(null);
      },
    },
  };
  const invalidProps = {
    modal: {
      title: '确认提示',
      onOk: (form: any, setConfirmLoading: any) => {
        deleteProject({
          ...form,
          ids: selectedRows.current?.map((item) => item.projectId),
        })
          .then((res) => {
            setConfirmLoading(false);
            if (res.statusCode === 200) {
              invalidProps.modal.onCancel();
              message.success('删除成功');
              getPage2();
            }
          })
          .catch((error) => {
            setConfirmLoading(false);
          });
      },
      onCancel: () => {
        setSelectedRowKeys([]);
        setCurrentRow({});
        selectedRows.current = [];
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

      {/* 失效 */}
      {visible === 'invalid' ? <Invalid {...invalidProps} /> : null}
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
    // if (columnKey === 'carNo') fieldName = 'car_no';

    orders = [
      {
        fieldName: fieldName,
        isAsc: order === 'ascend',
      },
    ];
  }

  return orders;
}
