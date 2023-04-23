import React from 'react';
import { Result } from 'antd';

class http404 extends React.Component {
  // constructor(props) {
  //     super(props);
  //     this.state = {};
  // }

  render() {
    return (
      <Result status="404" title="404" subTitle="抱歉，你访问的页面不存在." />
    );
  }
}

export default http404;
