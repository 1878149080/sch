import React from 'react';
import { Pagination } from 'antd';

class List extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleOnChange = this.handleOnChange.bind(this);
    this.onShowSizeChange = this.onShowSizeChange.bind(this);
  }

  // 页码改变回调
  handleOnChange(page, pageSize) {
    let { queryPager = {}, getPage } = this.props;
    queryPager.pageIndex = page;
    queryPager.pageSize = pageSize;
    getPage(queryPager);
  }

  // 页条数改变回调
  onShowSizeChange(current, size) {
    let { queryPager = {}, getPage } = this.props;
    queryPager.pageIndex = 1;
    queryPager.pageSize = size;
    getPage(queryPager);
  }

  render() {
    return (
      <div className="pagination">
        {(this.props.total || 0) > 0 ? (
          <Pagination
            {...this.props}
            onChange={this.handleOnChange}
            onShowSizeChange={this.onShowSizeChange}
          />
        ) : null}
      </div>
    );
  }
}

export default List;
