import { Tag } from 'antd';
import { filterColumn } from '../../../../utils/userRole';
import { getColumnWidth, getUserRoleBtn } from '../../../../utils/logo/roleBtn';

export function getColumns(edits, deletes) {
  const columns = [
    {
      title: '登录名称',
      dataIndex: 'name',
      key: 'name',
      width: 160,
    },
    {
      title: '真实姓名',
      dataIndex: 'realName',
      key: 'realName',
      width: 120,
    },
    {
      title: '内置',
      dataIndex: 'isSys',
      key: 'isSys',
      width: 80,
      render(text) {
        return (
          <Tag color={text ? '#f50' : '#87d068'}>{text ? '内置' : '普通'}</Tag>
        );
      },
    },
    {
      title: '角色',
      dataIndex: 'roleList',
      key: 'roleList',
      // width: 250,
      render(text) {
        return text?.map((item, index) => {
          return <Tag key={'users_tag_' + index}>{item.name}</Tag>;
        });
      },
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
      width: 120,
    },
    {
      title: '操作',
      dataIndex: 'operating',
      key: 'operating',
      width: getOperationWidth(),
      render(text, record, index) {
        return (
          <div className="operation">
            {getBtn({
              record,
              edits,
              deletes,
            })}
          </div>
        );
      },
      // width: defaultBtn.length * 46,
      // // fixed: 'right',
      // render: function (text, record) {
      //   return (
      //     <div>
      //       {!record.isSys ? (
      //         <div>
      //           {tableBtn({
      //             data: defaultBtn,
      //             edits: () => edits(record),
      //             deletes: () => deletes([record]),
      //           })}
      //         </div>
      //       ) : null}
      //     </div>
      //   );
      // },
    },
  ];
  return filterColumn(columns);
}

// 获取操作列宽度
function getOperationWidth() {
  const widths = [
    { role: 'sys_user_edit', width: 40 },
    { role: 'sys_user_del', width: 40 },
  ];
  return getColumnWidth(widths);
}

// 操作列按钮
function getBtn(props) {
  const { record, edits, deletes } = props;
  let btnList = [];
  // 查看参数
  if (!record.isSys) {
    btnList.push({
      role: 'sys_user_edit',
      template: (
        <span
          className={'iconfont icon-zongjie '}
          // style={{
          //   color: record.updateState ? '#54A4FF' : '#ccc',
          //   fontSize: '12px',
          // }}
          onClick={() => edits(record)}
        >
          修改
        </span>
      ),
    });

    // 撤销
    btnList.push({
      role: 'sys_user_del',
      template: (
        <span
          className={'iconfont icon-shanchu '}
          // style={{
          //   color: record.updateState ? '#54A4FF' : '#ccc',
          //   fontSize: '12px',
          // }}
          onClick={() => deletes([record])}
        >
          删除
        </span>
      ),
    });
  }

  return getUserRoleBtn(btnList);
}
