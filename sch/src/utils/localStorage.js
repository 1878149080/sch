export function clearStorage() {
  localStorage.removeItem('tsvcloud_logined');
  localStorage.removeItem('tsvcloud_userId');
  localStorage.removeItem('tsvcloud_orgId');
  localStorage.removeItem('tsvcloud_orgName');
  localStorage.removeItem('tsvcloud_userName');
  localStorage.removeItem('tsvcloud_realName');
  localStorage.removeItem('tsvcloud_isAdmin');
  localStorage.removeItem('tsvcloud_menuTree');
  localStorage.removeItem('tsvcloud_perssionBtn');
  localStorage.removeItem('tsvcloud_districtId');
  localStorage.removeItem('tsvcloud_isSys');
  localStorage.removeItem('tsvcloud_token');
  localStorage.removeItem('tsvcloud_loginTime');
  localStorage.removeItem('tsvcloud_systemName');
  localStorage.removeItem('tsvcloud_defaultTabs');
  localStorage.removeItem('tsvcloud_defaultMenuKey');
  localStorage.removeItem('refreshState');
  localStorage.removeItem('tsvcloud_checkPassword');
  localStorage.setItem('logout', 'true');
}
