/**
 * 系统底部的版权信息
 * @author 吴昊
 * **/
import React, { useEffect } from "react";
// import { Row, Col, } from 'antd';
// import IMg from "../../images/login/images1.png"

const Conpyright = (props) => {
  useEffect(() => {
    isScroll();
    window.addEventListener('resize', isScroll);
    return () => {
      window.removeEventListener('resize', isScroll);
    };
  }, []);

  return (
    <div id="qy-home-bottom-copyright" className="qy-home-bottom-copyright">
      <div className="qy-home-bottom-copyright-copy">
        版权所有2021 北京清研宏达信息科技有限公司
      </div>
      <div className="qy-home-bottom-copyright-record">
        备案号：京ICP备17029413号
      </div>
    </div>
  );
};

export default Conpyright;

// 判断主页是否有滚动条
function getScroll() {
  const home = document.getElementById('qy-home') || {};
  // return home.scrollHeight > home.clientHeight;
  return (
    home.scrollHeight > home.clientHeight ||
    home.offsetHeight > home.clientHeight
  );
}

// 如果有滚动条，不处理；如果没有滚动条，则需要定位到底部
function isScroll() {
  const scrollState = getScroll();
  triggerDivClass(scrollState);
}

// 添加和去除手动定位
function triggerDivClass(scrollState) {
  const bottomDiv = document.getElementById('qy-home-bottom-copyright');
  if (scrollState) {
    bottomDiv.classList.remove('footer-fixed');
  } else {
    bottomDiv.classList.add('footer-fixed');
  }
}
