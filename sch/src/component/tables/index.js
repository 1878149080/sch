import React from 'react';
import Tables from './table';
import Paginations from './pagination';

class TableIndex extends React.PureComponent {
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
        queryPager: queryPagers = {},
        getPage = null,
        table: { columnSorter, sorterDefault = [] },
      } = this.props;
      let queryPager = Object.assign({}, queryPagers);
      columnSorter &&
        (queryPager.orderConditions = [].concat(
          sorterDefault,
          columnSorter(sorter),
        ));
      getPage && getPage(queryPager);
    }
  }

  render() {
    const upKey = new Date().getTime();
    return (
      <div ref={this.props.tableBoxRefs}>
        <div className="tables">
          <Tables
            {...this.props.table}
            tableHeight={this.props.tableHeight}
            upKey={upKey}
            onChange={this.handleTableOnChange}
          />
        </div>
        {this.props.pagination ? (
          <Paginations
            {...this.props.pagination}
            getPage={this.props.getPage}
            queryPager={this.props.queryPager}
          />
        ) : null}
      </div>
    );
  }
}

export default TableIndex;

