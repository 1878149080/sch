/**
 * 获取页面宽和高，设置弹窗的宽和高，不能超过中间区域， 上下左右各40
 * */
export function getModalInfo(w = 1366, hg = 500) {
  const h = w < 1450 ? 450 : hg;
  const { offsetHeight = h, offsetWidth = w } = getDomIdOffset('root');
  // const height = offsetHeight - 72 - 40 - 39;
  // const height = offsetHeight - 270;
  const height = offsetHeight - 230;
  return {
    width: offsetWidth - 260 - 80,
    height: offsetHeight < h ? h : height < h ? h : height,
  };
}

function getDomIdOffset(id) {
  const DomObject = document.getElementById(id);
  if (DomObject) {
    return {
      offsetHeight: DomObject.offsetHeight,
      offsetWidth: DomObject.offsetWidth,
    };
  } else {
    return {};
  }
}
