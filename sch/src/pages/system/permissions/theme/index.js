import React from 'react';
import '../organization/edit.less';
import { connect } from 'umi';
import { Modal } from 'antd';
import { getColumns } from './columns';
import List from './list';
import Modals from './modal';
import { setBuryingPoint } from '@/utils/log/request';

const confirm = Modal.confirm;

/**
 * @desc 主管管理菜单名称和菜单的前端路由。 原编写者申帅飞
 * @class 菜单管理
 * @author 吴昊 2020/1/16
 */
class index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalsList: null,
      modalsMenu: null,
      modalsAddOrg: 1,
    };
  }

  componentDidMount() {
    setBuryingPoint('菜单管理');
    this.getPage();
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'theme/clearState',
    });
  }

  // 通用 effects
  commonHandle(obj) {
    const { dispatch } = this.props;
    dispatch({
      type: 'theme/commonHandle',
      payload: obj,
    });
  }

  // 获取数据信息
  getPage() {
    this.props.dispatch({
      type: 'theme/getPage',
    });
  }

  // 显示模态框新建菜单组
  showModal() {
    this.setState({
      modalsList: null,
      modalsMenu: null,
    });
    this.commonHandle({
      visible: true,
    });
  }

  // 关闭模态框
  handleCancel() {
    this.commonHandle({
      visible: false,
    });
    this.setState({
      modalsList: null,
      modalsMenu: null,
    });
  }

  // 点击确认获取信息关闭模态框
  handleOk(value, resetFields) {
    const self = this;
    const { modalsList } = this.state;
    const { dispatch } = this.props;
    let menu = {
      perssionType: value['perssionType'],
      menuParId: value['menuParId'] || null,
      menuName: value['menuName'],
      menuIndex: value['menuIndex'],
      isInvalid: !value['isInvalid'],
    };

    if (menu.perssionType === 0) {
      // 菜单类型
      if (value['icon']) {
        menu.icon = value['icon'];
      }

      // menu.isInvalid = !value["isInvalid"];
      menu.menuRemark = value['menuRemark'];
    } else if (menu.perssionType === 1) {
      // 按钮类型
      menu.permissionCode = value['permissionCode'];
    }

    if (value['menuAddr']) {
      menu.menuAddr = value['menuAddr'];
    }

    if (modalsList) menu.menuId = modalsList.menuId;

    self.commonHandle({
      confirmLoading: true,
    });

    dispatch({
      type: 'theme/add',
      payload: {
        menu,
        modalsList,
      },
      callback: function () {
        resetFields();
        self.setState({
          modalsList: null,
        });
        self.getPage();
        self.commonHandle({
          visible: false,
          name: value['menuName'],
          isInvalid: !value['isInvalid'],
        });
      },
    });
  }

  // 单条编辑
  handlerEdit(item) {
    this.setState({
      modalsList: item,
      modalsAddOrg: item.menuId,
    });
    this.commonHandle({
      visible: true,
    });
  }

  // 新增菜单
  handleAdd(item) {
    this.commonHandle({
      visible: true,
    });
    const lengths = item.children;
    this.setState({
      modalsAddOrg: item.menuId,
      modalsMenu: {
        menuId: item.menuId,
        childLength: lengths ? lengths.length : 0,
      },
    });
  }

  // 删除提示弹窗
  deletes(selectArr) {
    const self = this;
    let list = [];
    let items = [];
    selectArr.map((item, index) => {
      list.push(<li key={index}>菜单名称：{item.menuName}</li>);
      items.push(item.menuId);
      return false;
    });
    confirm({
      title: '您是否要删除这个菜单?',
      content: <ol>{list}</ol>,
      width: 460,
      onOk() {
        self.deleteItems(items);
      },
    });
  }

  // 删除请求
  deleteItems(ids) {
    const self = this;
    const { dispatch } = this.props;
    dispatch({
      type: 'theme/deletes',
      payload: {
        ids,
      },
      callback: function () {
        // 刷新页面
        self.getPage();
      },
    });
  }

  render() {
    const { theme } = this.props;
    const { list, visible, loading, confirmLoading } = theme;
    const { modalsList, modalsMenu, modalsAddOrg } = this.state;
    const columns = getColumns(
      this.handlerEdit.bind(this),
      this.handleAdd.bind(this),
      this.deletes.bind(this),
    );
    const listProps = {
      columns,
      loading,
      dataSource: list,
    };
    const modalsProps = {
      visible,
      modalsMenu,
      treeData: list,
      list: modalsList,
      confirmLoading,
      modalsAddOrg,
      handleCancel: this.handleCancel.bind(this),
      handleOk: this.handleOk.bind(this),
    };

    return (
      <div
        id="theme"
        className="edit-tree-box"
        style={{ padding: '0 10px 10px 0' }}
      >
        <List {...listProps} />
        {visible ? <Modals {...modalsProps} /> : null}
      </div>
    );
  }
}

function mapStateToProps({ theme }) {
  return { theme };
}

export default connect(mapStateToProps)(index);
