import React from "react";
import { Table } from "antd";

/**
 * @desc 显示表格和表格按钮部分
 * @class 表格组件
 * @author 吴昊 2020/1/16
 */
class TableList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { loading, columns, dataSource } = this.props;
    return (
      <div className="tableListBox">
        <Table
          columns={columns}
          dataSource={dataSource}
          bordered
          size="small"
          style={{ background: '#fff' }}
          loading={loading}
          indentSize={8}
          pagination={false}
          // scroll={{y: tableHeight - 62}}
          scroll={{ y: 'calc(100vh - 136px)' }}
        />
      </div>
    );
  }
}

export default TableList;
