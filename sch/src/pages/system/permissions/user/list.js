import React from 'react';
import md5 from 'js-md5';
import { Modal } from 'antd';
import { PlusSquareOutlined, RedoOutlined } from '@ant-design/icons';
import Tables from '../../../../component/tables';
import TableToolbar from '../../../component/common/tableToolbar/tableToolbar';
import { getColumns } from './columns';
import Modals from './modal';
import { getRoleBarBtn } from '../../../../utils/logo/roleBtn';

const confirm = Modal.confirm;

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: getColumns(
        this.handlerEdit.bind(this),
        this.deleteDetails.bind(this),
      ),
      visible: false,
      modalsList: null,
    };
  }

  // 添加/编辑弹窗 - 确认
  handleOk = (values, resetFields, setConfirmLoading) => {
    const self = this;
    const {
      dispatch,
      getPage,
      clearTableSelect,
      queryPager: queryPagers,
    } = this.props;
    const { modalsList } = this.state;
    let user = {};
    if (values['parId']) {
      user.orgId = values['parId'];
    }

    if (values['name']) {
      user.name = values['name'];
    }

    if (!modalsList && values['pwd']) {
      user.pwd = md5(md5(md5(values['pwd'])));
    }

    if (values['realName']) {
      user.realName = values['realName'];
    }

    if (values['roles']) {
      user.roleIds = values['roles'];
    }
    if (values['remark']) {
      user.remark = values['remark'];
    }
    if (modalsList) {
      user.userId = modalsList.userId;
    }
    user.isSys = values['isSys'];
    user.isInvalid = values['isInvalid'];
    // user.dataPre = values['dataPre'];
    user.dataPre = 3;

    setConfirmLoading(true);
    dispatch({
      type: 'user/add',
      payload: {
        user,
        modalsList,
      },
      callback: function (state = false) {
        setConfirmLoading(false);
        if (state) {
          resetFields();
          self.setState({
            visible: false,
            modalsList: null,
          });
          let queryPager = Object.assign({}, queryPagers);
          queryPager.pageIndex = 1;
          getPage(queryPager);
          clearTableSelect();
        }
      },
    });
  };

  // 编辑弹窗 - 关闭弹窗
  handleCancel = () => {
    this.setState({
      visible: false,
      modalsList: null,
    });
  };

  // 单条编辑
  handlerEdit = (item) => {
    this.setState({
      visible: true,
      modalsList: item,
    });
  };

  // 删除提示弹窗
  deleteDetails = (selectArr) => {
    if (selectArr.length === 0) {
      return false;
    }
    const self = this;
    let list = [];
    let result = [];
    let obj = {};
    let selectData = [].concat(...selectArr);
    for (let i = 0; i < selectData.length; i++) {
      if (!obj[selectData[i].key]) {
        result.push(selectData[i]);
        obj[selectData[i].key] = true;
      }
    }
    let ids = result.map((item) => {
      list.push(<li>真实名称：{item.realName}</li>);
      return item.userId;
    });
    confirm({
      title: '您是否要删除这些用户?',
      content: <ol>{list}</ol>,
      width: 460,
      onOk() {
        // 删除
        self.deleteItems(ids);
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
      type: 'user/deletes',
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

  // 重置密码弹窗
  resetPassword = () => {
    const { selectedRows } = this.props;
    if (selectedRows.length === 0) {
      return false;
    }

    const self = this;
    let list = [];
    let ids = selectedRows.map((item) => {
      list.push(<li>真实名称：{item.realName}</li>);
      return item.userId;
    });
    confirm({
      title: '您是否要重置这些用户密码?',
      content: <ol>{list}</ol>,
      width: 460,
      onOk() {
        // 删除
        self.resetPasswordAjax(ids);
      },
    });
  };

  // 重置密码弹窗请求
  resetPasswordAjax = (ids) => {
    const self = this;
    const { dispatch } = this.props;
    dispatch({
      type: 'user/resetPassword',
      payload: {
        ids,
      },
      callback: function () {
        // 刷新页面
        self.props.clearTableSelect();
        self.props.getPage();
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
        role: 'sys_user_add',
        icon: <PlusSquareOutlined />,
        name: '新增用户',
        handle: () => {
          this.setState({
            visible: true,
          });
        },
      },
      {
        role: 'sys_user_batchDelete',
        icon: (
          <span
            className={'iconfont icon-shanchu '}
            style={{ fontSize: '12px' }}
          />
        ),
        name: '批量删除',
        disabled: this.props.select.length === 0,
        handle: () => {
          this.deleteDetails(this.props.selectedRows);
        },
      },
      {
        role: 'sys_user_batchResetPwd',
        icon: <RedoOutlined />,
        name: '重置密码',
        disabled: this.props.select.length === 0,
        handle: () => {
          this.resetPassword();
        },
      },
    ];
    return getRoleBarBtn(btnList);
  };

  render() {
    // 表格工具栏的props
    const toolbarProps = {
      // className: '',
      tableBtnRefs: this.props.tableBtnRefs,
      title: '用户列表',
      columns: this.state.columns,
      setColumn: this.handleSetColumn,
      columnFilterEnable: true,
      canExpand: true,
      // onExport: this.downLoadFile,
      pageThis: this.props.getPageThis(),
      btnList: this.getTableBarRoleBtn(),
      // btnList: [
      //   {
      //     condition: 'sys_user_add',
      //     icon: <PlusSquareOutlined />,
      //     name: '新增用户',
      //     handle: () => {
      //       this.setState({
      //         visible: true,
      //       });
      //     },
      //   },
      //   {
      //     condition: 'sys_user_batchDelete',
      //     icon: <DeleteOutlined />,
      //     name: '批量删除',
      //     disabled: select.length === 0,
      //     handle: () => {
      //       this.deleteDetails(this.props.select);
      //     },
      //   },
      //   {
      //     condition: 'sys_user_batchResetPwd',
      //     icon: <RedoOutlined />,
      //     name: '重置密码',
      //     disabled: select.length === 0,
      //     handle: () => {
      //       this.resetPassword();
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

    // 编辑/添加的弹窗
    const modalsProps = {
      ...this.props.modal,
      list: this.state.modalsList,
      handleOk: this.handleOk,
      handleCancel: this.handleCancel,
    };

    return (
      <div>
        <TableToolbar {...toolbarProps}>
          <Tables {...dataListProps} />
        </TableToolbar>

        {this.state.visible && <Modals {...modalsProps} />}
      </div>
    );
  }
}

export default UserList;

// 表头排序
function columnSorter(columnObj) {
  const { order = undefined, columnKey = '' } = columnObj;
  let orders = [];
  if (order) {
    // 排序列名 - 后台
    let fieldName = '';
    if (columnKey === 'realName') fieldName = 'T1.real_name';

    orders = [
      {
        fieldName: fieldName,
        isAsc: order === 'ascend',
      },
    ];
  }
  return orders;
}
