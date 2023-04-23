import { filterColumn } from '@/utils/logo/roleBtn';
import dayjs from 'dayjs';

export default function (props: any) {
  const { onDetail, onLoad, certRegister, keyLoad } = props;
  const columns = [
    {
      title: '编号',
      dataIndex: 'operId',
      key: 'operId',
      width: 70,
      align: 'left',
      sorter: true,
      render: render,
    },
    {
      title: '操作模块',
      dataIndex: 'title',
      key: 'title',
      width: 70,
      align: 'left',
      sorter: true,
      render: render,
    },
    {
      title: '操作类型',
      dataIndex: 'businessType',
      key: 'businessType',
      width: 70,
      align: 'left',
      sorter: true,
      render: (text: any) => {
        let mode: any = {
          0: '访问',
          1: '编辑',
          2: '导出',
        };
        return mode[text];
      },
    },
    {
      title: '请求方式',
      dataIndex: 'requestMethod',
      key: 'requestMethod',
      width: 70,
      align: 'left',
      sorter: true,
      render: render,
    },
    {
      title: '操作人员',
      dataIndex: 'operName',
      key: 'operName',
      width: 70,
      align: 'left',
      sorter: true,
      render: render,
    },
    {
      title: '地址',
      dataIndex: 'operIp',
      key: 'operIp',
      width: 70,
      align: 'left',
      sorter: true,
      render: render,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 70,
      align: 'left',
      sorter: true,
      render: (text: any) => {
        return text === 0 ? '成功' : '异常';
      },
    },
    {
      title: '操作日期',
      dataIndex: 'operTime',
      key: 'operTime',
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

export function render(text: any) {
  return text || text === 0 ? text : '--';
}
