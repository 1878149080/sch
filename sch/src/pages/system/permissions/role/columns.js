import dayjs from 'dayjs';
import { filterColumn } from '../../../../utils/userRole';
import { getColumnWidth, getUserRoleBtn } from '../../../../utils/logo/roleBtn';

export function getColumns(edits, deletes, handleDataRole) {
  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '系统内置',
      dataIndex: 'isSys',
      key: 'isSys',
      render(text, render) {
        return text ? '内置' : '-';
      },
    },
    // {
    //   title: '数据权限',
    //   dataIndex: 'dataRole',
    //   key: 'dataRole',
    // },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: function (text) {
        return !text ? '-' : dayjs(text).format('YYYY-MM-DD');
      },
    },
    {
      title: '描述',
      dataIndex: 'remark',
      key: 'remark',
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
              handleDataRole
            })}
          </div>
        );
      },
      // width: defaultBtn.length * 46,
      // render: function (text, record) {
      //   const isSys = record.isSys;
      //   return (
      //     <div>
      //       {!isSys ? (
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
  // const widths = [
  //   { role: 'sys_role_edit', width: 40 + 80},
  //   { role: 'sys_role_del', width: 40 },
  // ];
  const widths = [
    {  width: 40 + 80},
    {  width: 40 },
  ];
  return getColumnWidth(widths);
}

// 操作列按钮
function getBtn(props) {
  const { record, edits, deletes, handleDataRole } = props;
  let btnList = [];
  // 查看参数
  if (!record.isSys) {
    btnList.push({
      // role: 'sys_role_edit',
      template: (
        <span
          className={'iconfont icon-zongjie '}
          onClick={() => edits(record)}
        >
          修改
        </span>
      ),
    },{
      // role: 'sys_role_edit',
      template: (
        <span
          className={'iconfont icon-zongjie '}
          onClick={() => handleDataRole(record)}
        >
          数据权限
        </span>
      ),
    });

    // 撤销
    btnList.push({
      // role: 'sys_role_del',
      template: (
        <span
          className={'iconfont icon-shanchu '}
          onClick={() => deletes([record])}
        >
          删除
        </span>
      ),
    });
  }

  return getUserRoleBtn(btnList);
}
