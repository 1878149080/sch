/**
 * @desc 这里定义多个提示语
 * @author 吴昊 2020/3/11
 */

import { message } from "antd";

/**
 * @method addEditSuccess  添加/编辑功能的成功提示语
 * @param {Object} modalsList 判断是否是编辑状态
 * @author 吴昊 2020/3/11
 */
const addEditSuccess = (modalsList) => {
  if (modalsList) {
    message.success('编辑成功!');
  } else {
    message.success('添加成功!');
  }
};

/**
 * @method addEditError  添加/编辑功能的失败提示语
 * @param {Object} modalsList  判断是否是编辑状态
 * @param {Object} data 接口返回的错误信息
 * @author 吴昊 2020/3/11
 */
const addEditError = (modalsList, data) => {
  if (modalsList) {
    // message.error('编辑失败！' + data.message);
  } else {
    // message.error('添加失败！' + data.message);
  }
};

export { addEditSuccess, addEditError };
