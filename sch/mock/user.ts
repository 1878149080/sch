
const menu = {
  "menuId": 1,
  "menuName": "系统管理",
  "menuLevel": 1,
  "menuParId": null,
  "menuType": "root",
  "menuIndex": 1,
  "menuRemark": "系统管理",
  "menuAddr": null,
  "isInvalid": false,
  "icon": null,
  "perssionType": 0,
  "permissionCode": null,
  "children": [
    {
      "menuId": 68,
      "menuName": "数字化串线",
      "menuLevel": 2,
      "menuParId": 1,
      "menuType": null,
      "menuIndex": 2,
      "menuRemark": null,
      "menuAddr": "/Operate",
      "isInvalid": false,
      "icon": null,
      "perssionType": 0,
      "permissionCode": null,
      "children": null,
      "hasChildren": null
    }

  ]
};

/**
 * 用户相关
 * */
export default {
  // 登录
  'POST /1system/auth/user/login': {
    "statusCode": 200,
    "content": {
      "realName": "admin",
      "orgName": "厦门公交",
      "districtId": 1,
      "isAdmin": false,
      "userName": "admin",
      "userId": "17",
      "isSys": true,
      "orgId": 1,
      "menuTree": [menu],
      "token": "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyTmFtZSI6Ind1aGFvIiwiZXhwIjoxNjIxOTk0MTM5LCJ1c2VySWQiOjE3LCJpYXQiOjE2MjE5MDc3MzksIm9yZ0lkIjoxfQ.sbxJaOSowl9vKICUwp6o0WFZPWSEDfkfAD11la9jmAY"
    }
  },
  // 获取该线路下的参数配置信息
  'POST /system/auth/menu/getMenuByUserId': {
    statusCode: 200,
    content: [menu],
    message: '查询成功',
  },
};
