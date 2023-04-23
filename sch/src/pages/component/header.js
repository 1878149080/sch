import React from "react";
import { Avatar } from "antd";
import { PoweroffOutlined, UserOutlined } from "@ant-design/icons";
import { logout } from "../../services/app";
import { clearStorage } from "../../utils/localStorage";
import { getLoginPage } from "../../utils/logo/util";
import "./header.less";
import UpUserPassword from "./editPassword";
import { getLocalRole } from "../../utils/logo/roleBtn";

/*
 *  头部
 * */
class headers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // 修改密码弹窗是否显示
      visible: false,
    };
  }

  componentDidMount() {
    const checkPwd = localStorage.getItem('tsvcloud_checkPassword');
    if (checkPwd) {
      this.setState({ visible: true });
    } else {
      this.setState({ visible: false });
    }
  }

  // 退出登录
  handleLogout = (editPwd) => {
    logout();
    clearStorage();
    // 只有用户修改密码时，才会触发这个提示语
    if (typeof editPwd === 'boolean' && editPwd) {
      localStorage.setItem('jump_msg_type', 'success');
      localStorage.setItem('jump_msg_text', '密码修改成功！自动退出登录!');
    }
    getLoginPage();
  };

  // 跳转到个人中心
  handleUser = () => {
    getLocalRole();
    // alert('跳转到个人中心！ 该功能正在开发中。。。');
    this.setState({
      visible: true,
    });
  };

  render() {
    // 修改密码弹窗的props
    const upPwdProps = {
      handleLogout: this.handleLogout,
      handleCancel: () => {
        this.setState({
          visible: false,
        });
      },
    };

    return (
      <div className="header-box">
        {/*<Avatar className="userImg" icon={<UserOutlined />} />*/}
        <Avatar icon={<UserOutlined />} />
        <span className="userName">
          {localStorage.getItem('tsvcloud_realName')}
        </span>
        <UserOutlined onClick={this.handleUser} />
        <PoweroffOutlined onClick={this.handleLogout} />
        {this.state.visible && <UpUserPassword {...upPwdProps} />}
      </div>
    );
  }
}

export default headers;
