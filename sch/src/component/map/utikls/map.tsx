import React from 'react';
import MarkerImage from '@/images/dian/dian_3d93fd.png';
// import reactElementToJSXString from 'react-element-to-jsx-string';
import './map.less';
// import MarkerContent from '../demand/register/markerContent';
// @ts-ignore
import coordtransform from 'coordtransform';


// 主题色
const theme = {};

class Marker {
  constructor(props: any) {
    this.list = [];
    this.map = props.map;
  }
  create(props: any) {
    let { data, map, callback, config, isContentShow } = props;
    let marker: any = [];
    data.forEach((item: { position: number[], name: string }) => {
      let M = new AMap.Marker({
        map: map,
        extData: item,
        title: item.name,
        position: item.position,
        // draggable: true,
        // content: "2345"
      })
      this.setMarkerContent(M, isContentShow ?  item.name : "");
      // M.on('rightclick', () => {
      //   console.log(22222);
      // });
      let a = this.createInfo({
        // lng: e.lnglat.lng,
        // lat: e.lnglat.lat,
      });
      // M.on('dragend', (e) => {
      //   a.open(this.map, [e.lnglat.lng, e.lnglat.lat]);
      //   console.log(e);
      //   console.log(e.lnglat.lng, e.lnglat.lat);
      // });
      marker.push(M)
    })
    // console.log(marker);
    map.add(marker);
    // marker.setMap(marker);
    callback && callback(marker);
    return marker;
  }
  createInfo(props: any) {
    const { lng, lat } = props;
    var infoWindow = new AMap.InfoWindow({
      // position: [lng, lat],
      position: [118.102725, 24.490469],
      // isCustom: true,
      offset: new AMap.Pixel(0, -30),
      content: `
        <p>12222222111</p>
        <input class='ant-input' placeholder="请输入经纬度" value="12343" />
        <button type='button' class='ant-btn ant-btn-default'>关闭</button>
        <button type='button' class='ant-btn ant-btn-default'>重置</button>
        <button type='button' class='ant-btn ant-btn-primary'>确认修改</button>
      `,
    });
    return infoWindow;
  }
  setMarkerContent(marker: any, content: any) {
    // let str = reactElementToJSXString(MarkerContent(content));
    // console.log(str);
    // marker.setContent(str);
  }
}

class line {
  constructor(props: any) {
    this.list = [];
    this.map = map;
  }
  create(props: any) { }
}

class MassMarker {
  constructor(props: any) {
    this.map = props.map;
  }
  create(props: any) {
    let { data, map, callback, config } = props;
    // var mass = new AMap.MassMarks(data, {
    //   opacity: 1,
    //   zIndex: 111,
    //   cursor: 'pointer',
    //   style: {
    //     url: 'https://webapi.amap.com/images/mass/mass0.png',
    //     anchor: new AMap.Pixel(3, 3),
    //     size: new AMap.Size(10, 10),
    //   },
    //   // style: style,
    // });
    // console.log(this);
    // mass.setMap(map)

    var pointSimplifierIns = null;
    //加载PointSimplifier，loadUI的路径参数为模块名中 'ui/' 之后的部分 
    AMapUI.loadUI(['misc/PointSimplifier'], function (PointSimplifier: any) {

      if (!PointSimplifier.supportCanvas) {
        alert('当前环境不支持 Canvas！');
        return;
      }

      //启动页面
      initPage(PointSimplifier);
    });

    function initPage(PointSimplifier: any) {
      //创建组件实例
      pointSimplifierIns = new PointSimplifier({
        map: map, //关联的map
        autoSetFitView: false,
        // compareDataItem: function (a, b, aIndex, bIndex) {
        //   //数据源中靠后的元素优先，index大的排到前面去
        //   return aIndex > bIndex ? -1 : 1;
        // },
        getPosition: function (dataItem: any) {
          // console.log(dataItem);
          //返回数据项的经纬度，AMap.LngLat实例或者经纬度数组
          return dataItem.lnglat;
        },
        // getHoverTitle: function (dataItem, idx) {
        //   //返回数据项的Title信息，鼠标hover时显示
        //   return '序号: ' + idx;
        // },
        renderOptions: {
          //点的样式
          pointStyle: {
            fillStyle: 'blue' //蓝色填充
          }
        },
        ...config,
      });

      //设置数据源，data需要是一个数组
      pointSimplifierIns.setData(data);
      callback(pointSimplifierIns);

      //监听事件
      // pointSimplifierIns.on('pointClick pointMouseover pointMouseout', function (e, record) {
      //   console.log(e.type, record);
      // });
    }
    // return pointSimplifierIns
  }
}

// 将字符串gps转化成数组gps
const handleStrTrack = (gps: string) => {
  let data = gps
    .split(';')
    .filter(Boolean)
    .map((item) => {
      let p = item.split(',');
      return {
        lnglat: ToGaoDe(p),
      };
    });
  return data;
};

const ToGaoDe = (position: any[]) => {
  let [lng, lat] = position;
  if(lng && lat) {
    return coordtransform.wgs84togcj02(lng, lat)
  }else{
    return []
  }
}

export { Marker, MassMarker, handleStrTrack, ToGaoDe };
