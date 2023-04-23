import React from 'react';
import { Pagination } from 'antd';
import { getPagination } from '../../utils/queryPage/modelsUtil';

class List extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.onShowSizeChange = this.onShowSizeChange.bind(this);
    this.changGize = this.changGize.bind(this);
  }

  // 页码改变回调
  handleOnChange(page, pageSize) {
    let { queryPager = {}, getPage } = this.props;
    let queryPagers = Object.assign({}, queryPager);
    queryPagers.pageIndex = page;
    queryPagers.pageSize = pageSize;
    getPage(queryPagers);
  }

  // 页条数改变回调
  onShowSizeChange(current, size) {
    let { queryPager = {}, getPage } = this.props;
    let queryPagers = Object.assign({}, queryPager);
    queryPagers.pageIndex = 1;
    queryPagers.pageSize = size;
    getPage(queryPagers);
  }

  onChange(e) {
    const value = e.target.value;
    let { queryPager = {} } = this.props;
    let queryPagers = Object.assign({}, queryPager);
    const num = Math.ceil(queryPagers.recordCount / queryPagers.pageSize);
    if (value === 0 || value === '0') {
      this.setState({ value: 1 });
    } else if (value > num) {
      this.setState({ value: num });
    } else if (value === '') {
      this.setState({ value: value });
    } else {
      this.setState({ value: value });
    }
  }

  changGize() {
    let { queryPager = {}, getPage } = this.props;
    const { value } = this.state;
    let queryPagers = Object.assign({}, queryPager);
    if (value === '') {
      queryPagers.pageIndex = 1;
      this.setState({ value: 1 });
    } else {
      queryPagers.pageIndex = value;
    }

    getPage(queryPagers);
  }

  render() {
    const totalNum = (data) => {
      return Math.ceil(data.recordCount / data.pageSize);
    };
    let { queryPager = {} } = this.props;
    let queryPagers = Object.assign({}, queryPager);
    return (
      <div className="pagination">
        <Pagination
          {...Object.assign({}, getPagination(), this.props)}
          onChange={this.handleOnChange}
          onShowSizeChange={this.onShowSizeChange}
        />
        {/*// <div className="paginationBox">*/}
        {/*// {(this.props.total || 0) > 0 ? (*/}
        {/*// <div className="box">*/}
        {/*// <Pagination*/}
        {/*//       {...Object.assign({}, getPagination(), this.props)}*/}
        {/*//        onChange={this.handleOnChange}*/}
        {/*//        itemRender={itemRender}*/}
        {/*//     />*/}
        {/*//      <div className="pagizeNum">*/}
        {/*//       <span className="pagize">{queryPagers.pageIndex}</span>*/}
        {/*//        <span className="pagizeZong">  */}
        {/*//       /{totalNum(queryPagers)}*/}
        {/*//      </span>*/}
        {/*//       到第*/}
        {/*/!*      <Input value={this.state.value} onChange={this.onChange.bind(this)} />页*!/*/}
        {/*/!*      <Button className="button" onClick={this.changGize}>确认</Button>*!/*/}
        {/*/!*    </div>*!/*/}
        {/*/!*  </div>*!/*/}
        {/*/!*  ) : null}*!/*/}
        {/*/!*</div>*!/*/}
      </div>
    );
  }
}

export default List;

function itemRender(current, type, originalElement) {
  if (type === 'next') {
    return (
      <li
        title="下一页"
        className="ant-pagination-next ant-pagination-disabled"
        aria-disabled="true"
      >
        <button
          className="ant-pagination-item-link"
          type="button"
          tabIndex="-1"
          disabled=""
          style={{ paddingLeft: '5px', paddingRight: '5px' }}
        >
          <span>下一页</span>
          <span role="img" aria-label="right" className="anticon anticon-right">
            <svg
              viewBox="64 64 896 896"
              focusable="false"
              data-icon="right"
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"></path>
            </svg>
          </span>
        </button>
      </li>
    );
    // return <a>下一页</a>;
  }
  return originalElement;
}
