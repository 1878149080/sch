import React from 'react';
import { Menu } from 'antd';
import classnames from 'classnames';
import { logout } from '../../services/app';
import LogoImgC from '../../images/logo.png';
import { menuList } from './menuUtil/menuList';
import LogoImg from '../../images/logo/logo.jpg';
import LogoImg2 from '../../images/logo/logo2.jpg';
import { Scrollbars } from 'react-custom-scrollbars';
import { getSystemMenu } from '../../utils/logo/menu';
import { clearStorage } from '../../utils/localStorage';
import {
  expandIcon,
  getDefaultIcon,
  isTextOverflow,
  mouseOut,
} from './menuUtil/handle';
import './menu.less';

const SubMenu = Menu.SubMenu;

/**
 * @desc 菜单 组件
 * */
class headers extends React.PureComponent {
  constructor(props) {
    super(props);
    let navParent = localStorage.getItem('tsvcloud_navParent');
    this.rootSubmenuKeys = [];
    this.state = {
      navList: [],
      navSelect: '-1',
      navParent: navParent === null ? [] : [navParent],
      // 标签的集合
      nameList: [],
      // 点击的标签index
      currentIndex: 0,
      openKeys: [],
      top: 10,
    };
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    const { menuTrees = [], defaultMenuKey, defaultOpenKeys } = getSystemMenu();
    // 获取用户的菜单
    this.setState({
      navList: menuTrees,
      // navSelect: defaultMenuKey,
      // openKeys: defaultOpenKeys,
    });
    // 保存this到根组件，用来和tab页关联
    this.props.addMenusSelf(this);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.navSelect !== '-1') {
      const { tabsKey } = prevProps;
      if (tabsKey !== this.props.tabsKey) {
        const newKey = this.props.tabsKey;
        const last = newKey.lastIndexOf('_');
        let str = { navSelect: newKey };

        if (last > -1) {
          str.openKeys = [newKey.slice(0, last)];
        }

        this.setState(str);
      }
    } else {
      // console.log('-1');
    }
  }

  // 退出登录
  handleLogout() {
    logout();
    clearStorage();
    this.props.history.replace('/');
  }

  // 选择菜单后的回调
  handlerClick = ({ item, key, keyPath, selectedKeys, domEvent }) => {
    const { panes, preSelf, addMenusSelf, collapsed, handleCollapsed } =
      this.props;
    if (collapsed) {
      handleCollapsed && handleCollapsed(false);
      return false;
    }

    let itemObj = item.props;
    let tabKeys = key;
    let filterArr = panes.filter((filterItem) => {
      return filterItem.key === tabKeys;
    });
    // 防止tab页，重复打开某一个菜单
    if (filterArr.length === 0) {
      let newPanes = [...panes];
      newPanes.push({
        title: itemObj.title,
        content: itemObj.paths,
        key: tabKeys,
        closable: true,
        forceRender: true,
        menuId: key,
      });
      // console.log(newPanes);
      // console.log(tabKeys);

      preSelf.setState({
        panes: newPanes,
        activeKey: tabKeys,
      });
    } else {
      preSelf.setState({
        // activeKey: tabKeys
        activeKey: filterArr[0].key,
      });
    }

    this.setState(this.isClearOpen(key, item));
  };

  // 判断是否要收起展开的菜单
  isClearOpen = (key, item) => {
    let stateProps = {
      navSelect: key,
    };
    let { previd = '' } = item.props;
    previd = String(previd).split('_').filter(Boolean);
    if (previd.length > 0) {
      let flag = false;
      let openList = this.state.openKeys;
      for (let i = 0; i < openList.length; i++) {
        const filter = openList.filter((item) => item === openList[i]);
        if (filter.length > 0) {
          flag = true;
          break;
        }
      }
      if (!flag) {
        stateProps.openKeys = [];
      }
    } else {
      stateProps.openKeys = [];
    }
    return stateProps;
  };

  onOpenChange = (openKeys) => {
    const self = this;
    const { collapsed, handleCollapsed } = this.props;
    if (collapsed && openKeys.length > 0) {
      handleCollapsed && handleCollapsed(false);
      return false;
    }

    const latestOpenKey = openKeys.find(
      (key) => self.state.openKeys.indexOf(key) === -1,
    );
    let newOpenKey = openKeys;
    if (self.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      newOpenKey = openKeys;
      // self.setState({ openKeys });
    } else {
      newOpenKey = latestOpenKey ? [latestOpenKey] : [];
      // self.setState({
      //   openKeys: latestOpenKey ? [latestOpenKey] : [],
      // });
    }
    self.setState({
      openKeys: newOpenKey,
      navSelect: '',
    });
  };

  // 监听鼠标移入事件
  onMouseEnter = ({ eventKey, domEvent }) => {
    if (this.props.collapsed) return false;
    clearTimeout(this.clearFlag);
    this.setState({
      top: domEvent.currentTarget.offsetTop + 8,
    });
  };
  // 监听鼠标移出事件
  onMouseLeave = () => {
    if (this.props.collapsed) return false;
    clearTimeout(this.clearFlag);
    this.clearFlag = setTimeout(() => {
      const selected = document.querySelector(
        '.menu-box .ant-menu-item-selected',
      );
      if (selected) {
        this.setState({
          top: selected.offsetTop + 8,
        });
      }
      // clearTimeout(this.clearFlag);
    }, 1000);
  };

  render() {
    const { collapsed, handleCollapsed } = this.props;
    const { navList, navSelect, openKeys } = this.state;
    // const activeKey = this.props.preSelf.state.activeKey;

    const treeNode = (treeObj, prevId = '', forNum = 1, level = 0) => {
      if (treeObj.isInvalid === false) {
        const { menuAddr, menuName } = treeObj;
        let paths = menuAddr || ( prevId + level + menuName);
        const keys = paths;
        const titleBoxClass = classnames('qyhd-antd-menu-title-box', {
          'qyhd-antd-menu-title-box2':
            level === 2 && String(menuName).length > 8,
          'qyhd-antd-menu-title-box3':
            level === 3 && String(menuName).length > 8,
        });

        return (
          <Menu.Item
            key={keys}
            // key={'首页/Welcome'}
            paths={keys}
            previd={prevId}
            title={menuName}
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}
          >
            <div
              className="qyhd-antd-menu-title"
              onMouseEnter={isTextOverflow}
              onMouseLeave={mouseOut}
            >
              <span
                className={'iconfont ' + getDefaultIcon(menuList[menuName])}
              />
              <div className={titleBoxClass}>
                <span className="menu-name">{menuName}</span>
              </div>
            </div>
          </Menu.Item>
        );
      }
    };

    const treeFor = (treeItem, prevId, forNum, level = 2) => {
      if (treeItem.isInvalid === false) {
        const { menuName } = treeItem;
        const curKey = prevId + '_' + treeItem.menuId;
        if (treeItem.children && treeItem.children.length > 0) {
          const itemsArr = treeItem.children.map((items) => {
            return treeFor(items, curKey, forNum + 1, 3);
          });
          return (
            <SubMenu
              key={curKey}
              title={
                <div
                  className="qyhd-antd-menu-title"
                  onMouseEnter={isTextOverflow}
                  onMouseLeave={mouseOut}
                >
                  <span
                    className={'iconfont ' + getDefaultIcon(menuList[menuName])}
                  />
                  <div className="qyhd-antd-menu-title-box">
                    <span className="menu-name">{menuName}</span>
                  </div>
                </div>
              }
              className={String(menuName).length > 8 && 'menu-level-2'}
              onMouseEnter={this.onMouseEnter}
              onMouseLeave={this.onMouseLeave}
            >
              {itemsArr}
            </SubMenu>
          );
        } else {
          return treeNode(treeItem, prevId, forNum, level);
        }
      }
    };

    const list = navList.map((item, index) => {
      if (item.children === null) {
        return treeNode(item);
      } else {
        const children = item.children.map((childItem) => {
          return treeFor(childItem, item.menuId, 1);
        });
        this.rootSubmenuKeys.push(String(item.menuId));

        return (
          <SubMenu
            key={String(item.menuId)}
            title={
              <div
                className="qyhd-antd-menu-title"
                onMouseEnter={isTextOverflow}
                onMouseLeave={mouseOut}
              >
                <span
                  className={
                    'iconfont ' + getDefaultIcon(menuList[item.menuName])
                  }
                />
                <div className="qyhd-antd-menu-title-box">
                  <b className="menu-name">{item.menuName}</b>
                </div>
              </div>
            }
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}
          >
            {children}
          </SubMenu>
        );
      }
    });

    return (
      <div
        className={classnames('nav-box', {
          'nav-box-collapsed': collapsed,
        })}
      >
        <div className="logo" onClick={handleCollapsed}>
          <img src={collapsed ? LogoImgC : LogoImg} alt="logo图片" />
        </div>
        <Scrollbars style={{ width: '100%', height: 'calc(100vh - 356px)' }}>
          <div className="menu-box">
            <Menu
              mode="inline"
              openKeys={openKeys}
              onOpenChange={this.onOpenChange}
              // selectedKeys={activeKey === '首页/Welcome' ? [] : [activeKey]}
              selectedKeys={[navSelect]}
              onSelect={this.handlerClick.bind(this)}
              expandIcon={expandIcon}
              inlineCollapsed={collapsed}
              triggerSubMenuAction="click"
            >
              {list}
            </Menu>
            {!collapsed && (
              <div className="tiao" style={{ top: this.state.top }} />
            )}
          </div>
        </Scrollbars>
        <div className="logo-bottom">
          <img src={LogoImg2} alt="" />
        </div>
      </div>
    );
  }
}

export default headers;
