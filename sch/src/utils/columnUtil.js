/**
 * 表头工具
 * */

/**
 * @desc 普通文本，判断空值
 * @吴昊
 */
export function textIsNull(text) {
  return [null, 'null', ''].indexOf(text) === -1 ? text : '--';
}

/**
 * @desc render方法  普通文本，判断空值
 * @吴昊
 */
export const renderTextIsNull = {
  render(text) {
    return textIsNull(text);
  },
};

/**
 * @desc 转换百分比
 * @吴昊
 */
export function textTurnPer(text) {
  return text !== null ? (text * 100).toFixed(2) + '%' : '--';
}

/**
 * @desc render方法  转换百分比
 * @吴昊
 */
export const renderTextTurnPer = {
  render(text) {
    return textTurnPer(text);
  },
};

/**
 * @desc 排序
 * @吴昊
 */
export function sortOrders(strs, sortOrder) {
  if (sortOrder.indexOf(strs) > -1) {
    if (sortOrder.indexOf('ascend') > -1) {
      return 'ascend';
    } else if (sortOrder.indexOf('descend') > -1) {
      return 'descend';
    } else {
      return false;
    }
  } else {
    return false;
  }
}
