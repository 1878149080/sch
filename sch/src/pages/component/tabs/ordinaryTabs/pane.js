import React from "react";

/**
 * @desc 普通标签页，内容区域
 * */
const OrdinaryPane = (props) => {
  const { active, children } = props;
  return (
    <div className={'ord-tab-pane ' + (active ? '' : 'ord-hide')}>
      {children}
    </div>
  );
};

export default OrdinaryPane;
