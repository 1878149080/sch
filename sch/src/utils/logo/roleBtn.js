import { Divider } from "antd";
import { getLoginPage } from "./util";

/**
 * @desc 判断用户是否有该权限
 * */
export function getLocalRole() {
  const logoState = isLogin();
  const bus_userId = localStorage.getItem('tsvcloud_userId') ?? '';
  const w_userId = window.__userId ?? '';

  if (logoState) {
    localStorage.setItem('jump_msg_type', 'warning');
    localStorage.setItem('jump_msg_text', '登录过期，请重新登录!');
    getLoginPage();
    return false;
  } else if (bus_userId && w_userId !== '' && bus_userId !== w_userId) {
    localStorage.setItem('jump_msg_type', 'warning');
    localStorage.setItem(
      'jump_msg_text',
      '用户已被切换，信息变更，请重新进入!',
    );
    getLoginPage();
    return false;
  }
  const admin = localStorage.getItem('tsvcloud_isAdmin') === 'true';
  const permissionBtn = JSON.parse(
    localStorage.getItem('tsvcloud_perssionBtn') || '[]',
  );
  return {
    admin,
    permissionBtn,
  };
}

export function getUserRoleBtn(btnList) {
  const { admin = false, permissionBtn = [] } = getLocalRole();
  if (admin) {
    return createBtnGroup(btnList);
  } else {
    const filterBtn = filterRoleBtn(permissionBtn, btnList);
    return createBtnGroup(filterBtn);
  }
}

// 根据权限过滤按钮
function filterRoleBtn(permissionBtn = [], btnList = []) {
  return btnList.filter((item) => {
    const { role } = item;
    return (
      typeof role === 'undefined' ||
      (Array.isArray(role) && getBtnState(role, permissionBtn)) ||
      permissionBtn.indexOf(role) > -1
    );
  });
}

// 一个按钮位置，可能会出现多个不可共存的状态。 比如：进行中、成功、失败
function getBtnState(role = [], permissionBtn = []) {
  // 如果存在一种状态，则是存在，并给予宽度。 否则不给予
  let isWidth = false;
  role.forEach((item) => {
    if (permissionBtn.indexOf(item) > -1) {
      isWidth = true;
    }
  });
  return isWidth;
}

// 根据btn数组，生成dom元素，非首位的增加分隔符
function createBtnGroup(btnList = []) {
  return btnList.map((item, index) => {
    return index === 0 ? (
      item.template
    ) : (
      <span>
        <Divider type="vertical" />
        {item.template}
      </span>
    );
  });
}

// 根据权限判断宽度
export function getColumnWidth(widthList) {
  const { admin = false, permissionBtn = [] } = getLocalRole();
  if (admin) {
    return getWidth(widthList);
  } else {
    const filterBtn = filterRoleBtn(permissionBtn, widthList);
    return getWidth(filterBtn);
  }
}

// 计算所有按钮的宽度
function getWidth(widthList = []) {
  let widths = 8;
  widthList.map((item, index) => {
    const { width } = item;
    widths = index === 0 ? widths + width : widths + width + 18;
  });
  return widths;
}

// 表格表头，过滤操作列
export function filterColumn(data = []) {
  const operating = data[data.length - 1];
  return operating.width === 8 ? data.slice(0, data.length - 1) : data;
}

/**
 * @desc 控制表格工具栏按钮权限
 * */
export function getRoleBarBtn(btnList = []) {
  const { admin = false, permissionBtn = [] } = getLocalRole();
  if (admin) {
    return btnList;
  } else {
    return filterRoleBtn(permissionBtn, btnList);
  }
}

/**
 * @desc 如果登录状态被取消，则跳转到登录页
 * */
function isLogin() {
  const logoState = localStorage.getItem('tsvcloud_logined') !== 'true';
  return logoState;
}
