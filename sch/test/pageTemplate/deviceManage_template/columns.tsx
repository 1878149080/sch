import {
  filterColumn,
  getColumnWidth,
  getUserRoleBtn,
} from '@/utils/logo/roleBtn';

export default function (props: any) {
  const {} = props;
  const columns = [
    {
      title: '车辆号',
      dataIndex: 'carNo',
      key: 'carNo',
      width: 70,
      align: 'center',
      sorter: true,
    },
    {
      title: '线 路',
      dataIndex: 'lineName',
      key: 'lineName',
      width: 70,
      align: 'center',
      sorter: true,
    },
    {
      title: '操作',
      key: 'operation',
      width: getOperationWidth(),
      sorter: false,
      render(text: any, record: any, index: any) {
        return getBtn({ record });
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

// 操作列按钮
function getBtn(props: any) {
  const { record, handleDetail } = props;
  const { dataState, isEditor } = record;
  let btnList = [
    {
      template: (
        <span
          className="iconfont icon-chakan"
          style={{ color: '#54A4FF', fontSize: '14px' }}
          onClick={() => handleDetail(record, 0)}
        >
          <a className="text">查看详情</a>
        </span>
      ),
    },
  ];

  return getUserRoleBtn(btnList);
}
