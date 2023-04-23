import React from 'react';
import { Button, Col, Form, Input, Row } from 'antd';
import { connect } from 'dva';
import md5 from 'js-md5';
import { logout } from '../../../../services/app';
import history from '../../../../utils/history';
import { clearStorage } from '../../../../utils/localStorage';

class index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmLoading: false, // 点击确认按钮之后的loading
    };
  }

  // 退出系统
  handlerSignOut() {
    logout();
    clearStorage();
    history.replace('/home');
  }

  onSearch = (params) => {
    const self = this;
    const { dispatch } = this.props;
    let user = {};
    user.pwd = md5(params['userPwd']);
    user.userId = localStorage.getItem('tsvcloud_userId');
    let oldPwd = md5(params['oldPwd']);

    this.setState({
      confirmLoading: true,
    });
    console.log('====================================');
    console.log('edit');
    console.log('====================================');

    dispatch({
      type: 'app/editUserPawd',
      payload: {
        user,
        oldPwd,
      },
      callback: function (states) {
        self.setState({
          confirmLoading: false,
        });
        if (states === 200) {
          self.setState({
            visible: false,
          });
          self.handlerSignOut();
        }
      },
    });
  };

  // 确认密码验证

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('userPwd')) {
      callback('两次密码不一致!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  // 确认密码验证

  render() {
    const self = this;
    const {
      form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
        // resetFields
      },
    } = this.props;

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 15 },
    };

    function handleSubmit(e) {
      e.preventDefault();
      validateFields((errors) => {
        if (errors) {
          return;
        }

        self.onSearch(getFieldsValue());
      });
    }

    return (
      <div className="account">
        <div className="box">
          <Form onSubmit={handleSubmit}>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="登录名" {...formItemLayout}>
                  {getFieldDecorator('userName', {
                    initialValue: localStorage.getItem('tsvcloud_userName'),
                  })(<Input disabled placeholder="请输入登录名" />)}
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item label="姓名" {...formItemLayout}>
                  {getFieldDecorator('realName', {
                    initialValue: localStorage.getItem('tsvcloud_realName'),
                  })(<Input disabled placeholder="请输入姓名" />)}
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item label="旧密码" {...formItemLayout}>
                  {getFieldDecorator('oldPwd', {
                    rules: [
                      {
                        required: true,
                        message: '请输入旧密码!',
                      },
                    ],
                  })(
                    <Input.Password
                      type="password"
                      placeholder="请输入旧密码"
                    />,
                  )}
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item label="新密码" {...formItemLayout}>
                  {getFieldDecorator('userPwd', {
                    rules: [
                      {
                        required: true,
                        message: '请输入新密码!',
                      },
                      {
                        validator: this.validateToNextPassword,
                      },
                    ],
                  })(
                    <Input.Password
                      type="password"
                      placeholder="请输入新密码"
                    />,
                  )}
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item label="确认密码" {...formItemLayout}>
                  {getFieldDecorator('userRePwd', {
                    rules: [
                      {
                        required: true,
                        message: '请输入确认新密码!',
                      },
                      {
                        validator: this.compareToFirstPassword,
                      },
                    ],
                  })(
                    <Input.Password
                      type="password"
                      placeholder="请输入确认新密码"
                      onBlur={this.handleConfirmBlur}
                    />,
                  )}
                </Form.Item>
              </Col>
              <Col span={24} style={{ textAlign: 'center' }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={this.state.confirmLoading}
                >
                  更新个人信息
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ app }) {
  return { app };
}

// export default Form.create()(index);
export default connect(mapStateToProps)(Form.create()(index));
