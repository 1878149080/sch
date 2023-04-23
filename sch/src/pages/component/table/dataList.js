import React from 'react';
import Tables from './dataList/table';
import Paginations from './dataList/pagination';

class List extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleTableOnChange = this.handleTableOnChange.bind(this);
  }

  // 表格事件监听
  handleTableOnChange(pagination, filters, sorter) {
    // 如果有自定义，则调用自定义，否则就用默认的
    if (this.props.table.onChange) {
      this.props.table.onChange(pagination, filters, sorter);
    } else {
      const {
        queryPager,
        getPage,
        table: { columnSorter },
      } = this.props;
      queryPager.orderConditions = columnSorter(sorter);
      getPage(queryPager);
    }
  }

  render() {
    const upKey = new Date().getTime();
    return (
      <div ref={this.props.tableHeaderRefs}>
        <div className="tables tables-small tables-small-table">
          <Tables
            {...this.props.table}
            tableHeight={this.props.tableHeight}
            upKey={upKey}
            // columns={this.props.columns}
            // dataSource={this.props.dataSource}
            // loading={this.props.loading}
            onChange={this.handleTableOnChange}
            // scroll={this.props.scroll}
          />
        </div>
        <Paginations
          {...this.props.pagination}
          getPage={this.props.getPage}
          queryPager={this.props.queryPager}
        />
      </div>
    );
  }
}

export default List;
