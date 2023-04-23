import React from 'react';
import { Spin } from 'antd';

export default () => {
  return <Spin className="page-spin" tip="正在加载页面中..." />;
};
