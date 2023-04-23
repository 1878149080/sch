import React from "react";

/**
 * 测试
 */
class TabPane extends React.Component {
  constructor(props) {
    super();
    this.state = {
      num: 0,
    };
  }

  render() {
    const { children, active } = this.props;
    return (
      <div className={'tabPane ' + (active ? '' : 'hide')}>{children}</div>
    );
  }
}

export default TabPane;
