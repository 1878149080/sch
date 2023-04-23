import React from "react";
import { connect } from "dva";
// import { message, Button } from 'antd';
// import md5 from 'js-md5';
import { withRouter } from "react-router-dom";
import "./home.less";
import Account from "./account";
import PList from "./list";
import Conpyright from "./copyright";

/**
 * 项目主页
 * */
class QyHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // loading: false,
      logined: window.localStorage.getItem('tsvcloud_logined'),
      userName: window.localStorage.getItem('tsvcloud_realName'),
    };
  }

  componentDidMount() {
    // this.setState({
    //   userName:
    // });
  }

  componentWillMount() {
    // window.qyhdSelf = this;
    // window.logoutNum = false;
    // if (this.state.logined) {
    //   this.props.history.replace('/');
    // }
  }

  render() {
    const { logined, userName } = this.state;
    return (
      <div id="qy-home" className="qy-home">
        <div className="qy-home-content"></div>
        <div className="qy-banner">
          {logined && (
            <div className="qy-head-btn">
              <div className="qy-user-name">HI，欢迎{userName}登录</div>
              <div className="qy-notice">
                <span className="iconfont icon-lingdang-xianxing" />
              </div>
              <div className="qy-account">
                <Account />
              </div>
            </div>
          )}

          {/*<div className="qy-banner-bg-text">PORTAL WEBSITF</div>*/}
          <div className="qy-banner-head-text">公交大脑统一登录门户</div>
        </div>

        <div className="qy-home-tools">
          <div className="qy-home-tools-name">
            <span>快捷</span>
            <span>工具</span>
          </div>
          <div className="qy-home-tools-list">
            <ul>
              <li>
                <div className="qy-home-tools-list-icon">
                  <span className="iconfont icon-ditushanjian" />
                </div>
                <div className="qy-home-tools-list-name">下载中心</div>
              </li>
              <li>
                <div className="qy-home-tools-list-icon">
                  <span className="iconfont icon-ditushanjian" />
                </div>
                <div className="qy-home-tools-list-name">下载中心</div>
              </li>
              <li>
                <div className="qy-home-tools-list-icon">
                  <span className="iconfont icon-ditushanjian" />
                </div>
                <div className="qy-home-tools-list-name">下载中心</div>
              </li>
              <li>
                <div className="qy-home-tools-list-icon">
                  <span className="iconfont icon-ditushanjian" />
                </div>
                <div className="qy-home-tools-list-name">下载中心</div>
              </li>
              <li>
                <div className="qy-home-tools-list-icon">
                  <span className="iconfont icon-ditushanjian" />
                </div>
                <div className="qy-home-tools-list-name">下载中心</div>
              </li>
              <li>
                <div className="qy-home-tools-list-icon">
                  <span className="iconfont icon-ditushanjian" />
                </div>
                <div className="qy-home-tools-list-name">下载中心</div>
              </li>
              <li>
                <div className="qy-home-tools-list-icon">
                  <span className="iconfont icon-ditushanjian" />
                </div>
                <div className="qy-home-tools-list-name">下载中心</div>
              </li>
              <li>
                <div className="qy-home-tools-list-icon">
                  <span className="iconfont icon-ditushanjian" />
                </div>
                <div className="qy-home-tools-list-name">下载中心</div>
              </li>
              <li>
                <div className="qy-home-tools-list-icon">
                  <span className="iconfont icon-ditushanjian" />
                </div>
                <div className="qy-home-tools-list-name">下载中心</div>
              </li>
              <li>
                <div className="qy-home-tools-list-icon">
                  <span className="iconfont icon-ditushanjian" />
                </div>
                <div className="qy-home-tools-list-name">下载中心</div>
              </li>
            </ul>
          </div>
        </div>

        <PList logined={logined} />

        <Conpyright />
      </div>
    );
  }
}

function mapStateToProps({ app }) {
  return { app };
}

export default connect(mapStateToProps)(withRouter(QyHome));
