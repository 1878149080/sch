import ResizeObserver from "rc-resize-observer";
import ClassNames from "classnames";
import OrdinaryTabBtnGroup from "./tabsBtn";
import React, { useEffect, useRef, useState } from "react";
import {
  getRightState,
  getTabScrollWidth,
  getViewDom,
  isVisible,
  removeTab,
  tabsMoveLeft,
  tabsMoveRight,
  upActiveKey,
  windowUpLeft
} from "./tabsUtil";
import { CloseOutlined } from "@ant-design/icons";

/**
 * @desc 标签页 头部
 * */
const OrdinaryTabTemplate = (props) => {
  const { children, activeKey, onEdit, onChange, btnList, size, headRef } =
    props;

  // 按钮组的ref
  const btnRef = useRef(null);
  // 操作滚动的按钮
  const scrollBtnRef = useRef(null);
  // 根元素的总宽度
  const tabRootRef = useRef(null);
  // 标签页的父级
  const scrollRef = useRef(null);
  // 监听宽度变化，第一次不需要执行
  const momentDomRef = useRef(-1);
  // 自适应时的防抖
  const [uniqueName] = useState(new Date().getTime());
  // tabs宽度
  const [tabWidth, setTabWidth] = useState('auto');
  // 可视区域内的元素
  // const [viewDom, setViewDom] = useState([]);
  // 标签页偏移量
  const [tabLeft, setTabLeft] = useState(0);
  const [firstLoad, setFirstLoad] = useState(false);
  // 是否显示滚动条控制按钮
  // const [scrollVisible, setScrollVisible] = useState(true);
  // 如果触发了删除
  const [removeState, setRemoveState] = useState(0);

  // 初始化的时候，计算按钮的宽度、操作条的宽度
  useEffect(() => {
    // 初始化标签页
    initTabs();
  }, []);

  useEffect(() => {
    // 更新可视dom
    if (!firstLoad) {
      setFirstLoad(true);
    }
  }, [tabLeft]);

  useEffect(() => {
    if (firstLoad) {
      changeActiveKey();
    }
  }, [activeKey]);

  // 删除操作
  useEffect(() => {
    if (removeState > 0) {
      console.log('执行了，删除操作!');
      // 获取可视范围内的dom
      const { viewList } = getViewDom(scrollRef?.current, tabWidth, tabLeft);
      const newLeft = removeTab(viewList, scrollRef, tabWidth, tabLeft);
      tabLeft !== newLeft && setTabLeft(newLeft);
    }
  }, [removeState]);

  // 初始化标签页
  const initTabs = () => {
    const { tabWidth, visible } = getTabScrollWidth({
      btnRef,
      scrollBtnRef,
      scrollRef,
      tabRootRef,
      size,
      headRef,
    });
    setTabWidth(tabWidth);
    // setScrollVisible(visible);
    return { tabWidth };
  };

  // 当选中的标签页更改后，重新计算偏移量
  const changeActiveKey = () => {
    const newLeft = upActiveKey(
      scrollRef,
      tabWidth,
      tabLeft,
      activeKey,
      size === 'large' ? 6 : 0,
    );
    // console.log(newLeft);
    // setTabLeft(newLeft - 4);
    setTabLeft(newLeft);
  };

  // 当浏览器发生变化时，重新计算标签页宽度
  const windowSize = (props) => {
    if (momentDomRef.current < 0) {
      momentDomRef.current = 1;
      return false;
    }
    if (window[uniqueName]) {
      clearTimeout(window[uniqueName]);
    }
    // const { width, height } = props;
    window[uniqueName] = setTimeout(() => {
      // 初始化标签页
      const { tabWidth: newTabWidth } = initTabs();
      const left = windowUpLeft(tabLeft, newTabWidth, scrollRef);
      setTabLeft(left);
      // console.log(width, height, tabWidth, newTabWidth, left);
    }, 100);
  };

  // 点击右，查看右侧的内容
  const handleClickRight = () => {
    const left = tabsMoveLeft(tabLeft, tabWidth, scrollRef);
    // console.log('计算左移动: ', left);
    setTabLeft(left);
  };

  // 点击左，查看左侧的内容
  const handleClickLeft = () => {
    const left = tabsMoveRight(tabLeft, tabWidth);
    // console.log('计算右移动: ', left);
    setTabLeft(left);
  };

  // 删除
  const handleRemove = (tabKey) => {
    onEdit(tabKey, 'remove');
    setRemoveState(removeState + 1);
  };

  // 添加
  // const handleAdd = () => {}

  // 遍历生成每个标签
  const tabLists = children.map((item, index) => {
    const { tab = '', closable = true } = item.props;
    const tabKey = item.key;
    const actives = tabKey === activeKey;

    return (
      // <ResizeObserver
      //   onResize={({ width }) => {
      //     // width > 20 && changeActiveKey();
      //   }}
      // >
      <div
        className={`ord-tabs-title ${actives ? 'active' : ''}`}
        key={'ord-tabs-key_' + index}
        onClick={() => {
          onChange(tabKey);
        }}
        data-tabkey={tabKey}
        // title={tab}
      >
        {tab}
        {closable ? (
          <CloseOutlined
            onClick={(e) => {
              e.stopPropagation();
              handleRemove(tabKey);
            }}
          />
        ) : null}
      </div>
      // </ResizeObserver>
    );
  });
  const leftCss = tabLeft === 0;
  const rightCss = isVisible(scrollRef, tabWidth, tabLeft);
  const rightState = tabLeft <= getRightState(scrollRef, tabWidth, tabLeft);

  return (
    <ResizeObserver
      onResize={(props) => {
        windowSize(props);
      }}
    >
      <div className={'ord-tabs'} ref={tabRootRef}>
        <div className="ord-tabs-title-box" style={{ width: tabWidth }}>
          <div
            className="ord-tabs-title-box-scroll"
            style={{ transform: `translate3d(${tabLeft}px, 0px, 0px)` }}
            ref={scrollRef}
          >
            {tabLists}
          </div>
        </div>

        <OrdinaryTabBtnGroup
          btnList={btnList}
          btnRef={btnRef}
          headRef={headRef}
        />

        <div
          className="ord-tabs-operation"
          ref={scrollBtnRef}
          style={{ display: rightCss ? 'inline-block' : 'none' }}
        >
          <i className="ord-tabs-operation-space" />
          <span
            className={ClassNames('iconfont icon-shangyiye', {
              'disabled-span': leftCss,
            })}
            onClick={handleClickLeft}
          />
          <span
            className={ClassNames('iconfont icon-xiayiye', {
              'disabled-span': rightState,
            })}
            onClick={handleClickRight}
          />
          <i className="ord-tabs-operation-space" />
        </div>
      </div>
    </ResizeObserver>
  );
};

export default OrdinaryTabTemplate;
