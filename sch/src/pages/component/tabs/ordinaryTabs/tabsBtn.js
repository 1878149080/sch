import { Tooltip } from "antd";
import React from "react";
import Header from "../../header";

/**
 * @desc 标签页按钮组
 * */
const OrdinaryTabBtnGroup = (props, Headers) => {
  const { btnList = [], btnRef, headRef } = props;

  // 循环按钮组
  const htmlTemplate = btnList.map((item, index) => {
    const { disabled = false } = item;
    return (
      <Tooltip title={item.name}>
        {index > 0 && <i className="ord-tabs-btn-group-space" />}
        <a
          className={disabled ? 'disabled-span' : ''}
          onClick={disabled ? null : item.handle}
        >
          {item.icon}
          {item.name}
        </a>
      </Tooltip>
    );
  });

  // 生成按钮组
  const createBtnGroup = () => {
    return (
      <div className="ord-tabs-btn-group" ref={btnRef}>
        <Header headRef={headRef} />
      </div>
    );
  };

  return <>{btnList.length > 0 && createBtnGroup()}</>;
  // return <Header headRef={headRef}/>
};

export default OrdinaryTabBtnGroup;
