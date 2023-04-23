import React from 'react';
import { Card, message, Spin, Tree } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { getRecursionByParentId } from '../../../services/System/permissions/organization';

const { TreeNode, DirectoryTree } = Tree;

/**
 * @desc 左侧布局，显示组织机构
 * @class leftOrganization
 * @author 吴昊 2020/2/4
 */
class leftOrganization extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      loading: false,
      orgId: localStorage.getItem('tsvcloud_orgId') || '1',
      selectedKeys: localStorage.getItem('tsvcloud_orgId') || '1',
      name: '',
      visible: false,
    };
  }

  componentDidMount() {
    this.setState({
      loading: true,
    });
    this.getByPage();
  }

  // 获取组织机构树
  async getByPage() {
    const { loadGetByPage } = this.props;
    const { orgId } = this.state;
    const data = await getRecursionByParentId({
      id: orgId,
    });
    if (data.statusCode === 200) {
      let datas = data.content;
      let treeData = getTreeData(datas);
      // let orgTreeData = getOrgOption();
      // orgTreeData[0].children = treeData;
      this.setState({
        list: treeData,
      });
      if (datas) {
        if (loadGetByPage) {
          loadGetByPage(treeData[0].orgId || 1, treeData);
        }
      }
    } else if (data.message !== '查询成功') {
      message.error('查询失败，系统错误是：' + data.message);
      message.error('组织机构获取失败，无法查询用户！');
    }
    this.setState({
      loading: false,
    });
  }

  renderTreeNodes = (data) =>
    data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.value} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.value} {...item} dataRef={item} />;
    });

  // 点击树，触发事件
  handleTreeSelect = (selectedKey, e, evnet) => {
    this.setState({
      selectedKeys: selectedKey,
      name: e.node.props.title,
      visible: true,
    });
    this.props.onSelect(Array.isArray(selectedKey) ? selectedKey[0] : null);
  };

  // 清空选中的树结构
  handleClearTreeSelct = () => {
    const { orgId } = this.state;
    this.setState({
      selectedKeys: '1',
      visible: false,
      name: '',
    });
    this.props.onSelect(orgId);
  };

  render() {
    const { list, loading, selectedKeys, name, visible } = this.state;
    return (
      <div className="tree_box">
        <Card
          size="small"
          title="组织机构"
          hoverable
          extra={
            <a>
              {name}{' '}
              {visible ? (
                <CloseOutlined onClick={this.handleClearTreeSelct} />
              ) : null}{' '}
            </a>
          }
          style={{ width: 240, margin: '10px 0 0 0' }}
        >
          <Spin tip="Loading..." spinning={loading}>
            <DirectoryTree
              selectedKeys={selectedKeys}
              onSelect={this.handleTreeSelect}
              defaultExpandAll={true}
            >
              {this.renderTreeNodes(list)}
            </DirectoryTree>
          </Spin>
        </Card>
      </div>
    );
  }
}

export default leftOrganization;

// 重新给子级菜单赋值，变为树形菜单数据
function getTreeData(arrList) {
  arrList.map((item) => {
    item.title = item.orgNameCn;
    item.value = item.orgId;
    item.key = item.orgId;
    if (item.children) {
      item.children = getTreeData(item.children);
    }
    return item;
  });
  return arrList;
}
