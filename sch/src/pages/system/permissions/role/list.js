import React from 'react';
import { Modal } from 'antd';
import { PlusSquareOutlined } from '@ant-design/icons';
import TableToolbar from '../../../component/common/tableToolbar/tableToolbar';
import Tables from '../../../../component/tables';
import { getColumns } from './columns';
import Modals from './modal';
import DataRole from './modals/dataRole';
import { getRoleBarBtn } from '../../../../utils/logo/roleBtn';

const confirm = Modal.confirm;

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: getColumns(
        this.handlerEdit.bind(this),
        this.deleteDetails.bind(this),
        this.handleDataRole.bind(this),
      ),
      visible: false,
      modalsList: null,
      visibleData: false,
    };
  }

  // 显示模态框新建用户组
  showModal = () => {
    this.setState({
      visible: true,
      modalsList: null,
    });
  };

  // 关闭模态框
  handleCancel = () => {
    this.setState({
      visible: false,
      modalsList: null,
    });
  };

  // 点击确认获取信息关闭模态框
  handleOk = (
    value,
    halfCheckedKeys,
    resetFields,
    checked,
    setConfirmLoading,
  ) => {
    const self = this;
    const { modalsList } = this.state;
    const {
      dispatch,
      rootMap,
      getPage,
      clearTableSelect,
      queryPager: queryPagers,
    } = this.props;
    let role = {};
    // 角色名称
    if (value['name']) {
      role.name = value['name'];
    }
    // 角色信息
    if (value['remark']) {
      role.remark = value['remark'];
    }
    // 获取权限信息
    let roots = [];
    let deleIds = [];
    const permissionIds = value['permissionIds'];
    for (let i = 0; i < permissionIds.length; i++) {
      if (permissionIds[i] <= 1000) {
        deleIds.push(permissionIds[i]);
      }
    }
    role.menuIds = deleIds.map((item) => {
      let ids = Number(item);
      if (checked) {
        for (const key in rootMap) {
          const value = rootMap[key] ?? "";
          if (value.indexOf(ids) > -1) {
            if (key < 1000) {
              roots.push(key);
            }
          }
        }
      } else {
        for (let i = 0; i < modalsList.menuIds.length; i++) {
          if (modalsList.menuIds[i] < 1000) {
            roots.push(modalsList.menuIds[i]);
          }
        }
      }
      return ids;
    });
    if (!checked) {
      for (let i = 0; i < modalsList.menuIds.length; i++) {
        if (modalsList.menuIds[i] < 1000) {
          roots.push(modalsList.menuIds[i]);
        }
      }
    }
    let halfCheckedArr = halfCheckedKeys.map((item) => {
      return Number(item);
    });
    role.menuIds = [...new Set([...halfCheckedArr, ...role.menuIds, ...roots].map(item => Number(item)))];

    if (modalsList !== null) {
      role.roleId = modalsList.roleId;
    }

    setConfirmLoading(true);
    dispatch({
      type: 'roleUser/add',
      payload: {
        role,
      },
      callback: function (state = false) {
        setConfirmLoading(false);
        if (state) {
          resetFields();
          self.setState({
            modalsList: null,
            visible: false,
          });
          let queryPager = Object.assign({}, queryPagers);
          queryPager.pageIndex = 1;
          getPage(queryPager);
          clearTableSelect();
        }
      },
    });
  };

  handleDataRole = (record) => {
    this.setState({
      visibleData: true,
      modalsList: record,
    });
  }

  // 关闭数据权限模态框
  handleCancelDataRole = () => {
    this.setState({
      visibleData: false,
      modalsList: null,
    });
  };

  // 单条编辑
  handlerEdit = (record) => {
    let item = { ...record };
    const {
      modalParam: { permission },
    } = this.props;
    const menuList = item.menuList;
    let data = [];
    const list = (children) => {
      children.map((item) => {
        if (item.children) {
          data.push(item.key);
          list(item.children);
        } else {
          for (let i = 0; i < menuList.length; i++) {
            if (item.menuParId === menuList[i].menuId) {
              data.push(item.key);
            }
          }
        }
        return item;
      });
    };
    permission.map((item) => {
      if (item.children) {
        data.push(item.key);
        list(item.children);
      } else {
        data.push(item.key);
      }
      return item;
    });
    let menuIds = [].concat(item.menuIds);
    for (let i = 0; i < data.length; i++) {
      if (data[i] >= 1000) {
        menuIds.push(data[i]);
      }
    }
    item.menuIds = menuIds;
    this.setState({
      visible: true,
      modalsList: item,
    });
  };

  // 删除
  deleteDetails = (selectArr) => {
    if (selectArr.length === 0) {
      return false;
    }
    const self = this;
    let list = [];
    let items = [];
    let result = [];
    let obj = {};
    let selectData = [].concat(...selectArr);
    for (let i = 0; i < selectData.length; i++) {
      if (!obj[selectData[i].key]) {
        result.push(selectData[i]);
        obj[selectData[i].key] = true;
      }
    }
    result.map((item, index) => {
      list.push(<li key={index}>角色名称：{item.name}</li>);
      items.push(item.roleId);
      return false;
    });
    confirm({
      title: '您是否要删除以下信息?',
      content: <ol>{list}</ol>,
      width: 460,
      onOk() {
        self.deleteItems(items);
      },
    });
  };

  // 删除请求
  deleteItems = (ids) => {
    const self = this;
    const { dispatch, queryPager: queryPagers } = this.props;
    let queryPager = Object.assign({}, queryPagers);
    queryPager.pageIndex = 1;
    dispatch({
      type: 'roleUser/deletes',
      payload: {
        ids,
      },
      callback: function () {
        // 刷新页面
        self.props.clearTableSelect();
        self.props.getPage(queryPager);
      },
    });
  };
  handleSetColumn = (columns) => {
    this.setState({
      columns,
    });
  };
  // 获取表格工具栏操作按钮
  getTableBarRoleBtn = () => {
    let btnList = [
      {
        name: '新增',
        role: 'sys_role_add',
        icon: <PlusSquareOutlined />,
        handle: () => {
          this.setState({
            visible: true,
          });
        },
      },
      {
        name: '批量删除',
        icon: (
          <span
            className={'iconfont icon-shanchu '}
            style={{ fontSize: '12px' }}
          />
        ),
        role: 'sys_role_batchDelete',
        disabled: this.props.select.length === 0,
        handle: () => {
          this.deleteDetails(this.props.selectedRows);
        },
      },
    ];
    return getRoleBarBtn(btnList);
  };

  render() {
    const { getPage } = this.props;

    // 表格工具栏的props
    const toolbarProps = {
      // className: '',
      tableBtnRefs: this.props.tableBtnRefs,
      title: '角色列表',
      columns: this.state.columns,
      setColumn: this.handleSetColumn,
      columnFilterEnable: true,
      canExpand: true,
      // onExport: this.downLoadFile,
      pageThis: this.props.getPageThis(),
      btnList: this.getTableBarRoleBtn(),
      // btnList: [
      //   {
      //     name: '新增',
      //     icon: <PlusSquareOutlined />,
      //     condition: 'sys_user_add',
      //     handle: () => {
      //       this.setState({
      //         visible: true,
      //       });
      //     },
      //   },
      //   {
      //     name: '批量删除',
      //     icon: <DeleteOutlined />,
      //     condition: 'sys_role_batchDelete',
      //     disabled: select.length === 0,
      //     handle: () => {
      //       this.deleteDetails(select);
      //     },
      //   },
      // ],
    };

    // 表格组件
    const dataListProps = {
      tableHeaderRefs: this.props.tableHeaderRefs,
      getPage: this.props.getPage,
      queryPager: this.props.queryPager,
      table: {
        ...this.props.table,
        columns: this.state.columns,
        scroll: {
          y: 0,
        },
        columnSorter: columnSorter,
        // sorterDefault: [{ isAsc: true, fieldName: 'sec_state' }],
        rowSelection: this.props.rowSelection,
      },
      pagination: this.props.pagination,
    };

    const modalsProps = {
      permission: this.props.modalParam.permission,
      rootMenus: this.props.modalParam.rootMenus,
      confirmLoading: this.props.modalParam.confirmLoading,
      list: this.state.modalsList,
      handleCancel: this.handleCancel.bind(this),
      handleOk: this.handleOk.bind(this),
    };

    // 数据权限的props
    const dataRoleProps = {
      record: this.state.modalsList,
      handleCancel: this.handleCancelDataRole.bind(this),
      handleOk: () => {
        getPage && getPage();
        dataRoleProps.handleCancel();
      },
    };

    return (
      // <div className="tableBox" style={{width: "calc(100% - 10px)"}}>
      <div className="clear-tableBox">
        <TableToolbar {...toolbarProps}>
          <Tables {...dataListProps} />
        </TableToolbar>

        {this.state.visible && <Modals {...modalsProps} />}
        {this.state.visibleData && <DataRole {...dataRoleProps} />}
      </div>
    );
  }
}

export default List;

// 表头排序
function columnSorter(columnObj) {
  const { order = undefined, columnKey = '' } = columnObj;
  let orders = [];
  if (order) {
    // 排序列名 - 后台
    let fieldName = '';
    if (columnKey === 'name') fieldName = 'T1.name';

    orders = [
      {
        fieldName: fieldName,
        isAsc: order === 'ascend',
      },
    ];
  }
  return orders;
}
