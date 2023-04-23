/**
 * @desc 角色按钮控制
 * @author 吴昊
 * */

export function filterRoleBtn(list = []) {
  return list.filter((item) => isBtn(item.condition));
}

function isBtn(condition) {
  if (typeof condition === 'undefined') return true;
  const { isAdmin, perssionBtn } = userRole();
  return isAdmin === 'true' || perssionBtn.indexOf(condition) > -1
    ? true
    : false;
}

function userRole() {
  const isAdmin = localStorage.getItem('tsvcloud_isAdmin') || '';
  const perssionBtn =
    JSON.parse(localStorage.getItem('tsvcloud_perssionBtn')) || [];
  return {
    isAdmin,
    perssionBtn,
  };
}
