/**
 * @desc 登录菜单处理
 * */

// 过滤菜单类型和筛选按钮级别
export function filterPerssionType(data = []) {
  const perssionBtn = [];
  let routers = [];
  let routerName = {};
  const menuTrees = (data ?? []).reduce((newArr, item) => {
    if (item.perssionType === 0 || item.perssionType === 3) {
      if (item.children === null || item.children.length === 0) {
        newArr.push(item);
      } else {
        item.children = eachMenuTree(
          item.children,
          perssionBtn,
          routers,
          routerName,
        );
        if (item.children.length === 0) item.children = null;
        newArr.push(item);
      }
      if (item.menuAddr) {
        routers.push(item.menuAddr);
        routerName[item.menuAddr] = item.menuName;
      }
    } else if (item.perssionType === 1) {
      // 按钮
      perssionBtn.push(item.permissionCode);
    }
    return newArr;
  }, []);

  // 权限内指定的菜单
  // let temMenu = menuTrees;
  // if (menuTrees.length > 0 && menuTrees[0].children) {
  //   temMenu = [...menuTrees[0].children];
  // }
  return {
    menuTrees: menuTrees,
    perssionBtn,
    routers,
    routerName,
  };
}

// 遍历菜单树
function eachMenuTree(data, perssionBtn, routers, routerName) {
  let arr = [];
  data.forEach((item) => {
    if (item.perssionType === 0 || item.perssionType === 3) {
      if (item.children === null || item.children.length === 0) {
        arr.push(item);
      } else {
        item.children = eachMenuTree(
          item.children,
          perssionBtn,
          routers,
          routerName,
        );
        if (item.children.length === 0) item.children = null;
        arr.push(item);
      }
      if (item.menuAddr) {
        routers.push(item.menuAddr);
        routerName[item.menuAddr] = item.menuName;
      }
    } else if (item.perssionType === 1) {
      perssionBtn.push(item.permissionCode);
    }
  });
  return arr;
}

/**
 * @只获取本系统内的菜单
 * */
export function getSystemMenu() {
  const temMenu = JSON.parse(localStorage.getItem('tsvcloud_menuTree')) || [];

  // console.log("menu", temMenu);
  const {
    menuTrees,
    perssionBtn,
    defaultTabs,
    defaultMenuKey,
    defaultTabKey,
    defaultOpenKeys,
  } = filterMenu(temMenu);
  return {
    menuTrees,
    perssionBtn,
    defaultTabs,
    defaultMenuKey,
    defaultTabKey,
    defaultOpenKeys,
  };
}

const SYSTEMNAME = '权限管理';

function filterMenu(data = []) {
  const perssionBtn = [];
  let routers = [];
  let routerName = {};
  const menuTrees = data.reduce((newArr, item) => {
    // if (item.menuName === SYSTEMNAME) {
    if (item.perssionType === 0 || item.perssionType === 3) {
      if (item.children === null || item.children.length === 0) {
        newArr.push(item);
      } else {
        item.children = eachMenuTree(
          item.children,
          perssionBtn,
          routers,
          routerName,
        );
        if (item.children.length === 0) item.children = null;
        newArr.push(item);
      }
      if (item.menuAddr) {
        routers.push(item.menuAddr);
        routerName[item.menuAddr] = item.menuName;
      }
    } else if (item.perssionType === 1) {
      // 按钮
      perssionBtn.push(item.permissionCode);
    }
    // }

    return newArr;
  }, []);

  const {
    temMenu,
    defaultMenuKey,
    defaultTabs,
    defaultTabKey,
    defaultOpenKeys,
  } = getFirstMenu(menuTrees);

  return {
    menuTrees: temMenu,
    perssionBtn,
    defaultMenuKey,
    defaultTabs,
    defaultTabKey,
    defaultOpenKeys,
  };
}

// 获取首个菜单的信息
function getFirstMenu(menuTrees) {
  // 权限内指定的菜单
  let temMenu = menuTrees;
  // 默认打开首个标签页
  let defaultTabs = {};
  let defaultTabKey = '-1';
  // 默认选中首个标签页
  let defaultMenuKey = '';
  let defaultOpenKeys = [];
  if (menuTrees.length > 0 && menuTrees[0].children) {
    let temMenu2 = [...menuTrees[0].children];
    if (temMenu2.length > 0) {
      // let tem = getDefaultMenuInfo(temMenu2[0]);
      let { selectItem, openKeys = [] } = getDefaultMenuInfo(temMenu2[0]);

      if (openKeys.length > 0) {
        defaultMenuKey = `${openKeys[0]}_${selectItem.menuId}`;
        defaultOpenKeys = openKeys;
      } else {
        defaultMenuKey = `${selectItem.menuId}`;
      }

      defaultTabs = {
        title: selectItem.menuName,
        content: selectItem.menuAddr,
        key: defaultMenuKey,
        closable: false,
        menuID: `${selectItem.menuId}`,
      };
      defaultTabKey = `${selectItem.menuName}${selectItem.menuAddr}`;
    }
  }

  return {
    defaultOpenKeys,
    temMenu,
    defaultTabs,
    defaultTabKey,
    defaultMenuKey,
  };
}

// 是否是菜单。 如果不是菜单，则直接获取子级的首个。
function getDefaultMenuInfo(menuObj) {
  let param = {
    // 展开的菜单
    openKeys: [],
    // 要选中的菜单item
    selectItem: {},
  };
  if (menuObj.children && menuObj.children.length > 0) {
    const curId = '' + menuObj.menuId;
    param.selectItem = menuObj.children[0];
    param.openKeys = [curId];
  } else {
    param.selectItem = menuObj;
  }

  return param;
}
