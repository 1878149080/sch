import React from 'react';
import md5 from 'js-md5';
import './logoin.less';
import CaptchaMini from './code/vCode';
import { connect } from 'dva';
import { Button } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { getIsValue } from './util';
import { history } from 'umi';

class loginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      logined: window.localStorage.getItem('tsvcloud_logined'),
      captcha: null,
      errorInfo: '',
    };
  }

  componentDidMount() {
    // dom加载完之后，需要展示验证码
    let captcha2 = new CaptchaMini({
      lineNum: 0, //线条数量
      dotNum: 0, //点的数量
      fontSize: 14, //字体大小
      fontFamily: ['Georgia', '微软雅黑', 'Helvetica', 'Arial'], //字体类型
      fontStyle: 'fill', //字体绘制方法，有fill和stroke
      length: 4, //验证码长度
    });
    captcha2.draw(document.querySelector('#captcha'), (r) => {
      // console.log(r, '验证码2');
    });
    this.setState({
      captcha: captcha2,
    });
  }

  // componentWillMount() {
  //   window.qyhdSelf = this;
  //   window.logoutNum = false;
  //   if (this.state.logined) {
  //     // this.props.history.replace('/');
  //     history.replace('/');
  //   }
  // }

  restButtonState = (errorInfo = '') => {
    this.setState({
      loading: false,
      errorInfo,
    });
  };

  // 登录事件
  hanOk = () => {
    const { isLogo, name, pwd } = getIsValue({
      restButtonState: this.restButtonState,
      captchaText: this.state.captcha?.getCode(),
    });
    // 当校验未通过，进行错误提示，并打断流程
    if (!isLogo) {
      this.state.captcha?.drawAgain();
      return false;
    }

    this.setState({
      loading: true,
    });

    const { dispatch } = this.props;
    dispatch({
      type: 'app/logins',
      payload: {
        user: {
          name,
          pwd: md5(pwd),
        },
      },
      callback: (states, errorInfo = '') => {
        this.setState({
          loading: false,
          errorInfo,
        });
        if (states) {
          this.props.setLoginModal(false);
          this.props.openUrl();
          history.go('/');
        }
      },
    });
  };

  render() {
    const { loading } = this.state;
    document.onkeyup = (e) =>
      e.keyCode === 13 && document.getElementById('btnLogin') && this.hanOk();

    return (
      <div className="qy-login">
        <form>
          <div className="qy-login-position">
            <div className="qy-login-position-box">
              <span className="loginName">
                <span className="iconfont icon-renwu-ren" />
              </span>
              <span className="name">
                <input
                  type="text"
                  placeholder="请输入用户名"
                  id="userName"
                  maxLength={20}
                />
              </span>
            </div>

            <div className="qy-login-position-box">
              <span className="miMa">
                <span className="iconfont icon-suo" maxLength={20} />
              </span>
              <span className="loginMiMa">
                <input type="password" placeholder="请输入密码" id="userPwd" />
              </span>
            </div>

            <div className="qy-login-position-box">
              <span className="code">
                <span className="iconfont icon-pinglun" />
              </span>
              <span className="loginCode">
                <input
                  id="code"
                  type="text"
                  placeholder="验证码"
                  maxLength={4}
                />
                <span className="qy-login-position-box-captcha">
                  <canvas width="74" height="22" id="captcha" />
                </span>
              </span>
            </div>

            <Button
              id="btnLogin"
              // className={this.state.loading ? "clickButton" : "loginButton"}
              className="loginButton"
              onClick={this.hanOk.bind(this)}
              loading={loading}
            >
              登录
            </Button>

            {this.state.errorInfo && (
              <div className="qy-login-error">
                <ExclamationCircleFilled />
                <span className="info">{this.state.errorInfo}</span>
              </div>
            )}
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ app }) {
  return { app };
}

export default connect(mapStateToProps)(loginPage);
