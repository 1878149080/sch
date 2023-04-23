import React from "react";
import { Table } from "antd";
// import { VList } from "virtuallist-antd";
import { columnAddResize, thComponents } from "../resizable";

/**
 * 数据表格
 * @吴昊
 * */
class List extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
    };
    this.filterColumn = this.filterColumn.bind(this);
  }

  // componentDidUpdate(prevProps, prevState) {
  //   const upKey = prevProps.upKey;
  //   // 当有新props，并且上次有拖拽后的列，则需要清除
  //   if (upKey !== this.upKey && prevState.columns.length > 0) {
  //     this.upKey = upKey;
  //     // eslint-disable-next-line react/no-did-update-set-state
  //     this.setState({
  //       columns: [],
  //     });
  //   }
  // }

  // 获取dataIndex
  getDataIndex(list = []) {
    return list.map((item) => item.dataIndex || '-').join('');
  }

  // 表头列，实时更新
  checkColumn() {
    const stateColumns = this.state.columns;
    const propsColumns = this.props.columns;
    const stateStr = this.getDataIndex(stateColumns);
    const propsStr = this.getDataIndex(propsColumns);

    // 1. 根据dataIndex，判断是否是新的表头
    const upSate = JSON.stringify(stateStr) !== JSON.stringify(propsStr);
    // 2. 表头拖拽，需要更新表头
    // const upSate2 = propsStr;
    return upSate ? propsColumns : stateColumns;
  }

  // 过滤数组。
  // 1。 固定列，调整列位置，否则会引起样式Bug
  // 2。 添加拖拽列功能
  filterColumn() {
    // const list =
    //   this.state.columns.length > 0 ? this.state.columns : this.props.columns;
    const list = this.checkColumn();
    const left = [];
    const content = [];
    const right = [];
    for (let i = 0; i < list.length; i++) {
      const item = list[i];
      const { fixed = '', columnVisible = true } = item;
      // 过滤隐藏列
      if (columnVisible) {
        if (fixed === 'right') {
          right.push(item);
        } else if (fixed === '') {
          content.push(item);
        } else {
          left.push(item);
        }
      }
    }

    // 添加拖拽列
    return columnAddResize(this, [].concat(left, content, right));
  }

  // 如果条数大于或者等于50条，则自动开启虚拟列表
  isVirtuallistTable() {
    const { dataSource = [] } = this.props;
    if (dataSource.length >= 50) {
      // const newTableCom = VList();
      // return Object.assign({}, thComponents, newTableCom);
      return Object.assign({}, thComponents, {});
    }
    return thComponents;
  }

  render() {
    const {
      // columns = [],
      dataSource = [],
      loading = false,
      onChange,
      scroll = {},
    } = this.props;

    return (
      <Table
        components={this.isVirtuallistTable()}
        // bordered={true}
        columns={this.filterColumn()}
        dataSource={dataSource}
        loading={loading}
        rowkey={(item) => item.key}
        pagination={false}
        onChange={onChange}
        scroll={scroll}
        size="small"
        style={{ background: '#fff' }}
      />
    );
  }
}

export default List;
