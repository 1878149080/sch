import React from 'react';
import { connect } from 'dva';
import { Button, Form, Input, message } from 'antd';
import styles from './login.less';

class loginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      logined: sessionStorage.getItem('logined') ? true : false,
      name: '',
      pwd: '',
    };
  }

  componentWillMount() {
    if (this.state.logined) {
      const { history } = this.props;
      setTimeout(() => {
        history.replace('/');
      }, 0);
    }
  }

  // componentDidMount() {}

  restButtonState(self) {
    self.setState({
      loading: false,
    });
  }

  logoIn(self) {
    const { history, dispatch } = this.props;
    const { name: nameText, pwd: pwdText } = this.state;
    let name = null,
      passwd = null;
    if (nameText) {
      name = nameText;
    } else {
      message.error('用户名未填写！');
      self.restButtonState(self);
      return false;
    }
    if (pwdText) {
      passwd = pwdText;
    } else {
      message.error('密码未填写！');
      self.restButtonState(self);
      return false;
    }

    if (name === 'admin' && passwd === 'qyhd123456') {
      dispatch({
        type: 'app/logins',
        payload: {
          username: name,
          password: passwd,
        },
        callback: (states) => {
          self.setState({
            loading: false,
          });
          if (states) {
            // alert("跳转")
            history.replace('/');
          }
        },
      });
    } else {
      message.error('账号或者密码错误！');
      self.setState({
        loading: false,
      });
    }
  }

  render() {
    let _this = this;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 15 },
    };

    document.onkeyup = (e) =>
      e.keyCode === 13 && document.getElementById('btnLogin') && handleOk();

    function handleOk() {
      _this.setState({
        loading: true,
      });
      _this.logoIn(_this);
    }

    return (
      <div className={styles.bodys}>
        <div className={styles.form}>
          {/*<img*/}
          {/*  src={require('../images/logo.png')}*/}
          {/*  style={{ position: 'fixed', bottom: '30px', right: '30px' }}*/}
          {/*/>*/}
          <div className={styles.loginH1}>车路协同系统(内部)</div>
          <form>
            <Form.Item
              {...formItemLayout}
              name="userName"
              label="用户名"
              rules={[
                {
                  required: false,
                  message: '请输入用户名！',
                },
              ]}
            >
              <Input
                size="large"
                placeholder="请输入用户名"
                onChange={(e) => {
                  this.setState({
                    name: e.target.value,
                  });
                }}
              />
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              name="userPwd"
              label="密码"
              rules={[
                {
                  required: false,
                  message: '请输入密码！',
                },
              ]}
            >
              <Input
                size="large"
                type="password"
                placeholder="请输入密码"
                onChange={(e) => {
                  this.setState({
                    pwd: e.target.value,
                  });
                }}
              />
            </Form.Item>
            <div className={styles.dengLu}>
              <Button
                id="btnLogin"
                type="primary"
                size="large"
                loading={this.state.loading}
                onClick={handleOk}
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

function mapStateToProps({ guiZe }) {
  return { guiZe };
}

export default connect(mapStateToProps)(loginPage);
