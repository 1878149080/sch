/**
 * 系统列表
 * @author 吴昊
 * **/
import React, { useState } from 'react';
import { Col, Row } from 'antd';
import IMg from '../../images/login/images1.png';
import Logoin from './login';

const PList = (props) => {
  // 登录弹窗开启状态
  const [loginModal, setLoginModal] = useState(false);
  // 要登录的地址
  const [urlStr, setUrlStr] = useState('');

  // 点击系统
  const onClick = (url) => {
    const logoState = isLogin();
    if (logoState) {
      openUrl(url);
    } else {
      toLogin(url);
    }
    // setLogin(logoState);
  };

  // 判断是否登录
  const isLogin = () => {
    return !!window.localStorage.getItem('tsvcloud_logined');
  };

  // 如果登录，用新标签页打开该系统
  const openUrl = (url = '') => {
    window.open(url, '_blank');
  };

  // 未登录，则弹出登录窗口
  const toLogin = (url) => {
    setLoginModal(true);
    setUrlStr(url);
  };

  return (
    <div className="qy-home-p-list">
      <Row gutter={20}>
        <Col xxl={4} xl={6}>
          <div
            className="qy-home-p-list-box"
            onClick={() => {
              onClick(window.location.host + '/bus_brain/');
            }}
          >
            <div className="qy-home-p-list-box-logo">
              <img src={IMg} alt="" />
            </div>
            <div className="y-home-p-list-box-name">综合智慧系统</div>
          </div>
        </Col>
        <Col xxl={4} xl={6}>
          <div className="qy-home-p-list-box">
            <div className="qy-home-p-list-box-logo">
              <img src={IMg} alt="" />
            </div>
            <div className="y-home-p-list-box-name">该系统未开放</div>
          </div>
        </Col>
        <Col xxl={4} xl={6}>
          <div className="qy-home-p-list-box">
            <div className="qy-home-p-list-box-logo">
              <img src={IMg} alt="" />
            </div>
            <div className="y-home-p-list-box-name">该系统未开放</div>
          </div>
        </Col>
        <Col xxl={4} xl={6}>
          <div className="qy-home-p-list-box">
            <div className="qy-home-p-list-box-logo">
              <img src={IMg} alt="" />
            </div>
            <div className="y-home-p-list-box-name">该系统未开放</div>
          </div>
        </Col>
        <Col xxl={4} xl={6}>
          <div className="qy-home-p-list-box">
            <div className="qy-home-p-list-box-logo">
              <img src={IMg} alt="" />
            </div>
            <div className="y-home-p-list-box-name">该系统未开放</div>
          </div>
        </Col>
        <Col xxl={4} xl={6}>
          <div className="qy-home-p-list-box">
            <div className="qy-home-p-list-box-logo">
              <img src={IMg} alt="" />
            </div>
            <div className="y-home-p-list-box-name">该系统未开放</div>
          </div>
        </Col>
      </Row>
      {loginModal && (
        <Logoin
          setLoginModal={setLoginModal}
          openUrl={() => {
            openUrl(urlStr);
          }}
        />
      )}
    </div>
  );
};

export default PList;
