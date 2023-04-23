import React from 'react';

/***
 * @desc 车云基础平台路由
 * */

/** 基础信息 **/
const Organization = React.lazy(() =>
  import('../../pages/system/permissions/organization/index'),
);
const Theme = React.lazy(() =>
  import('../../pages/system/permissions/theme/index'),
);
const Role = React.lazy(() =>
  import('../../pages/system/permissions/role/index'),
);
const User = React.lazy(() =>
  import('../../pages/system/permissions/user/index'),
);
// 系统通用
const Http403 = React.lazy(() => import('../../routes/403'));
const Http404 = React.lazy(() => import('../../routes/404'));
const Http500 = React.lazy(() => import('../../routes/500'));
// 欢迎页
const Welcome = React.lazy(() => import('../../pages/Welcome/index'));

const UserManage = React.lazy(() => import('../../pages/userManage/index'));
const Comic = React.lazy(() => import('../../pages/comic/index'));



/** 基础信息 **/

export const base = {
  // 基础信息 - 权限和用户
  // 组织机构管理
  // '/Organization': Organization,
  '/Organization': Comic,
  // 菜单管理
  '/Theme': Theme,
  // 角色管理
  '/Role': Role,
  // 用户管理
  '/User': User,

  // 个人中心
  // '/Account': Account,
  // 欢迎页
  '/Welcome': Welcome,

  '/userManage': UserManage,
  '/comic': Comic,


  // 权限相关的错误
  '/403': Http403,
  '/404': Http404,
  '/500': Http500,
};
