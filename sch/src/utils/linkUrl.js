/**
 * @desc 跳转到指定的菜单
 * */
export function LinkToMenu(props) {
  const { indexSelf, params, menuRouter, menuTile  } = props;
  const menuName = menuTile ? menuTile : indexSelf.bus_router_name[menuRouter] ?? '--';
  // const filterPanes = indexSelf.state.panes.filter(
  //   (item) => item.content !== menuRouter,
  // );

  indexSelf.state.panes.push({
    title: menuName,
    content: menuRouter,
    key: menuTile ? menuTile : menuRouter,
    closable: true,
    menuID: menuName,
    params: params,
  });

  indexSelf.setState({
    panes: indexSelf.state.panes,
    activeKey: menuTile ? menuTile : menuRouter,
  });
}
