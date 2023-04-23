import React from 'react';
import './edit.less';
import { Table } from 'antd';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { columns, loading, dataSource } = this.props;

    return (
      <div>
        <Table
          columns={columns}
          dataSource={dataSource}
          bordered
          size="small"
          style={{ background: '#fff' }}
          loading={loading}
          pagination={false}
          scroll={{ y: 'calc(100vh - 136px)' }}
        />
      </div>
    );
  }
}

export default List;
