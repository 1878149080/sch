import React from 'react';
import { history } from 'umi';
import { connect } from 'dva';
import { Button, message } from 'antd';
import md5 from 'js-md5';
// import { name } from '../utils/config';

class loginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      logined: window.localStorage.getItem('tsvcloud_logined') ? true : false,
    };
  }

  componentWillMount() {
    window.qyhdSelf = this;
    window.logoutNum = false;
    if (this.state.logined) {
      history.replace('/');
    }
  }

  restButtonState(self) {
    self.setState({
      loading: false,
    });
  }

  // 登录事件
  hanOk(e) {
    this.setState({
      loading: true,
    });
    const self = this;
    let name = document.getElementById('userName').value;
    let pwd = document.getElementById('userPwd').value;
    if (!name) {
      message.error('用户名未填写！');
      self.restButtonState(self);
      return false;
    }
    if (pwd) {
      pwd = md5(md5(md5(pwd)));
    } else {
      message.error('密码未填写！');
      self.restButtonState(self);
      return false;
    }

    const { dispatch } = this.props;
    dispatch({
      type: 'app/logins',
      payload: {
        user: {
          name,
          pwd,
        },
      },
      callback: (states) => {
        self.setState({
          loading: false,
        });
        if (states) {
          history.replace('/');
        }
      },
    });
  }

  render() {
    const { loading } = this.state;
    document.onkeyup = (e) =>
      e.keyCode === 13 && document.getElementById('btnLogin') && this.hanOk();

    return (
      <div className="login">
        <div className="right">
          <img src={require('../images/login/logo.png')} className="logoImg" />
          <div className="logoName">{name}</div>
        </div>
        <div className="left">
          <div className="hi">
            <div>Hi,</div>
            <div>欢迎登录</div>
          </div>
          <div className="busName">{name}</div>
          <form>
            <div className="loginBox">
              <div className="loginName">用户名</div>
              <div className="name">
                <input
                  type="text"
                  style={{ border: 'none' }}
                  placeholder="请输入您的用户名"
                  id="userName"
                />
              </div>
              <div className="hengXian" />
              <div className="miMa">密码</div>
              <div className="loginMiMa">
                <input
                  type="password"
                  style={{ border: 'none' }}
                  placeholder="请输入您的密码"
                  id="userPwd"
                />
              </div>
              <div className="hengXian" />
              {/*
                        <div className="code">
                         验证码
                        </div>
                        <div className="loginCode">
                        <input type="text" style={{border: "none"}} placeholder="请输入您的验证码" />
                        </div>
                        <div className="hengXian"></div> */}
              <Button
                id="btnLogin"
                // className={this.state.loading ? "clickButton" : "loginButton"}
                className="loginButton"
                onClick={this.hanOk.bind(this)}
                loading={loading}
              >
                登录
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ app }) {
  return { app };
}

export default connect(mapStateToProps)(loginPage);
