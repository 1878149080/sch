import { PRD_IP } from "../../../utils/logo/util";

/***
 * @desc 判断菜单文字是否超出隐藏
 * */
export function isTextOverflow(e) {
  const box = e?.currentTarget?.querySelector('.qyhd-antd-menu-title-box');
  const { clientWidth, clientHeight, scrollWidth, scrollHeight } = box || {};
  // const isOver = clientWidth === scrollWidth && clientHeight === scrollHeight;
  const isOver = clientWidth === scrollWidth;
  if (!isOver) {
    box.className =
      String(box.className || '') + ' qyhd-antd-menu-title-box-ani';
  }
}

export function mouseOut(e) {
  const box = e?.currentTarget?.querySelector('.qyhd-antd-menu-title-box');
  // const { clientWidth, clientHeight, scrollWidth, scrollHeight } = box || {};
  // const isOver = clientWidth === scrollWidth && clientHeight === scrollHeight;
  // if(!isOver){
  box.className = String(box.className || '').replace(
    ' qyhd-antd-menu-title-box-ani',
    '',
  );
  // }
}

// 自定义展开收起图标
export function expandIcon(props) {
  const { isSubMenu, isOpen } = props;
  if (isSubMenu) {
    if (isOpen) {
      return <span className="iconfont icon-xiangshang1 menu-submenu-arrow" />;
    } else {
      return <span className="iconfont icon-xiangxia1 menu-submenu-arrow" />;
    }
  } else {
    return null;
  }
}

// 获取默认的图标
export function getDefaultIcon(text = undefined) {
  return text ? text : ' icon-bohuiyuanyinguanli';
}

// 判断是生产环境
export function isPRD() {
  const hostname = window.location.hostname;
  return hostname.indexOf(PRD_IP) > -1;
}
