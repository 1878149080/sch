import { filterColumn, getColumnWidth, getUserRoleBtn } from '@/utils/logo/roleBtn';
import dayjs from 'dayjs';
import { Tooltip } from 'antd';


export default function (props: any) {
  const { onEdit } = props;
  const columns = [
    {
      title: '编码',
      dataIndex: 'versionId',
      key: 'versionId',
      width: 50,
      align: 'left',
      sorter: true,
      render,
    },
    {
      title: '设备类型',
      dataIndex: 'terminalTypeName',
      key: 'terminalTypeName',
      width: 90,
      align: 'left',
      sorter: true,
      render,
    },
    {
      title: '版本号',
      dataIndex: 'versionNo',
      key: 'versionNo',
      width: 100,
      align: 'left',
      sorter: true,
      render: renderTip,
    },
    {
      title: '文件名',
      dataIndex: 'versionFile',
      key: 'versionFile',
      width: 120,
      align: 'left',
      sorter: true,
      render: renderTip,
    },
    {
      title: '状态',
      dataIndex: 'isDelete',
      key: 'isDelete',
      width: 60,
      align: 'left',
      sorter: true,
      render: (text: any) => {
        return text ? "有效" : "无效"
      }
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 90,
      align: 'left',
      sorter: true,
      render: renderDate,
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      width: 90,
      align: 'left',
      sorter: true,
      render: renderDate,
      defaultSortOrder: "descend"
    },
    {
      title: '版本描述',
      dataIndex: 'versionDesc',
      key: 'versionDesc',
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
      render(text: any, record: any, index: number) {
        return getBtn({ record, onEdit });
      },
    },
  ];
  return filterColumn(columns);
}

function renderDate(text: string) {
  return dayjs(text).format("YYYY-MM-DD HH:mm:ss")
}
function render(text: any) {
  return text || text === 0 ? text : "--"
}
function renderTip(text: any) {
  return text ? (<Tooltip title={text}><span className="text-tip">{text}</span></Tooltip>) : "--"
}

function getOperationWidth() {
  const widths = [
    { width: 40 },
    // { width: 40 },
    // { width: 60 },
    // { role: 'string_line_op_edit', width: 40 },
    // { role: 'string_line_op_revoke', width: 40 },
  ];
  return getColumnWidth(widths);
}

// 操作列按钮
function getBtn(props: any) {
  const { record, onEdit } = props;
  const { dataState, isEditor } = record;
  let btnList = [
    {
      template: (
        <span
          className="iconfont icon-chakan"
          style={{ color: '#54A4FF', fontSize: '12px' }}
          onClick={() => onEdit(record)}
        >
          <a className="text">编辑</a>
        </span>
      ),
    }
  ];

  return getUserRoleBtn(btnList);
}
