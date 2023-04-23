/**
 * @desc 这里定义多个颜色
 * @author 吴昊 2020/3/11
 */
function getOrgOption() {
  const orgId = Number(localStorage.getItem('tsvcloud_orgId'));
  const orgName = localStorage.getItem('tsvcloud_orgName');
  const districtId = Number(localStorage.getItem('tsvcloud_districtId'));
  const isSys = localStorage.getItem('tsvcloud_isSys');
  return [
    {
      orgId: orgId,
      name: orgName,
      children: null,
      title: orgName,
      value: orgId,
      key: orgId,
      districtId: districtId,
      isSys: isSys,
    },
  ];
}

export { getOrgOption };
