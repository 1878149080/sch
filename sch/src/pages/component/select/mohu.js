import React from 'react';
import { Select } from 'antd';
import { createOptions } from '../../../utils/dictionaries';

class search extends React.PureComponent {
  constructor() {
    super();
    this.state = {};
    this.filterOption = this.filterOption.bind(this);
  }

  // 前端模糊搜索
  filterOption(input, option) {
    return (
      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    );
  }

  render() {
    const {
      size = 'small',
      list = [],
      style = { width: 166 },
      placeholder = '请选择',
      allowClear = true,
      showSearch = false,
      onChange,
    } = this.props;

    return (
      <Select
        size={size}
        style={style}
        placeholder={placeholder}
        allowClear={allowClear}
        showSearch={showSearch}
        optionFilterProp="children"
        filterOption={this.filterOption}
        onChange={onChange}
      >
        {createOptions(list)}
      </Select>
    );
  }
}

export default search;
