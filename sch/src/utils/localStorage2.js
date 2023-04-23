export function clearStorage() {
  localStorage.removeItem('school_logined');
  localStorage.removeItem('school_loginTime');
  localStorage.removeItem('school_loginTime');
  localStorage.removeItem('school_token');
  localStorage.removeItem('school_userName');
  localStorage.removeItem('school_userId');
  localStorage.removeItem('school_role');
  localStorage.removeItem('school_roleName');
  localStorage.removeItem('school_createTime');
  localStorage.removeItem("school_logout");
  localStorage.removeItem("school_head");
}

export function setStorage(res = {}) {
  const { time, data } = res;
  const userInfo = data.loginSysUserVo;
  localStorage.setItem('school_logined', "true");
  localStorage.setItem('school_loginTime', time);
  localStorage.setItem('school_token', data.token);
  localStorage.setItem('school_userName', userInfo.username);
  localStorage.setItem('school_userId', userInfo.id);
  localStorage.setItem('school_role', userInfo.roleId);
  localStorage.setItem('school_roleName', userInfo.roleName);
  localStorage.setItem('school_createTime', userInfo.createTime);
  localStorage.setItem("school_logout", "false");
  localStorage.setItem("school_head", userInfo.head);
}
