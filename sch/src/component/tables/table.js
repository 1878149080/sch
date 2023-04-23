import React from "react";
import { Form, Table } from "antd";
import { columnAddResize, thComponents } from "./resizable";

// const EditableContext = React.createContext();
/**
 * 普通表格
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
    const { dataSource = [], component = {} } = this.props;
    if (dataSource.length >= 50) {
      // const newTableCom = VList();
      // return Object.assign({}, thComponents, newTableCom);
      return Object.assign({}, thComponents, component);
    }
    return Object.assign({}, thComponents, component);
  }

  // 获取滚动数据
  isScroll = () => {
    const { scroll, columns, tableHeight = 0, fixedY = 0 } = this.props;
    const scrollY = scroll ? (scroll.y ? scroll.y : 0) : 0;
    const xx = columns
      .map((item) => {
        return item.columnVisible !== false ? item.width : 0;
      })
      .reduce((a, b) => a + b);
    return {
      x: xx,
      y: fixedY ? fixedY : tableHeight - scrollY,
    };
  };

  render() {
    const {
      // columns = [],
      dataSource = [],
      loading = false,
      onChange,
      // scroll = {},
      rowClassName,
      rowSelection = undefined,
      bordered = false,
      size = 'small',
      expandable = false,
      pagination = false,
    } = this.props;

    return (
      <Form form={this.props.form}>
        <Table
          components={this.isVirtuallistTable()}
          // components={VList({
          //   height: 700
          // })}
          expandable={expandable}
          bordered={bordered}
          columns={this.filterColumn()}
          dataSource={dataSource}
          loading={loading}
          rowClassName={rowClassName}
          rowkey={(item) => item.key}
          pagination={pagination}
          showSorterTooltip={false}
          onChange={onChange}
          // scroll={scroll}
          scroll={this.isScroll()}
          size={size}
          style={{ background: '#fff' }}
          rowSelection={rowSelection}
        />
      </Form>
    );
  }
}

export default List;
