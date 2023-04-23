import React, { useEffect, useState } from 'react';
import TableToolbar from '@/pages/component/common/tableToolbar/tableToolbar';
import Table from '@/component/tables';
import { getRoleBarBtn } from '@/utils/logo/roleBtn';
import getColumns from './columns';
import BatchDelete from './batchDelete';
import Register from './register';
import { downExcel, edit, register, remove } from '@/services/OTA/softVersion';
import { message } from 'antd';

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
    downExcel({
      param: encodeURIComponent(
        JSON.stringify({
          queryPager: props.queryPager,
        }),
      ),
      fileName: '1111',
    });
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
      {
        name: '作废',
        disabled: selectedRowKeys.length > 0 ? false : true,
        // role: "",
        icon: <span className="iconfont icon-daochu" />,
        handle: () => setVisible('delete'),
      },
      {
        name: '导出',
        disabled: props.table.dataSource.length > 0 ? false : true,
        // role: "",
        icon: <span className="iconfont icon-daochu" />,
        handle: downLoadFile,
      },
    ];
    return getRoleBarBtn(btnList);
  };

  // 表格工具参数
  const tableToolbarProps: TableToolbarType = {
    columns: columns,
    title: '软件版本列表',
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
      rowSelection: {
        columnWidth: 18,
        selectedRowKeys,
        onChange: (selectedRowKeys: any, selectedRow: any) => {
          setCurrentRow(selectedRow);
          setSelectedRowKeys(selectedRowKeys);
        },
        getCheckboxProps: (record: any) => {
          // console.log(!!record.isSys);
          return {
            disabled: !record.isDelete,
            // disabled: false
          };
        },
      },
    },
    pagination: props.pagination,
  };
  // 作废
  const deleteProps = {
    modal: {
      title: '确认作废',
      currentRow,
      onOk: (form: any, setConfirmLoading: any) => {
        let ids = currentRow.map((item: any) => item.versionId);
        remove({
          ids: ids,
          remark: form.remark,
        })
          .then((res) => {
            if (res.statusCode === 200) {
              deleteProps.modal.onCancel();
              message.success(res.message);
              getPage2();
            }
          })
          .finally(() => {
            setConfirmLoading(false);
          });
      },
      onCancel: () => {
        setVisible(null);
        setSelectedRowKeys([]);
      },
    },
  };
  // 注册编辑
  const registerProps = {
    echo: visible === 'edit' && currentRow.length > 0 ? currentRow[0] : null,
    modal: {
      title: visible === 'register' ? '新增' : '编辑',
      onOk: (form: any, setConfirmLoading: any) => {
        const { file } = form;
        const uploadFile = new FormData();
        const origin = file?.fileList[0]?.originFileObj || null;
        uploadFile.append(
          'uploadFile',
          origin
            ? origin
            : new File([], 'null.bin', { type: 'application/octet-stream' }),
        );
        uploadFile.append(
          'softVersionDo',
          new Blob(
            [
              JSON.stringify({
                terminalType: form.terminalType,
                versionNo: form.versionNo,
                versionDesc: form.versionDesc,
                versionFile: origin ? origin.name : 'null.bin',
                versionId:
                  currentRow.length > 0 ? currentRow[0].versionId : undefined,
              }),
            ],
            { type: 'application/json' },
          ),
        );

        if (visible === 'register') {
          register(uploadFile)
            .then((res) => {
              if (res.statusCode === 200) {
                message.success(res.message);
                registerProps.modal.onCancel();
                getPage2();
              }
            })
            .finally(() => {
              setConfirmLoading(false);
            });
        } else {
          edit(uploadFile)
            .then((res) => {
              if (res.statusCode === 200) {
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

      {/* 作废 */}
      {visible === 'delete' ? <BatchDelete {...deleteProps} /> : null}
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
