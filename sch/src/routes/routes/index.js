import React, { useEffect, useRef } from 'react';
import { Ws } from './ws';

const app = (props) => {
  // 创建一个 ref 来存储 textInput 的 DOM 元素
  const wsRef = useRef();

  useEffect(() => {
    // 初始化 ws
    wsRef.current = new Ws();
    // 因为不知道你的全局状态怎么存储的，所以这里挂载到 window 上了
    window.wsRef = wsRef;

    return () => {
      // 关闭 ws
      wsRef.current?.websocks?.close();
    };
  }, []);

  // 发送数据
  const send = () => {
    wsRef.current?.websocketonmessage('hello');
  }

  // 接收数据
  const receive = () => {
    wsRef.current.websocks.onmessage = (e) => {
      console.log('接收到数据', e);
      // 进行处理
    }
  }

};

export default app;
