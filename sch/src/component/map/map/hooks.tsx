import React, { useEffect, useRef, useState } from 'react';
import ToProxy from './toProxy'

// interface
import { ConfigItem, ToProxyType } from './toProxy';

function useConfig<T extends ConfigItem = never>(props: { config: T }): { LC: T, refresh: boolean, updateUI: () => void } {
  const config = useRef<any>({
    first: true,
    config: {}
  });
  const [refresh, setRefresh] = useState<boolean>(false);
  
  if(config.current.first) {
    config.current.first = false;
    // @ts-ignore
    config.current.config = new ToProxy(props);
  }

  const update = () => {
    setRefresh(!refresh)
  }
  return {
    refresh, // 配置变化的时候，他的值会发生改变
    LC: config.current.config, // 配置
    updateUI: update, // 更新视图
  }
}

export {
  useConfig
}