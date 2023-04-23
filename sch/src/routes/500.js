import React from 'react';
import { Result } from 'antd';

class Http500 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <Result status="500" title="500" subTitle="抱歉，服务器出错了." />;
  }
}

export default Http500;
