/**
 * 拖动
 * */
import Draggable from 'react-draggable';
import React, { useEffect, useRef, useState } from 'react';
import { getModalInfo } from './position';

export function useModalDraggle(props = {}) {
  const cuntHeight =
    window.innerHeight - 94 < 600 ? window.innerHeight - 94 : 600;

  let { w = 800, h = cuntHeight } = props;
  // 打开时，自适应宽和高
  const [mWidth, setMWidth] = useState(w);
  const [mHeight, setMHeight] = useState(h);
  useEffect(() => {
    if (!!props.w && !!props.h) {
      const { width, height } = getModalInfo('', 600);
      setMWidth(width);
      setMHeight(height);
    }
  }, []);

  // 拖动
  const [dDisabled, setDDisabled] = useState(true);
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });
  const draggleRef = useRef(null);
  const onStart = (event, uiData) => {
    const { clientWidth, clientHeight } = window?.document?.documentElement;
    const targetRect = draggleRef?.current?.getBoundingClientRect();
    setBounds({
      left: -targetRect?.left + uiData?.x,
      right: clientWidth - (targetRect?.right - uiData?.x),
      top: -targetRect?.top + uiData?.y,
      bottom: clientHeight - (targetRect?.bottom - uiData?.y),
    });
  };

  return {
    mWidth,
    setMWidth,
    setMHeight,
    mHeight,
    dDisabled,
    setDDisabled,
    bounds,
    draggleRef,
    onStart,
  };
}

export function useMaxWindow(props) {
  // 是否最大化
  const [isMax, setIsMax] = useState(false);
  const [oldInfo, setOldInfo] = useState({});

  const changeMaxWin = () => {
    // type: 1有底部操作按钮 2无底部操作按钮
    const { setMWidth, setMHeight, mWidth, mHeight, type = 1 } = props;

    if (isMax) {
      // 关闭最大化
      setIsMax(false);
      setMWidth(oldInfo.width);
      setMHeight(oldInfo.height);
    } else {
      setOldInfo({
        width: mWidth,
        height: mHeight,
      });
      // 开启最大化
      setIsMax(true);
      const { width, height } = getMaskInfo();
      setMWidth(width - 32);
      // setMHeight(height - (type ? 166 : 117));
      // setMHeight(height - (type ? 117 : 117));
      // 标题44px 底部49px；每个边至少留出10px
      setMHeight(height - (type ? 94 : 44));
    }
  };

  return {
    isMax,
    changeMaxWin,
  };
}

/**
 * @desc 充血弹窗头部，变成可以拖动
 * */
export const modalTitle = ({ dDisabled, setDDisabled, changeMaxWin }, html) => {
  return (
    <div
      className="modal-zuidahua"
      style={{
        width: '100%',
        cursor: 'move',
      }}
      onMouseOver={() => {
        if (dDisabled) {
          setDDisabled(false);
        }
      }}
      onMouseOut={() => {
        setDDisabled(true);
      }}
    >
      {html}
      <div className="btn-box">
        {changeMaxWin && (
          <span
            className="iconfont icon-zuidahua2"
            // style={{ color: '#54A4FF', fontSize: '12px' }}
            // onClick={() => handleClose(record, 0)}
            onClick={() => changeMaxWin()}
          />
        )}
      </div>
    </div>
  );
};

function getMaskInfo() {
  const mask = document.querySelector('.ant-modal-mask');
  // console.log(mask.offsetWidth);
  // console.log(mask.offsetHeight);
  return {
    width: mask.offsetWidth,
    height: mask.offsetHeight,
  };
}

/**
 * @desc 重新内容区域
 * */
export const modalRender = ({
  modal,
  dDisabled,
  bounds,
  onStart,
  draggleRef,
}) => {
  return (
    <Draggable
      disabled={dDisabled}
      bounds={bounds}
      onStart={(event, uiData) => onStart(event, uiData)}
    >
      <div ref={draggleRef}>{modal}</div>
    </Draggable>
  );
};
