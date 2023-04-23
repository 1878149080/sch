import React, { useState, useEffect } from 'react';
import MapTool from '@/component/mapTool/mapSkinTool/index';
import './index.less'

// interface
type propsType = {
  refs: any;
  map: any;
  children?: any;
  mapTool?: boolean;
  handleMaximize?: (maximize: boolean) => void;
}
const Index: React.FC<propsType> = (props) => {
  const { refs, children, map, handleMaximize, mapTool = true } = props;
  const [maximize, setMaximize] = useState<boolean>(false);

  // 地图工具参数
  const toolProps = {
    maximize,
    handleMaximize: () => {
      setMaximize(!maximize);
      handleMaximize && handleMaximize(!maximize);
    },
    handleSkin: (theme: string) => {
      map.current && map.current?.setMapStyle('amap://styles/' + theme);
    },
  };
  return (
    <div className={maximize ? 'map-base maximize' : 'map-base map'}>
      <div style={{width: "100%", height: "100%"}} ref={refs}></div>
      {
        mapTool ? (<MapTool {...toolProps} />) : null
      }
      {children}
    </div>
  );
};

export default Index;
