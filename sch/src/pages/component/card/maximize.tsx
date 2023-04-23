import React from "react";
import { Tooltip } from "antd";
import { FullscreenExitOutlined, FullscreenOutlined } from "@ant-design/icons";

/**
 * @desc 最大化控制
 * */
const Maximize = (props: any) => {
  const { state, handleExpander } = props;

  return (
    <div className="qyhd-card-isMaximize">
      <Tooltip title={state ? '最小化' : '最大化'}>
        <a onClick={handleExpander}>
          {state ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
          {state ? '最小化' : '最大化'}
        </a>
      </Tooltip>
    </div>
  );
};
export default Maximize;
