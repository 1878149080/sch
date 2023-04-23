import {
  filterColumn,
  getColumnWidth,
  getUserRoleBtn,
} from '@/utils/logo/roleBtn';
import dayjs from 'dayjs';
import { Tooltip } from 'antd';
import { exportFile } from '@/utils/down';
import Config from '@/utils/config';

export default function (props: any) {
  const { onEdit } = props;
  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      width: 190,
      align: 'left',
      sorter: false,
      render: renderTip,
    },
    {
      title: '类型',
      dataIndex: 'format',
      key: 'format',
      width: 100,
      align: 'left',
      sorter: false,
      render: renderTip,
    },
    {
      title: '热度',
      dataIndex: 'popularity',
      key: 'popularity',
      width: 120,
      align: 'left',
      sorter: false,
      render: renderTip,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 160,
      align: 'left',
      sorter: false,
      render: renderDate
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      // width: 90,
      align: 'left',
      sorter: false,
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
    { width: 40 },
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
    },
  ];

  return getUserRoleBtn(btnList);
}

// 文件下载
function downloadFile(record: any) {
  exportFile({
    url:
      Config.tomcatUrl +
      '/tsvcloud/api/softVersion/download?versionId=' +
      record.versionId,
    fileName: '文件',
  });
}
