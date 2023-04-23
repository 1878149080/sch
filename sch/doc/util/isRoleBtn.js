/**
 * @desc 校验按钮权限是否冲突
 * **/

// 判断数组是否有重复值
const isRepeat = (arr) => {
  const hash = {};
  for (const i in arr) {
    const { perms } = arr[i];
    if (hash[perms]) {
      console.log('当前数组有重复值：', arr[i]);
      return true;
    }
    hash[perms] = true;
  }
  console.log('当前数组无重复值');
  return false;
};

/** 常规公交 **/
const changGui = [
  {
    // 页面名称
    pageName: '测试页面的名称',
    // 功能名称
    name: '导出',
    // 功能权限
    perms: 'test:testPage:export',
  },
];

/** BRT智能驾驶 **/
const brt = [{
  // 页面名称
  pageName: '柔性编队',
  // 功能名称
  name: '柔性编队',
  // 功能权限
  perms: 'tbrt:speed:flexibleFormation:format',
},];

/** 公交专用道 **/
const bus = [];

// 合并数组
const dataList = [...changGui, ...brt, ...bus];

isRepeat(dataList);
