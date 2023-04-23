import dayjs from 'dayjs';
import regions from '../../../../utils/region';
import { filterColumn } from '../../../../utils/userRole';
import { getColumnWidth, getUserRoleBtn } from '../../../../utils/logo/roleBtn';

export function getColumns(edits, add, deletes) {
  // 获取区域
  const regionMap = new Map();
  regions.forEach((item) => {
    regionMap.set(Number(item.id), item);
  });

  const columns = [
    {
      title: '组织名称',
      dataIndex: 'orgNameCn',
      key: 'orgNameCn',
    },
    {
      title: '系统内置',
      dataIndex: 'isSys',
      key: 'isSys',
      render(text, record) {
        return text ? '内置' : '-';
      },
    },
    {
      title: '地区',
      dataIndex: 'districtId',
      key: 'districtId',
      render(text) {
        const getRegion = regionMap.get(Number(text));
        return getRegion.cname || '-';
      },
    },
    {
      title: '创建日期',
      dataIndex: 'createTime',
      key: 'createTime',
      render: function (text) {
        return !text ? '-' : dayjs(text).format('YYYY-MM-DD');
      },
    },
    {
      title: '备注',
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
              add,
              deletes,
            })}
          </div>
        );
      },
      // width: (defaultBtn.length + defaultBtn1.length) * 46,
      // render: function (text, record) {
      //   const htmls = tableBtn({
      //     data: defaultBtn,
      //     edits: () => edits(record),
      //     deletes: () => deletes([record]),
      //   });
      //
      //   return (
      //     // <div>
      //     //   <a onClick={() => add(record)}>添加</a>
      //     //   <span>
      //     //     {defaultBtn1.length > 0 && htmls.length > 0 ? (
      //     //       <Divider type="vertical" />
      //     //     ) : null}
      //     //     {record.orgId !== 1 ? htmls : null}
      //     //   </span>
      //     // </div>
      //
      //     <div>
      //       {defaultBtn1.length > 0 ? (
      //         <a onClick={() => add(record)}>添加</a>
      //       ) : null}
      //       {record.orgId !== 1 ? (
      //         <span>
      //             {defaultBtn1.length > 0 && htmls.length > 0 ? (
      //               <Divider type="vertical" />
      //             ) : null}
      //           {record.orgId !== 1 ? htmls : null}
      //           </span>
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
    { role: 'sys_org_add', width: 40 },
    { role: 'sys_org_edit', width: 40 },
    { role: 'sys_org_del', width: 40 },
  ];
  return getColumnWidth(widths);
}

// 操作列按钮
function getBtn(props) {
  const { record, edits, add, deletes } = props;
  let btnList = [];
  // 查看参数
  btnList.push({
    role: 'sys_org_add',
    template: (
      <span className="iconfont icon-chakan" onClick={() => add(record)}>
        添加
      </span>
    ),
  });
  if (record.orgId !== 1) {
    btnList.push({
      role: 'sys_org_edit',
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
      role: 'sys_org_del',
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
