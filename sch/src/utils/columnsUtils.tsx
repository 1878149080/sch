import React from "react";
import { Tooltip } from "antd";
import dayjs from "dayjs";

// interface
type TipType = {
  title: string | JSX.Element;
};
// 用于表单项的tooltip提示
export const FormTip: React.FC<TipType> = (props) => {
  const { title, children } = props;
  return (
    <Tooltip destroyTooltipOnHide={{ keepParent: false }} title={title}>
      {children}
    </Tooltip>
  );
};

// 用于文本的tooltip提示
export const TextTip: React.FC<TipType> = (props) => {
  const { title = null } = props || {};
  return (
    <Tooltip destroyTooltipOnHide={{ keepParent: false }} title={title}>
      {title}
    </Tooltip>
  );
};

export function renderTip(text: any) {
  return text ? (
    <Tooltip destroyTooltipOnHide={{ keepParent: false }} title={text}>
      <span className="text-tip">{text}</span>
    </Tooltip>
  ) : (
    '--'
  );
}

export const RenderTime = (text: any) => {
  let res = text ? dayjs(text).format('YYYY-MM-DD HH:mm:ss') : '--';
  return res;
};
export const RenderDate = (text: any) => {
  let res = text ? dayjs(text).format('YYYY-MM-DD') : '--';
  return res;
};
export const render = (text: any) => {
  return text ?? '--';
};
