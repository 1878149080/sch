import ResizeObserver from "rc-resize-observer";
import ClassNames from "classnames";
import OrdinaryTabBtnGroup from "./tabsBtn";
import React, { useEffect, useRef, useState } from "react";
import {
  domNoView,
  domOffsetLeft,
  domOffsetRight,
  getActDomIndex,
  getFirstDom,
  getLastDom,
  getTabScrollWidth,
  getViewDom,
  getViewExt,
  isLastDomNext,
  removeTab,
  sumOffsetLeft,
  testingDom
} from "./tabsUtil";
import { CloseOutlined } from "@ant-design/icons";

/**
 * @desc 标签页 头部
 * */
const OrdinaryTabTemplate = (props) => {
  const { children, activeKey, onEdit, onChange, btnList } = props;

  // 按钮组的ref
  const btnRef = useRef(null);
  // 操作滚动的按钮
  const scrollBtnRef = useRef(null);
  // 根元素的总宽度
  const tabRootRef = useRef(null);
  // 标签页的父级
  const scrollRef = useRef(null);
  // 自适应时的防抖
  const [uniqueName] = useState(new Date().getTime());
  // tabs宽度
  const [tabWidth, setTabWidth] = useState('auto');
  // 可视区域内的元素
  const [viewDom, setViewDom] = useState([]);
  // 标签页偏移量
  const [tabLeft, setTabLeft] = useState(0);
  const [firstLoad, setFirstLoad] = useState(false);
  // 是否显示滚动条控制按钮
  // const [scrollVisible, setScrollVisible] = useState(true);
  // 如果触发了删除
  const [removeState, setRemoveState] = useState(0);

  // 初始化的时候，计算按钮的宽度、操作条的宽度
  useEffect(() => {
    const { tabWidth, visible } = getTabScrollWidth({
      btnRef,
      scrollBtnRef,
      tabRootRef,
    });
    const { viewList } = getViewDom(scrollRef?.current, tabWidth, tabLeft);
    setTabWidth(tabWidth);
    setViewDom(viewList);
    // setScrollVisible(visible);
  }, []);

  useEffect(() => {
    // 更新可视dom
    if (firstLoad) {
      const { viewList } = getViewDom(scrollRef?.current, tabWidth, tabLeft);
      setViewDom(viewList);
    } else {
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
      setViewDom(viewList);
      tabLeft !== newLeft && setTabLeft(newLeft);
    }
  }, [removeState]);

  // 当选中的标签页更改后，重新计算偏移量
  const changeActiveKey = () => {
    const { viewList, newLeft } = getViewDom(
      scrollRef?.current,
      tabWidth,
      tabLeft,
    );
    setViewDom(viewList);
    // 判断是否在可视范围
    const { dataIndex, viewDomLength } = getActDomIndex(viewList, activeKey);
    // 可视dom宽度大于可视宽度
    const viewDowWidth = getViewExt(viewList, tabWidth);
    if (dataIndex === -1) {
      // 不在可视范围内
      const left = domNoView(scrollRef?.current, activeKey, tabWidth, tabLeft);
      setTabLeft(left);
    } else if (dataIndex === 0 && viewDowWidth) {
      // 在可视范围左边界
      const left = domOffsetLeft(viewList, tabLeft);
      setTabLeft(left);
    } else if (viewDomLength - 1 === dataIndex && viewDowWidth) {
      // 在可视范围右边界
      const left = domOffsetRight(viewList, tabWidth, tabLeft);
      setTabLeft(left);
    } else if (newLeft !== 1) {
      setTabLeft(newLeft);
    }
  };

  const upActive = (viewDom, tabWidth, type) => {
    // 判断是否在可视范围
    const { dataIndex, viewDomLength } = getActDomIndex(viewDom, activeKey);
    // 可视dom宽度大于可视宽度
    const viewDowWidth = getViewExt(viewDom, tabWidth);
    if (dataIndex === -1) {
      // 不在可视范围内
      const left = domNoView(scrollRef?.current, activeKey, tabWidth, tabLeft);
      setTabLeft(left);
    } else if (dataIndex === 0 && viewDowWidth) {
      // 在可视范围左边界
      const left = domOffsetLeft(viewDom, tabLeft, type);
      setTabLeft(left);
    } else if (viewDomLength - 1 === dataIndex && viewDowWidth) {
      // 在可视范围右边界
      const left = domOffsetRight(viewDom, tabWidth, tabLeft);
      setTabLeft(left);
    } else if (viewDowWidth && dataIndex > 0 && dataIndex < viewDomLength - 1) {
      const left = testingDom(viewDom, tabWidth, tabLeft);
      setTabLeft(left);
    }
  };

  // 当浏览器发生变化时，重新计算标签页宽度
  const windowSize = () => {
    if (window[uniqueName]) {
      clearTimeout(window[uniqueName]);
    }
    window[uniqueName] = setTimeout(() => {
      const { tabWidth, visible } = getTabScrollWidth({
        btnRef,
        scrollBtnRef,
        tabRootRef,
      });
      const { viewList } = getViewDom(scrollRef?.current, tabWidth, tabLeft);
      setTabWidth(tabWidth);
      setViewDom(viewList);
      // visible !== scrollVisible && setScrollVisible(visible);
      upActive(viewList, tabWidth, true);
    }, 100);
  };

  // 点击右，查看右侧的内容
  const handleClickRight = () => {
    // 获取最后一个可视元素
    const lastOffset = getLastDom(viewDom, tabWidth, tabLeft);
    // 计算左移动
    const left = sumOffsetLeft('right', tabLeft, lastOffset);
    // console.log('计算左移动: ', left);
    setTabLeft(left);
  };

  // 点击左，查看左侧的内容
  const handleClickLeft = () => {
    // 获取最后一个可视元素
    const firstOffset = getFirstDom(viewDom, tabLeft);
    // 计算左移动
    // const left = sumOffsetLeft("left", tabLeft, firstOffset);
    // console.log('计算右移动: ', firstOffset);
    setTabLeft(firstOffset);
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
      <ResizeObserver
        onResize={({ width }) => {
          width > 20 && changeActiveKey();
        }}
      >
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
      </ResizeObserver>
    );
  });

  return (
    <ResizeObserver
      onResize={() => {
        windowSize();
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

        <OrdinaryTabBtnGroup btnList={btnList} btnRef={btnRef} />

        <div className="ord-tabs-operation" ref={scrollBtnRef}>
          <i className="ord-tabs-operation-space" />
          <span
            className={ClassNames('iconfont icon-shangyiye', {
              'disabled-span': tabLeft === 0,
            })}
            onClick={handleClickLeft}
          />
          <span
            className={ClassNames('iconfont icon-xiayiye', {
              'disabled-span': !isLastDomNext(scrollRef, tabWidth, tabLeft),
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
