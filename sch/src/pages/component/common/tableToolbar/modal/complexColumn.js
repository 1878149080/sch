import React from "react";
import { Icon, Modal, Radio, Switch, Table } from "antd";

/**
 * @desc 表格列控制 - 复杂类型 - 2
 * @author 吴昊
 * */
class tableToolbar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      columnFilterData: [],
      // 全部列是否显示， true：显示，false：隐藏
      switchAllVisible: true,
    };
    this.handleSave = this.handleSave.bind(this);
    this.handleSwitch = this.handleSwitch.bind(this);
  }

  componentDidMount() {
    // 生成数据源
    this.setState({
      columns: this.props.columns,
      columnFilterData: this.getColumnFilterData([].concat(this.props.columns)),
    });
  }

  // 过滤表头列
  getColumnFilterData(columns) {
    let filterDatas = [];
    let colIndex = 1;
    let minMoveIndex = -1;
    let maxMoveIndex = -1;
    for (let i = 0, j = columns.length; i < j; i++) {
      if (columns[i].columnMoveAble !== false) {
        if (minMoveIndex < 0) {
          minMoveIndex = i;
        }
        if (maxMoveIndex < i) {
          maxMoveIndex = i;
        }
      }
    }
    const isFixed = (fixed = '') => {
      return fixed ? (fixed === 'right' ? 'right' : 'left') : false;
    };
    for (let columnItem of columns) {
      if (columnItem.columnMoveAble) {
        columnItem.orderIndex = columnItem.orderIndex || colIndex++;
      }
      columnItem.orderIndex = columnItem.orderIndex || colIndex++;
      let filterData = {
        key: columnItem.key,
        dataIndex: columnItem.dataIndex,
        name: columnItem.title,
        columnFixed: isFixed(columnItem.fixed),
        orderIndex: columnItem.orderIndex,
        columnVisible: columnItem.columnVisible,
        columnMoveAble: columnItem.columnMoveAble,
        columnFixAble: columnItem.columnFixAble,
        minMoveIndex: minMoveIndex,
        maxMoveIndex: maxMoveIndex,
      };
      if (columnItem.children) {
        filterData.children = this.getColumnFilterData(columnItem.children);
      }
      filterDatas.push(filterData);
    }
    return filterDatas;
  }

  // 控制是否显示该列
  handleColumnVisible(record, checked) {
    let curColumns = this.state.columns;
    this.columnVisibleChange(record, checked, curColumns);
    const list = this.getColumnFilterData(curColumns);
    let closeData = [];
    let openData = [];
    list.map((item) => {
      if (item.columnVisible === false) {
        closeData.push(item);
      } else {
        openData.push(item);
      }
      return item;
    });
    if (closeData.length === curColumns.length) {
      this.setState({
        switchAllVisible: false,
      });
    }
    if (openData.length === curColumns.length || openData.length > 0) {
      this.setState({
        switchAllVisible: true,
      });
    }

    this.setState({
      columns: curColumns,
      columnFilterData: list,
    });
  }

  // 在原始数据源中更改该列是否显示
  columnVisibleChange(record, visible, curColumns) {
    let allUnVisible = true;
    for (let i = 0, j = curColumns.length; i < j; i++) {
      let column = curColumns[i];
      if (!record || column.dataIndex === record.dataIndex) {
        column.columnVisible = visible;
        if (column.children) {
          this.columnVisibleChange(null, visible, column.children);
        }
      } else if (column.children) {
        let childAllUnVisible = this.columnVisibleChange(
          record,
          visible,
          column.children,
        );
        if (childAllUnVisible) {
          column.columnVisible = false;
        }
      }
      if (column.columnVisible !== false) {
        allUnVisible = false;
      }
    }
    return allUnVisible;
  }

  // 控制该列是否被冻结
  handleColumnFixed(record, checked) {
    let curColumns = this.state.columns;
    this.columnFixedChange(record, checked, curColumns);
    this.setState({
      columns: curColumns,
      columnFilterData: this.getColumnFilterData(curColumns),
    });
  }

  // 在原始数据源中更改该列是否被冻结
  columnFixedChange(record, isFixed, curColumns) {
    for (let i = 0, j = curColumns.length; i < j; i++) {
      let column = curColumns[i];
      if (column.dataIndex === record.dataIndex) {
        column.fixed = isFixed;
        break;
      } else if (column.children) {
        column.children = this.columnOrderChange(
          record,
          isFixed,
          column.children,
        );
      }
    }
  }

  // 控制该列的顺序
  handleColumnOrder(record, isUp) {
    let columns = this.columnOrderChange(record, isUp, this.props.columns);
    this.setState({
      columns: columns,
      columnFilterData: this.getColumnFilterData(columns),
    });
  }

  // 在原始数据源中更改该列的顺序
  columnOrderChange(record, isUp, curColumn) {
    let curColumns = curColumn;
    for (let i = 0, j = curColumns.length; i < j; i++) {
      let column = curColumns[i];
      if (column.dataIndex === record.dataIndex) {
        let itemIndex = isUp
          ? this.getUpMoveAble(i, curColumns)
          : this.getDownMoveAble(i, curColumns);
        let curOrder = column.orderIndex;
        column.orderIndex = curColumns[itemIndex].orderIndex;
        curColumns[itemIndex].orderIndex = curOrder;

        curColumns = curColumns.sort(function (a, b) {
          return a.orderIndex - b.orderIndex;
        });
        break;
      } else if (column.children) {
        column.children = this.columnOrderChange(record, isUp, column.children);
      }
    }
    return curColumns;
  }

  // 列上移
  getUpMoveAble(curIndex, curColumns) {
    for (let i = curIndex - 1; i >= 0; i--) {
      if (curColumns[i].columnMoveAble !== false) {
        return i;
      }
    }
    return -1;
  }

  // 列下移
  getDownMoveAble(curIndex, curColumns) {
    for (let i = curIndex + 1; i < curColumns.length; i++) {
      if (curColumns[i].columnMoveAble !== false) {
        return i;
      }
    }
    return -1;
  }

  // 保存事件
  handleSave() {
    this.state.columns.map((item) => {
      if (item.fixed === false) {
        item.fixed = '';
      }
      // if (item.fixed === "left") {
      //   item.width = "";
      // }
      return item;
    });

    this.props.handleColumnFilterOk(this.state.columns);
  }

  // 全部列，切换显示和隐藏
  handleSwitch() {
    const visible = !this.state.switchAllVisible;
    let curColumns = this.state.columns;
    this.columnVisibleChange2(curColumns, visible);
    this.setState({
      columns: curColumns,
      columnFilterData: this.getColumnFilterData(curColumns),
    });
    this.setState({
      switchAllVisible: visible,
    });
  }

  // 在原始数据源中更改该列是否显示
  columnVisibleChange2(curColumns, visible) {
    let allUnVisible = true;
    for (let i = 0, j = curColumns.length; i < j; i++) {
      let column = curColumns[i];
      column.columnVisible = visible;
      if (column.children) {
        this.columnVisibleChange2(column.children);
      }
    }
    return allUnVisible;
  }

  render() {
    let filterTableColumns = [
      {
        title: '列名',
        dataIndex: 'name',
        key: 'name',
        width: 300,
        style: { textAlign: 'left' },
      },
      {
        title: (
          <div>
            <span>是否显示</span>
            <Switch
              style={{ marginLeft: 20 }}
              checkedChildren={'全显示'}
              unCheckedChildren={'全隐藏'}
              checked={this.state.switchAllVisible}
              onChange={this.handleSwitch}
            />
            {/* <a style={{ marginLeft: 20 }} onClick={this.handleSwitch}> */}
            {/*  {this.state.switchAllVisible ? "全隐藏" : "全显示"} */}
            {/* </a> */}
          </div>
        ),
        dataIndex: 'columnVisible',
        key: 'columnVisible',
        width: 190,
        render: (text, record) => (
          <Switch
            checkedChildren={'显示'}
            unCheckedChildren={'隐藏'}
            checked={
              record.columnVisible === undefined ||
              record.columnVisible === true
            }
            onChange={(checked) => this.handleColumnVisible(record, checked)}
          />
        ),
      },
      {
        title: '列固定',
        dataIndex: 'columnFixed',
        key: 'columnFixed',
        width: 300,
        render: (text, record) => {
          return record.columnFixAble !== false ? (
            <Radio.Group
              onChange={(e) => this.handleColumnFixed(record, e.target.value)}
              value={record.columnFixed}
            >
              <Radio value={false}>不固定</Radio>
              <Radio value="left">左侧</Radio>
              <Radio value="right">右侧</Radio>
            </Radio.Group>
          ) : // <Switch
          //   checkedChildren={"冻结"}
          //   unCheckedChildren={"不冻结"}
          //   checked={
          //     record.columnFixed !== undefined && record.columnFixed !== false
          //   }
          //   onChange={(checked) => this.handleColumnFixed(record, checked)}
          // />
          null;
        },
      },
      {
        title: '顺序',
        dataIndex: 'orderIndex',
        key: 'orderIndex',
        width: 100,
        render: (text, record) => (
          <span>
            {record.columnMoveAble !== false &&
            record.orderIndex > record.minMoveIndex + 1 ? (
              <a href="#" onClick={() => this.handleColumnOrder(record, true)}>
                <Icon type="arrow-up" />
                上移
              </a>
            ) : null}
            {record.columnMoveAble !== false &&
            record.orderIndex < record.maxMoveIndex + 1 ? (
              <a href="#" onClick={() => this.handleColumnOrder(record, false)}>
                <Icon type="arrow-down" />
                下移
              </a>
            ) : null}
          </span>
        ),
      },
    ];
    return (
      <Modal
        title={this.props.settingText || '列配置'}
        open={this.props.visible}
        width="1000px"
        onOk={this.handleSave}
        onCancel={this.props.handleColumnFilterCancel}
        okText="确定"
        cancelText="取消"
        destroyOnClose
        bodyStyle={{
          maxHeight: 450,
          overflow: 'auto',
        }}
        okButtonProps={{
          disabled: !this.state.switchAllVisible,
        }}
      >
        <Table
          className="setColumns"
          size="small"
          pagination={false}
          columns={filterTableColumns}
          dataSource={this.state.columnFilterData}
        />
      </Modal>
    );
  }
}

export default tableToolbar;
