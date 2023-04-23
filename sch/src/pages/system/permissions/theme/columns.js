import { Tag } from "antd";
import { AppstoreOutlined } from "@ant-design/icons";
import { filterColumn } from "../../../../utils/userRole";
import { getColumnWidth, getUserRoleBtn } from "../../../../utils/logo/roleBtn";

/**
 * @method getColumns 获取配置后的表头
 * @param {object} edits 编辑事件
 * @param {object} add 添加子菜单
 * @param {object} deletes 删除事件
 * @return {object} columns 返回表格的表头
 */
export function getColumns(edits, add, deletes) {
  const columns = [
    {
      title: '菜单名称',
      dataIndex: 'menuName',
      key: 'menuName',
    },
    {
      title: '图标',
      dataIndex: 'icon',
      key: 'icon',
      width: 50,
      render(text) {
        // return <Icon type={text ? text : "appstore"} />;
        return <AppstoreOutlined />;
      },
    },
    {
      title: '序号',
      dataIndex: 'menuIndex',
      key: 'menuIndex',
      width: 50,
    },
    {
      title: '类型',
      dataIndex: 'perssionType',
      key: 'perssionType',
      width: 60,
      render: function (text) {
        // 菜单类型 （0菜单 1按钮 2api 3目录）
        const { color, name } = {
          color:
            text === 0
              ? '#2db7f5'
              : text === 1
              ? '#87d068'
              : text === 2
              ? '#108ee9'
              : 'purple',
          name:
            text === 0
              ? '菜单'
              : text === 1
              ? '按钮'
              : text === 2
              ? 'API'
              : '目录',
        };
        return <Tag color={color}>{name}</Tag>;
      },
    },
    {
      title: '权限标识',
      dataIndex: 'permissionCode',
      key: 'permissionCode',
      width: 160,
    },
    {
      title: '状态',
      dataIndex: 'isInvalid',
      key: 'isInvalid',
      sorter: true,
      width: 70,
      render: function (text) {
        return (
          <Tag
            color={!text ? '#135200' : '#f50'}
            style={{ borderRadius: '50%' }}
          >
            {!text ? '显示' : '隐藏'}
          </Tag>
        );
      },
    },
    {
      title: '备注',
      dataIndex: 'menuRemark',
      key: 'menuRemark',
      width: 170,
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
      //     <div>
      //       {defaultBtn1.length > 0 ? (
      //         <a onClick={() => add(record)}>添加</a>
      //       ) : null}
      //       {record.orgId !== 1 ? (
      //         <span>
      //           {defaultBtn1.length > 0 && htmls.length > 0 ? (
      //             <Divider type="vertical" />
      //           ) : null}
      //           {record.orgId !== 1 ? htmls : null}
      //         </span>
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
    { role: 'sys_menu_add', width: 40 },
    { role: 'sys_menu_edit', width: 40 },
    { role: 'sys_menu_del', width: 40 },
  ];
  return getColumnWidth(widths);
}

// 操作列按钮
function getBtn(props) {
  const { record, edits, add, deletes } = props;
  let btnList = [];
  // 查看参数
  btnList.push({
    role: 'sys_menu_add',
    template: (
      <span className="iconfont icon-chakan" onClick={() => add(record)}>
        添加
      </span>
    ),
  });
  if (record.orgId !== 1) {
    btnList.push({
      role: 'sys_menu_edit',
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
      role: 'sys_menu_del',
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
