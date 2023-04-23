import React from "react";
import { CloseOutlined } from "@ant-design/icons";

// import elementResizeEvent, { unbind } from 'element-resize-event';

/**
 * 测试
 */
class heads extends React.Component {
  constructor(props) {
    super();
    this.state = {
      // tab的宽度
      tabWidth: 215,
    };
  }

  componentDidMount() {
    // elementResizeEvent(document.getElementById('qyhd-tabs-id'), () => {
    //   let uniqueName = 'qyhd-tabs-id_resizeTimeout_' + this.timeoutId;
    //   if (window[uniqueName]) {
    //     clearTimeout(window[uniqueName]);
    //   }
    //   window[uniqueName] = setTimeout(() => {
    //     this.setState({
    //       tabWidth: this.getTabsWidth(),
    //     });
    //   }, 100);
    // });
  }

  // shouldComponentUpdate(prevProps, prevState) {
  //     if (prevProps.children.toString() !== this.props.children.toString() || prevProps.activeKey !== this.props.activeKey) {
  //         this.setState({
  //             tabWidth: this.getTabsWidth(prevProps.children.length < this.props.children.length)
  //         });
  //         return true;
  //     }
  //     return false;
  // }

  // getSnapshotBeforeUpdate(prevProps, prevState) {
  //   if (prevProps.children.toString() !== this.props.children.toString())
  //     return true;
  //   return null;
  // }
  // componentDidUpdate(prevProps, prevState, snapshot) {
  //   if (snapshot) {
  //     this.setState({
  //       tabWidth: this.getTabsWidth(),
  //     });
  //   }
  // }
  //
  // componentWillUnmount() {
  //   unbind(document.getElementById('qyhd-tabs-id'));
  // }

  // 获取表格高度
  // getTabsWidth = () => {
  //   const { children = [] } = this.props;
  //   const tabsLength = children.length;
  //   const tasId = document.getElementById('qyhd-tabs-id');
  //   // 1. 获取屏幕宽度
  //   let tabsWidth = tasId ? tasId.offsetWidth : 100;
  //   // 2. 获取该屏幕下，放几个标签
  //   let tabsMaxNum = Math.floor(tabsWidth / 215);
  //   // 3. 如果标签数量大于屏幕能放下的标签数量，则需要重新计算宽度
  //   let reloadCalculation = tabsLength > tabsMaxNum;
  //   // 重新计算标签的宽度
  //   let tabWidth = 215;
  //   if (reloadCalculation) {
  //     tabWidth = tabsWidth / tabsLength;
  //   }
  //
  //   return Math.floor(tabWidth);
  // };

  render() {
    const { children, onEdit, onChange } = this.props;
    let { activeKey } = this.props;
    // const { tabWidth } = this.state;

    const tabLists = children.map((item, index) => {
      const tabKey = item.key;
      const actives = tabKey === activeKey;

      return (
        <div
          className={`list ${actives ? 'active' : ''}`}
          // style={{ width: tabWidth }}
          key={'tabListsSpanKeys_' + index}
          onClick={() => {
            onChange(tabKey);
          }}
          title={item.props.tab}
        >
          {item.props.tab}
          {item.props.closable ? (
            <CloseOutlined
              onClick={() => {
                onEdit(tabKey, 'remove');
              }}
            />
          ) : null}
          {/*{actives ? <span /> : null}*/}
        </div>
      );
    });

    return (
      <div id="qyhd-tabs-id" className="qyhd-layout-tabs">
        <div className={'qyhd-tabs'}>{tabLists}</div>

        <div className={'tab-pane'}>
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
  }
}

export default heads;
