import {
  filterColumn,
  getColumnWidth,
  getUserRoleBtn,
} from '@/utils/logo/roleBtn';
import dayjs from 'dayjs';
import { Tooltip } from 'antd';

export default function (props: any) {
  const {} = props;
  const columns = [
    {
      title: '编号',
      dataIndex: 'infoId',
      key: 'infoId',
      width: 70,
      align: 'left',
      sorter: true,
    },
    {
      title: '登录名称',
      dataIndex: 'userName',
      key: 'userName',
      width: 70,
      align: 'left',
      sorter: true,
    },
    {
      title: '地址',
      dataIndex: 'ipaddr',
      key: 'ipaddr',
      width: 70,
      align: 'left',
      sorter: true,
    },
    {
      title: '登录状态',
      dataIndex: 'status',
      key: 'status',
      width: 70,
      align: 'left',
      sorter: true,
      render: (text: any) => {
        return text === '0' ? '成功' : '异常';
      },
    },
    {
      title: '描述',
      dataIndex: 'msg',
      key: 'msg',
      width: 70,
      align: 'left',
      sorter: true,
      render: renderTip,
    },
    {
      title: '访问时间',
      dataIndex: 'accessTime',
      key: 'accessTime',
      width: 70,
      align: 'left',
      sorter: true,
      defaultSortOrder: 'descend',
      render: renderDate,
    },
    // {
    //   title: '操作',
    //   key: 'operation',
    //   width: getOperationWidth(),
    //   sorter: false,
    //   render(text: any, record: any, index: number) {
    //     return getBtn({ record, onDetail, onLoad, certRegister, keyLoad });
    //   },
    // },
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
    { width: 60 },
    // { role: 'string_line_op_edit', width: 40 },
    // { role: 'string_line_op_revoke', width: 40 },
  ];
  return getColumnWidth(widths);
}

// 操作列按钮
function getBtn(props: any) {
  const { record, onDetail, onLoad, certRegister, keyLoad } = props;
  const { dataState, isEditor } = record;
  let btnList = [
    {
      template: (
        <span
          className="iconfont icon-chakan"
          style={{ color: '#54A4FF', fontSize: '12px' }}
          onClick={() => onDetail(record)}
        >
          <a className="text">查看</a>
        </span>
      ),
    },
    {
      template: (
        <span
          className="iconfont icon-chakan"
          style={{ color: '#54A4FF', fontSize: '12px' }}
          onClick={() => keyLoad(record)}
        >
          <a className="text">密钥下载</a>
        </span>
      ),
    },
    {
      template: (
        <span
          className="iconfont icon-chakan"
          style={{ color: '#54A4FF', fontSize: '12px' }}
          onClick={() => onLoad(record)}
        >
          <a className="text">证书下载</a>
        </span>
      ),
    },
    {
      template: (
        <span
          className="iconfont icon-chakan"
          style={{ color: '#54A4FF', fontSize: '12px' }}
          onClick={() => certRegister(record)}
        >
          <a className="text">自签名证书生成</a>
        </span>
      ),
    },
  ];

  return getUserRoleBtn(btnList);
}
