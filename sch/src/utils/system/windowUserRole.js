/**
 * @desc 当浏览器标签页被打开时，需要判断用户是否更换，用户是否退出
 * */

// 1。 判断页面状态为显示
import { getLoginPage } from "../logo/util";

// 逻辑判断
function isWindowTabVisible() {
  const tabVisible = document.hidden;
  console.log('页面是否隐藏', tabVisible);
  if (!tabVisible) {
    // 如果页面不隐藏，则判断用户权限是否变更，用户是否退出
    const bus_userId = localStorage.getItem('tsvcloud_userId') ?? '';
    const w_userId = window.__userId ?? '';
    // console.log("页面是否隐藏  localStorage", localStorage);
    // console.log("页面是否隐藏  localStorage || ''", bus_userId);
    // console.log("页面是否隐藏   window.__userId", w_userId);
    if (bus_userId) {
      if (w_userId !== '' && bus_userId !== w_userId) {
        // 用户变更
        document.removeEventListener('visibilitychange', isWindowTabVisible);
        localStorage.setItem('jump_msg_type', 'warning');
        localStorage.setItem(
          'jump_msg_text',
          '用户已被切换，信息变更，请重新进入!',
        );
        getLoginPage();
      }
    } else if (!bus_userId) {
      // 用户退出登录，需要跳转到登录页面
      document.removeEventListener('visibilitychange', isWindowTabVisible);
      localStorage.setItem('jump_msg_type', 'warning');
      localStorage.setItem('jump_msg_text', '用户已退出，自动跳转到门户登录!');
      getLoginPage();
    }
  }
}

export function addTabChange() {
  document.addEventListener('visibilitychange', isWindowTabVisible);
}
