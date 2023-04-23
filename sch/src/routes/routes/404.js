import React from 'react';
import Icon from '../images/system/404.png';
import { Result } from 'antd';

const Http404 = () => {
  return (
    <Result
      icon={<img src={Icon} alt="错误代码404的图片" />}
      title="抱歉，你访问的页面不存在."
    />
  );
};

export default Http404;
