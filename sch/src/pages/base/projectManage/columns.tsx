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
      title: '编码',
      dataIndex: 'projectId',
      key: 'projectId',
      // width: "6%",
      width: '35px',

      align: 'left',
      sorter: true,
    },
    {
      title: '项目名称',
      dataIndex: 'projectName',
      key: 'projectName',
      width: 70,
      align: 'left',
      sorter: true,
      render: renderTip,
    },
    {
      title: '项目经理',
      dataIndex: 'projectManager',
      key: 'projectManager',
      width: 70,
      align: 'left',
      sorter: true,
    },
    {
      title: '城市',
      dataIndex: 'cityName',
      key: 'cityName',
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
      sorter: true,
      render: renderDate,
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      width: 70,
      align: 'left',
      sorter: true,
      render: renderDate,
    },
    {
      title: '描述',
      dataIndex: 'projectDesc',
      key: 'projectDesc',
      width: 120,
      align: 'left',
      sorter: true,
      render: renderTip,
    },
    {
      title: '操作',
      key: 'operation',
      width: getOperationWidth(),
      sorter: false,
      render(text: any, record: any, index: any) {
        return getBtn({ record, onEdit, onDelete });
      },
    },
  ];
  return filterColumn(columns);
}

function getOperationWidth() {
  const widths = [
    { width: 40 },
    // { role: 'string_line_op_edit', width: 40 },
    // { role: 'string_line_op_revoke', width: 40 },
  ];
  return getColumnWidth(widths);
}

function renderDate(text: string) {
  return dayjs(text).format('YYYY-MM-DD');
}

function render(text: any) {
  return text || text === 0 ? text : '--';
}

function renderTip(text: any) {
  return text ? (
    <Tooltip destroyTooltipOnHide={{ keepParent: false }} title={text}>
      <span className="text-tip">{text}</span>
    </Tooltip>
  ) : (
    '--'
  );
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
          style={{ color: '#54A4FF', fontSize: '14px' }}
          onClick={() => onEdit(record, 0)}
        >
          <a className="text">编辑</a>
        </span>
      ),
    },
    {
      template: (
        <span
          className="iconfont icon-chakan"
          style={{ color: '#54A4FF', fontSize: '14px' }}
          onClick={() => onDelete(record, 0)}
        >
          <a className="text">删除</a>
        </span>
      ),
    },
  ];

  return getUserRoleBtn(btnList);
}
