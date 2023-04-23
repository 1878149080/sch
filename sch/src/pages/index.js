import React from 'react';
import { connect, history } from 'umi';
import classnames from 'classnames';
import { isPRD } from './component/menuUtil/handle';
import { withRouter } from 'react-router-dom';
import { ConfigProvider, Layout } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import Menu from './component/menu';
import Header from './component/header';
import Tabs from './component/tabs/ordinaryTabs/tabs';
import TabPane from './component/tabs/ordinaryTabs/pane';
import Content from './component/concent';
import Routers from '../utils/routers';
import { clearStorage } from '../utils/localStorage';
import { getLoginPage } from '../utils/logo/util';
import { getSystemMenu } from '../utils/logo/menu';
import { addTabChange } from '../utils/system/windowUserRole';
import ErrorBoundary from '../component/errorCom/ErrorBoundary';
import 'dayjs/locale/zh-cn';
import '@/assets/font/iconfont.css';

/*
 *  场景列表页
 * */
class index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      logined: !!window.localStorage.getItem('tsvcloud_logined'),
      // 菜单组件的this，用来控制是否选中某个菜单
      menusSelf: null,
      // 标签页 - 选中的面板
      activeKey: '-1',
      // 标签页 - 数据
      panes: [],
      panesBtn: [{ name: '' }],
    };
    // 用户权限内的菜单
    this.bus_routers = this.getUserRoleMEnu();
    this.bus_router_name = this.getUserRoleMEnuName() || {};
  }

  componentDidMount() {
    window.__userId = localStorage.getItem('tsvcloud_userId');
    // console.log("localStorage", localStorage.getItem('tsvcloud_userId'));
    // console.log("window.__userId", window.__userId);
    // console.log("pages/index    componentDidMount", "------ end");
    addTabChange();
    this.setTabsAndMenu();
  }

  componentWillMount() {
    window.qyhdSelf = this;
    this.loginPage();
  }

  componentWillUpdate(nextProps, nextState) {
    // 无权限跳转到403
    if (
      nextProps.permission !== undefined &&
      nextProps.permission.indexOf(
        localStorage.getItem('tsvcloud_user_role_id'),
      ) === -1
    ) {
      nextProps.history.replace('/403');
    }
  }

  // 获取菜单
  getUserRoleMEnu = () => {
    const arrStr = localStorage.getItem('tsvcloud_routers') || '';
    return arrStr ? [].concat(['/Home'], JSON.parse(arrStr)) : [];
  };

  // 获取菜单名称
  getUserRoleMEnuName = () => {
    const arrStr = localStorage.getItem('tsvcloud_router_name') || '';
    return arrStr ? JSON.parse(arrStr) : {};
  };

  // 判断菜单是否存在，以及用户是否有权限访问
  isUserRoleMenu = (str = '') => {
    if (Routers[str]) {
      const filterMenu = this.bus_routers.filter((item) => item === str);
      return Routers[str];
      // if (filterMenu.length > 0) {
      //   return Routers[str];
      // } else {
      //   return Routers['/403'];
      // }
    } else {
      return Routers['/404'];
    }
  };

  // 设置菜单和标签页
  setTabsAndMenu = () => {
    const { defaultTabs, defaultMenuKey } = getSystemMenu();
    this.setState({
      panes: [defaultTabs],
      activeKey: defaultMenuKey,
    });
  };

  // 判断登录页和返回状态
  loginPage() {
    // 登录状态
    const logined = this.isLogins();
    // 上次登录系统
    // const pageName = localStorage.getItem('tsvcloud_systemName') === 'brain';

    // 如果上次登录系统和本次要登录的一致，且已登录，就刷新菜单
    // if (pageName && logined) {
      if (sessionStorage.getItem('refreshState') && logined) {
        // 刷新菜单
        this.props.dispatch({
          type: 'app/refreshMenu',
        payload: {
          realName: localStorage.getItem('tsvcloud_realName'),
          isAdmin: localStorage.getItem('tsvcloud_isAdmin'),
          userId: localStorage.getItem('tsvcloud_userId'),
          orgId: localStorage.getItem('tsvcloud_orgId'),
          userName: localStorage.getItem('tsvcloud_userName'),
        },
        callback: () => {
          this.setTabsAndMenu();
        },
      });
    } else if (!logined) {
      // 如果未登录，则跳转到登录页
      this.openLoginPage();
    } else {
      sessionStorage.setItem('refreshState', 'true');
    }
  }

  // 判断登录状态。登录：true,过期：false
  isLogins() {
    const loginTime = Number(localStorage.getItem('tsvcloud_loginTime'));
    const newTIme = new Date().getTime();
    
    return localStorage.getItem('tsvcloud_logined');
  }

  // 跳转登录页
  openLoginPage() {
    clearStorage();
    // 跳转登陆页
    getLoginPage();
    // history.replace('/logo');
  }

  // 标签页 - 选中面板
  tabsOnChange = (activeKey) => {
    this.setState({ activeKey });
  };

  // 标签页 - 新增和删除页签的回调
  tabsOnEdit = (targetKey, action) => {
    this[action](targetKey);
  };

  // 添加
  // add = () => {
  //     const { panes } = this.state;
  //     const activeKey = `newTab${this.newTabIndex++}`;
  //     panes.push({ title: 'New Tab', content: 'New Tab Pane', key: activeKey });
  //     this.setState({ panes, activeKey });
  // };

  // 标签页 - 删除
  remove = (targetKey) => {
    let { activeKey } = this.state;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter((pane) => pane.key !== targetKey);
    if (panes.length && activeKey === targetKey) {
      if (lastIndex >= 0) {
        activeKey = panes[lastIndex].key;
      } else {
        activeKey = panes[0].key;
      }
    }

    this.setState(
      {
        panes,
      },
      () => {
        if (panes.length > 0) {
          this.state.menusSelf.setState({
            navSelect: panes[panes.length - 1].menuID,
          });
        }
        this.setState({
          activeKey,
        });
      },
    );
  };

  render() {
    const self = this;
    // const { history } = this.props;
    const { collapsed, activeKey, panes, menusSelf } = this.state;

    const headerProps = {
      tabsKey: activeKey,
      history,
      collapsed,
      panes,
      preSelf: self,
      addMenusSelf: (menusSelfThis) => {
        if (!menusSelf) {
          self.setState({
            menusSelf: menusSelfThis,
          });
        }
      },
      handleCollapsed: (value) => {
        const urlState = isPRD();
        const newCollapsed = typeof value === 'boolean' ? value : !collapsed;
        if (!urlState && collapsed !== newCollapsed) {
          this.setState({
            collapsed: newCollapsed,
          });
        }
      },
    };

    return this.state.logined === true ? (
      // <ConfigProvider locale={zhCN} componentSize="small">
      <ErrorBoundary title="根组件">
        <ConfigProvider locale={zhCN}>
          <Layout>
            <Menu {...headerProps} />
            <Layout
              className={classnames('site-layout', {
                'site-layout-collapsed': collapsed,
              })}
            >
              <Header />
              <Tabs
                onChange={this.tabsOnChange}
                onEdit={this.tabsOnEdit}
                activeKey={activeKey}
                btnList={this.state.panesBtn}
                size="large"
              >
                {panes.map((pane) => {
                  return (
                    <TabPane
                      tab={pane.title}
                      key={pane.key}
                      closable={pane.closable}
                    >
                      <Content
                        indexSelf={self}
                        params={pane.params}
                        Component={this.isUserRoleMenu(pane.content)}
                      />
                    </TabPane>
                  );
                })}
              </Tabs>
            </Layout>
          </Layout>
        </ConfigProvider>
      </ErrorBoundary>
    ) : null;
  }
}

// export default withRouter(index);
function mapStateToProps({ app }) {
  return { app };
}

export default connect(mapStateToProps)(index);
