import React from 'react';
import { Result } from 'antd';

class Http403 extends React.Component {
  // constructor(props) {
  //     super(props);
  //     this.state = {};
  // }

  render() {
    return (
      <Result status="403" title="403" subTitle="抱歉，你无权访问该页面." />
    );
  }
}

export default Http403;
