import React from "react";
import { Checkbox, Col, Modal, Row } from "antd";

/**
 * @desc 表格工具栏
 * @author 吴昊
 * */
class tableToolbar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      columnFilterData: [],
      checkedList: [],
      indeterminate: true,
      checkAll: true,
    };
    this.handleSave = this.handleSave.bind(this);
  }

  componentDidMount() {
    const { columnFilterData, checkedList, indeterminate, checkAll } =
      this.getColumnFilterData([].concat(this.props.columns));
    // 生成数据源
    this.setState({
      columns: this.props.columns,
      columnFilterData: columnFilterData,
      checkedList: checkedList,
      indeterminate,
      checkAll,
    });
  }

  // 过滤表头列
  getColumnFilterData(columns) {
    let checkedList = [];
    let columnFilterData = columns.map((item) => {
      let items = { ...item };
      items.columnVisible =
        item.columnVisible === undefined ? true : item.columnVisible;
      if (items.columnVisible || items.columnVisible === undefined) {
        checkedList.push(items.title);
      }
      return items;
    });
    return {
      checkedList,
      columnFilterData,
      indeterminate:
        !!checkedList.length && checkedList.length < columnFilterData.length,
      checkAll: checkedList.length === columnFilterData.length,
    };
  }

  // 保存事件
  handleSave() {
    const { columnFilterData, checkedList = [] } = this.state;
    let newColumns = columnFilterData.map((item) => {
      item.columnVisible = checkedList.indexOf(item.title) > -1;
      return item;
    });
    this.props.handleColumnFilterOk(newColumns);
  }

  // 生成表头选择列
  createCheckbox = () => {
    const { columnFilterData } = this.state;
    return columnFilterData.map((item) => {
      return (
        <Col span={12}>
          <Checkbox value={item.title}>{item.title}</Checkbox>
        </Col>
      );
    });
  };

  // 选择列之后
  onChange = (list) => {
    const { columnFilterData = [] } = this.state;
    this.setState({
      checkedList: list,
      indeterminate: !!list.length && list.length < columnFilterData.length,
      checkAll: list.length === columnFilterData.length,
    });
  };

  // 全选操作
  onCheckAllChange = (e) => {
    const { columnFilterData } = this.state;
    this.setState({
      checkedList: e.target.checked
        ? columnFilterData.map((item) => item.title)
        : [],
      indeterminate: false,
      checkAll: e.target.checked,
    });
  };

  render() {
    return (
      <Modal
        title={this.props.settingText || '列配置'}
        open={true}
        width="450px"
        onOk={this.handleSave}
        onCancel={this.props.handleColumnFilterCancel}
        okText="确定"
        cancelText="取消"
        destroyOnClose
        bodyStyle={{
          maxHeight: 450,
          overflow: 'auto',
          padding: '14px 41px',
        }}
        okButtonProps={{
          disabled: this.state.checkedList.length === 0,
        }}
      >
        <Row>
          <Col span={12}>
            <Checkbox
              indeterminate={this.state.indeterminate}
              onChange={this.onCheckAllChange}
              checked={this.state.checkAll}
            >
              全部
            </Checkbox>
          </Col>
        </Row>
        <Checkbox.Group
          style={{ width: '100%' }}
          value={this.state.checkedList}
          onChange={this.onChange}
        >
          <Row>{this.createCheckbox()}</Row>
        </Checkbox.Group>
      </Modal>
    );
  }
}

export default tableToolbar;
