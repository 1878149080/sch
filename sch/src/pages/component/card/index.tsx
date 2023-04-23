import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CardInterface } from "./entitry";
import classNames from "classnames";
import Maximize from "./maximize";
import "./index.less";

/**
 * @desc 自定义card。 尺寸有中、小
 * */
const StyleCard = (props: CardInterface) => {
  const {
    title,
    size,
    className,
    ref,
    extra,
    isMaximize = false,
    onChangeMax,
    children,
  } = props;
  // 最大化状态存储
  const [state, setState] = useState(false);

  useEffect(() => {
    onChangeMax && onChangeMax(state);
  }, [state]);

  // 最大化状态更改
  const handleExpander = () => {
    setState(!state);
  };

  // 最大化的props
  const maxProps = {
    state,
    handleExpander,
  };

  // 点击最大化蒙层时，取消最大化状态
  const handleClickMask = () => {
    setState(false);
  };

  const htmlTemplate = (
    <div
      ref={ref}
      className={classNames('qyhd-card', className, {
        'qyhd-card-small': size === 'small',
        'qyhd-card-maximize': state,
      })}
    >
      <div className="qyhd-card-titleBox">
        <div className="qyhd-card-title">{title}</div>
        {isMaximize && <Maximize {...maxProps} />}
        {extra && <div className="qyhd-card-extra">{extra}</div>}
      </div>
      <div className="qyhd-card-content">{children}</div>
    </div>
  );
  // @ts-ignore
  const rootDom: HTMLElement = document.querySelector('body');

  return (
    <>
      {state
        ? createPortal(
            <>
              <div
                className="qyhd-card-maximize-mask"
                onClick={handleClickMask}
              />
              {htmlTemplate}
            </>,
            rootDom,
          )
        : htmlTemplate}
    </>
  );
};

export default StyleCard;
