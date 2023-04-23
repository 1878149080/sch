// import { filterColumn, getColumnWidth, getUserRoleBtn } from '@/utils/logo/roleBtn';
import dayjs from 'dayjs';

export default function (props: any) {
  // const { onDetail, onLoad, certRegister } = props;
  const columns = [
    {
      title: '服务名',
      dataIndex: 'certId',
      key: 'certId',
      width: 50,
      align: 'left',
    },
    {
      title: '状态',
      dataIndex: 'certTypeChinese',
      key: 'certTypeChinese',
      width: 70,
      align: 'left',
    },
    {
      title: '绑定时间',
      dataIndex: 'certName',
      key: 'certName',
      width: 110,
      align: 'left',
      render: renderDate,
    },
    {
      title: '解绑时间',
      dataIndex: 'svcChineseName',
      key: 'svcChineseName',
      width: 110,
      align: 'left',
      render: renderDate,
    },
  ];
  return columns;
}

function renderDate(text: string) {
  return dayjs(text).format('YYYY-MM-DD HH:mm:ss');
}
