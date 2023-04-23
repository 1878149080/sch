import React from 'react';
import { Result } from 'antd';

const Http500 = () => {
  return <Result status="500" title="500" subTitle="抱歉，服务器出错了." />;
};

export default Http500;
