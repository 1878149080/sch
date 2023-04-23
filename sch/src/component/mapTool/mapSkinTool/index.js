/**
 * @desc 地图工具 最大化、定位、换皮肤、模糊搜索定位
 * @吴昊
 * */
import React, { useState } from 'react';
import { Input, Dropdown, Menu } from 'antd';
import MapIcon1 from '@/images/mapTool/map1.png';
import MapIcon2 from '@/images/mapTool/map2.png';
import MapIcon3 from '@/images/mapTool/map3.png';
import './index.less';
// import AutoInput from './mapToolAutoInput';

const MapTool2 = (props) => {
  const {
    maximize,
    handleMaximize,
    handleSkin,
    handleLocation,
    handleSearchLocation,
    handleSearchClose,
  } = props;
  const [mapStyleKey, setMapStyleKey] = useState('whitesmoke');

  // 工具下拉
  const toolMenu = (
    <Menu
      defaultSelectedKeys={[mapStyleKey]}
      onClick={({ key }) => {
        handleSkin(key);
        setMapStyleKey(key);
      }}
    >
      <Menu.Item key="normal">
        <img src={MapIcon2} />
      </Menu.Item>

      <Menu.Item key="whitesmoke">
        <img src={MapIcon1} />
      </Menu.Item>

      <Menu.Item key="darkblue">
        <img src={MapIcon3} />
      </Menu.Item>
      {/*<Menu.Item key="wine">酱籽</Menu.Item>*/}
    </Menu>
  );

  const getIcon = () => {
    if (mapStyleKey === 'darkblue') {
      return MapIcon3;
    } else if (mapStyleKey === 'whitesmoke') {
      return MapIcon1;
    } else {
      return MapIcon2;
    }
  };

  return (
    <div className="mapTool2">
      <div className="list">
        <Dropdown
          overlay={toolMenu}
          trigger={['click']}
          // placement="bottomRight"
          placement="bottomCenter"
          overlayClassName="test-skin"
        >
          <img src={getIcon()} />
        </Dropdown>
      </div>
      <div className="list" onClick={handleMaximize}>
        {maximize ? (
          <span className="iconfont icon-zuixiaohua" />
        ) : (
          <span className="iconfont icon-quanpingzuidahua" />
        )}
      </div>
    </div>
  );
};

export default MapTool2;
