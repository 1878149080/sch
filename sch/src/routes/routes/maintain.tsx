import React from 'react';
// import { history } from 'umi';
// @ts-ignore
import { clearStorage } from '../utils/localStorage';
// @ts-ignore
import { getLoginPage } from '../utils/logo/util';

class Index extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      times: 5,
    };
  }

  componentDidMount() {
    // @ts-ignore
    window['mainnTainTimes'] = setInterval(() => {
      // @ts-ignore
      const surplusTime = this.state.times - 1;
      if (surplusTime >= 0) {
        this.setState({
          times: surplusTime,
        });
      } else {
        // @ts-ignore
        clearInterval(window['mainnTainTimes']);
        clearStorage();
        // history.replace('/home');
        getLoginPage();
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearStorage();
    // @ts-ignore
    clearInterval(window['mainnTainTimes']);
  }

  // 主动跳转到登录页
  handleAActionLogin = () => {
    getLoginPage();
    // history.replace('/');
  };

  render() {
    const { times }: any = this.state;
    return (
      <div className="maintainBox">
        <div className="maintain" />
        <div className="textBox">
          <div>
            <b>{times}秒</b>后跳到登录页。
          </div>
          <div>
            如未自动跳转，则点击<a onClick={this.handleAActionLogin}>登录页</a>
            跳转！
          </div>
        </div>
      </div>
    );
  }
}

export default Index;
