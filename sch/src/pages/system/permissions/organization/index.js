import React from 'react';
import { connect } from 'dva';
import { Modal } from 'antd';
import { getColumns } from './columns';
import List from './list';
import Modals from './modal';
import { getOrgOption } from '../../../../utils/orgSelect';
import { setBuryingPoint } from '@/utils/log/request';

const confirm = Modal.confirm;

/**
 * 组织机构管理
 * @申帅飞
 * @吴昊
 * */
class index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      modalsList: null,
      modalsAddOrg: 1,
      modalsAddOrgCode: undefined,
      selectedRowKeys: [],
      selectedRows: [],
      orgId: localStorage.getItem('tsvcloud_orgId') || '1',
    };
  }

  componentDidMount() {
    setBuryingPoint('组织结构管理');
    // this.getPage();
    this.getOrgTree();
  }

  // 通用 effects
  commonHandle(obj) {
    const { dispatch } = this.props;
    dispatch({
      type: 'organization/commonHandle',
      payload: obj,
    });
  }

  // 获取组织机构/获取该组织机构下的线路和车辆
  getOrgTree() {
    const { dispatch } = this.props;
    const { orgId } = this.state;
    // 获取用户本身的组织机构
    dispatch({
      type: 'organization/getOrgTree',
      payload: {
        // id: orgId,
        orgTreeData: getOrgOption(),
      },
    });
  }

  // 获取数据信息
  getPage() {
    const { dispatch } = this.props;
    dispatch({
      type: 'organization/getAll',
    });
  }

  // 显示模态框新建用户组
  showModal() {
    this.setState({
      visible: true,
      modalsList: null,
    });
  }

  // 关闭模态框
  handleCancel() {
    this.setState({
      visible: false,
      modalsList: null,
      modalsAddOrg: 1,
      modalsAddOrgCode: undefined,
    });
  }

  // 点击确认获取信息关闭模态框
  handleOk(value, resetFields) {
    const self = this;
    const { modalsList } = this.state;
    const { dispatch } = this.props;
    let organization = {};
    if (value['parId']) {
      organization.parentOrgCode = value['parId'];
    }
    if (value['name']) {
      organization.orgNameCn = value['name'];
    }
    if (value['code']) {
      organization.orgCode = value['code'];
    }
    if (value['districtId']) {
      organization.districtId = value['districtId'];
    }
    organization.orgNature = value['orgNature'];
    organization.orgType = value['orgType'];
    organization.orgContact = value['orgContact'];
    organization.validDate = value['validDate'].format('x');

    if (value['remark']) {
      organization.remark = value['remark'];
    }

    if (value['orgContactTitle']) {
      organization.orgContactTitle = value['orgContactTitle'];
    }

    if (value['orgContactPhone']) {
      organization.orgContactPhone = value['orgContactPhone'];
    }

    if (value['estbDate']) {
      organization.estbDate = value['estbDate'].format('x');
    }

    if (value['orgAddress']) {
      organization.orgAddress = value['orgAddress'];
    }

    if (value['remark']) {
      organization.remark = value['remark'];
    }

    if (modalsList) {
      organization.orgId = modalsList.orgId;
    }

    dispatch({
      type: 'organization/add',
      payload: {
        organization,
        modalsList,
      },
      callback: function () {
        resetFields();
        self.setState({
          modalsList: null,
          visible: false,
          modalsAddOrg: 1,
          modalsAddOrgCode: undefined,
        });
        self.getOrgTree();
      },
    });
  }

  // 单条编辑
  handlerEdit(item) {
    this.setState({
      visible: true,
      modalsList: item,
      modalsAddOrg: item.orgId,
    });
  }

  // 单条添加
  handlerAdd(item) {
    this.setState({
      visible: true,
      modalsList: null,
      modalsAddOrg: item.orgId,
      modalsAddOrgCode: item.orgCode,
    });
  }

  // 删除
  deleteArr(selectArr) {
    if (selectArr.length === 0) {
      return false;
    }
    const self = this;
    let list = [];
    let items = selectArr.map((item, index) => {
      list.push(<li key={index}>组织机构名称：{item.orgNameCn}</li>);
      return item.orgId;
    });
    confirm({
      title: '您是否要删除以下信息?',
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
      type: 'organization/deletes',
      payload: {
        ids,
      },
      callback: function () {
        // 刷新页面
        self.getOrgTree();
      },
    });
  }

  // 表格多选控制
  onSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({
      selectedRowKeys,
      selectedRows,
    });
  };

  render() {
    const { organization } = this.props;
    const { pagination, list, treeList } = organization;
    const {
      visible,
      modalsList,
      modalsAddOrg,
      selectedRowKeys,
      selectedRows,
      modalsAddOrgCode,
    } = this.state;
    const columns = getColumns(
      this.handlerEdit.bind(this),
      this.handlerAdd.bind(this),
      this.deleteArr.bind(this),
    );
    const listProps = {
      columns,
      pagination,
      selectedRows,
      dataSource: list,
      showModal: this.showModal.bind(this),
      deleteArr: this.deleteArr.bind(this),
      rowSelection: {
        selectedRowKeys,
        onChange: this.onSelectChange,
      },
    };
    const modalsProps = {
      visible,
      modalsAddOrg,
      modalsAddOrgCode,
      list: modalsList,
      orgTreeData: treeList,
      handleCancel: this.handleCancel.bind(this),
      handleOk: this.handleOk.bind(this),
    };

    return (
      <div
        className="edit-tree-box"
        style={{
          padding: '0 10px 10px 0',
        }}
      >
        <List {...listProps} />
        {visible ? <Modals {...modalsProps} /> : null}
      </div>
    );
  }
}

function mapStateToProps({ organization }) {
  return { organization };
}

export default connect(mapStateToProps)(index);
