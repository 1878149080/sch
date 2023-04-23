import React, { useState, useEffect, useRef } from 'react';
import 'xgplayer';
import FlvPlayer from 'xgplayer-flv';
import './index.less';

const PlayerIndex = (props) => {
  // 注释
  const objRef = useRef({ player: null });

  useEffect(() => {
    setTimeout(() => {
      initPlayer();
    }, 800);
  }, []);

  const initPlayer = () => {
    const params = btoa('user:fgwcs;pwd:123456,13666666666,1,1,1');
    // const flvUrl = `http://139.9.63.227:8888/video/${params}`;
    const flvUrl = "https://mister-ben.github.io/videojs-flvjs/bbb.flv";
    let player = new FlvPlayer({
      id: 'xg',
      url: flvUrl,
      poster: './poster.png',
      isLive: false,
      preloadTime: 30,
      minCachedTime: 5,
      // cors: true,
      hasAudio: false,
      // height: window.innerHeight - 100,
      // width: window.innerWidth - 100,
    });
    objRef.current.player = player;
  };

  return (
    <>
      <h1>发收到发货打法都会发觉卡打法空间和大姐卡</h1>
      <div className="xplayer">
        <div className="box" id="xg"></div>
      </div>
    </>
  );
};

export default PlayerIndex;
