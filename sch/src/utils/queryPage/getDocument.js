/**
 * @desc 获取组件内部高度
 * @author 吴昊 2021-03-16
 * */

export function getBodyHeight() {
  let bodyHeight = document.body.offsetHeight;
  let headerHeight = getDomArrOffsetHeight('ant-layout-header');
  let tabsHeight = getDomArrOffsetHeight('qyhd-tabs');
  return bodyHeight - headerHeight - tabsHeight;
}

function getDomArrOffsetHeight(classStr) {
  const DomObject = document.getElementsByClassName(classStr);
  return DomObject && DomObject[0] ? DomObject[0].offsetHeight : 0;
}

function getDomIdOffsetHeight(id) {
  const DomObject = document.getElementById(id);
  return DomObject ? DomObject.offsetHeight : 0;
}

/**
 * @desc 获取表格高度
 * @author 吴昊 2021-03-16
 * */
export function getRootHeight() {
  let rootHeight = getDomIdOffsetHeight('root');
  let headerHeight = getDomArrOffsetHeight('ant-layout-header');
  let tabsHeight = getDomArrOffsetHeight('qyhd-tabs');
  return {
    rootHeight,
    headerHeight,
    tabsHeight,
  };
}

/**
 * @desc 表格高度自适应
 * @param uniqueName 唯一值，不得重复
 * @param setTableHeight 窗口变动后重新计算的事件
 * */
export function handleRootHeight(uniqueName, setTableHeight) {
  if (window[uniqueName]) clearTimeout(window[uniqueName]);
  window[uniqueName] = setTimeout(() => {
    setTableHeight();
  }, 100);
}

/**
 * @desc 添加浏览器窗口监听事件
 * @param uniqueName 唯一值，不得重复
 * @param setTableHeight 窗口变动后重新计算的事件
 * */
export function addWindowSize(uniqueName, setTableHeight) {
  window.addEventListener('resize', function () {
    handleRootHeight(uniqueName, setTableHeight);
  });
}

/**
 * @desc 移除浏览器窗口监听事件
 * @param uniqueName 唯一值，不得重复
 * @param setTableHeight 窗口变动后重新计算的事件
 * */
export function removeWindowSize(uniqueName, setTableHeight) {
  window.removeEventListener('resize', function () {
    handleRootHeight(uniqueName, setTableHeight);
  });
}
