import {
  filterColumn,
  getColumnWidth,
  getUserRoleBtn,
} from '@/utils/logo/roleBtn';
import dayjs from 'dayjs';
import { Tooltip } from 'antd';

export default function (props: any) {
  const { onEdit, onDelete } = props;
  const columns = [
    {
      title: '字典编号',
      dataIndex: 'dictCode',
      key: 'dictCode',
      width: 50,
      align: 'left',
      sorter: true,
      render,
    },
    {
      title: '字典名称',
      dataIndex: 'dictName',
      key: 'dictName',
      width: 70,
      align: 'left',
      sorter: true,
      render,
    },
    {
      title: '字典标签',
      dataIndex: 'dictLabel',
      key: 'dictLabel',
      width: 70,
      align: 'left',
      sorter: true,
      render,
    },
    {
      title: '字典类型',
      dataIndex: 'dictType',
      key: 'dictType',
      width: 70,
      align: 'left',
      sorter: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 70,
      align: 'left',
      sorter: true,
      render: (text: any) => {
        return text === '0' ? '正常' : '停用';
      },
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
      width: 70,
      align: 'left',
      sorter: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 70,
      align: 'left',
      defaultSortOrder: 'descend',
      sorter: true,
    },
    {
      title: '操作',
      key: 'operation',
      width: getOperationWidth(),
      sorter: false,
      render(text: any, record: any, index: number) {
        return getBtn({ record, onEdit, onDelete });
      },
    },
  ];
  return filterColumn(columns);
}

function renderDate(text: string) {
  return dayjs(text).format('YYYY-MM-DD HH:mm:ss');
}

function render(text: any) {
  return text || text === 0 ? text : '--';
}

function renderTip(text: any) {
  return text ? (
    <Tooltip title={text}>
      <span className="text-tip">{text}</span>
    </Tooltip>
  ) : (
    '--'
  );
}

function getOperationWidth() {
  const widths = [
    { width: 40 },
    { width: 10 },
    // { width: 60 },
    // { role: 'string_line_op_edit', width: 40 },
    // { role: 'string_line_op_revoke', width: 40 },
  ];
  return getColumnWidth(widths);
}

// 操作列按钮
function getBtn(props: any) {
  const { record, onEdit, onDelete } = props;
  const { dataState, isEditor } = record;
  let btnList = [
    {
      template: (
        <span
          className="iconfont icon-chakan"
          style={{ color: '#54A4FF', fontSize: '12px' }}
          onClick={() => onEdit(record)}
        >
          <a className="text">修改</a>
        </span>
      ),
    },
    {
      template: (
        <span
          className="iconfont icon-chakan"
          style={{ color: '#54A4FF', fontSize: '12px' }}
          onClick={() => onDelete(record)}
        >
          <a className="text">删除</a>
        </span>
      ),
    },
  ];

  return getUserRoleBtn(btnList);
}
