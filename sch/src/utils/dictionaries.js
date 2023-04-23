/**
 * 前端自定义字典表
 * */
import { Select } from 'antd';

const { Option } = Select;

// 401、403。models不能作为提示用使用，需要跳转到登录页面
const httpErrFilter = [401, 422];

// 生成通用的下拉数据
function createOptions(list = []) {
  return list.map((item, index) => {
    // 判断是正常的json，还是字符串
    if (typeof item !== 'object') {
      return (
        <Option value={item} key={item + index}>
          {item}
        </Option>
      );
    } else {
      return (
        // <Option value={item.value} key={item.name + item.value + index}>
        <Option value={item.value} key={item.value + index + item.name}>
          {item.name}
        </Option>
      );
    }
  });
}

// 处理小数点精度
function isFloat(nums) {
  const num = window.parseFloat(nums);
  return num ? num.toFixed(2) : 0;
}

export { createOptions, isFloat, httpErrFilter };
