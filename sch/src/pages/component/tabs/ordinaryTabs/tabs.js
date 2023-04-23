import "./index.less";
import OrdinaryTabTemplate from "./tab";
import React from "react";
import ClassNames from "classnames";

/**
 * @desc 普通标签页，内容区域
 * */
const OrdinaryTab = (props) => {
  const {
    children,
    onEdit,
    onChange,
    btnList = [],
    size = '',
    headRef,
  } = props;
  let { activeKey } = props;

  // 标签页头部的props
  const tabProps = {
    children,
    activeKey,
    onEdit,
    onChange,
    btnList,
    size,
    headRef,
  };

  // 组件尺寸大小
  const getClass = () => {
    return ClassNames('ord-tabs-layout', {
      'ord-tabs-layout-large': size === 'large',
    });
  };

  return (
    <div className={getClass()}>
      <OrdinaryTabTemplate {...tabProps} />
      <div className={'ord-pane-layout'}>
        {children.map((tab) => {
          return React.cloneElement(tab, {
            key: tab.key,
            tabKey: tab.key,
            active: tab.key === activeKey,
          });
        })}
      </div>
    </div>
  );
};

export default OrdinaryTab;
