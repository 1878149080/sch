import React from 'react';
import Icon from '../images/system/403.png';
import { Result } from 'antd';

const Http403 = () => {
  return (
    <Result
      icon={<img src={Icon} alt="错误代码403的图片" />}
      title="抱歉，你无权访问该页面."
    />
  );
};

export default Http403;
