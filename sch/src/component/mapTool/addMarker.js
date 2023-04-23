import React, { useState } from 'react';
import { Alert, Col, Form, Input, message, Modal, Radio, Row } from 'antd';
import ReactDOM from 'react-dom';
import {
  checkLat,
  checkLong,
  errorTips,
  strReplace,
  transformationGpsGD,
  transformationGpsPathArr,
} from './tool';
import Marker_gps_hong from '../../images/mapTool/marker_gps_hong.png';
import Marker_gps_lan from '../../images/mapTool/marker_gps_lan.png';
import Marker_gps_lv from '../../images/mapTool/marker_gps_lv.png';
import Marker_gps_cheng from '../../images/mapTool/marker_gps_cheng.png';
import Marker_gps_zi from '../../images/mapTool/marker_gps_zi.png';
import Marker_gps_zhan from '../../images/mapTool/marker_gps_zhan.png';
import Marker_ban from '../../images/mapTool/marker-ban.png';
import Marker_deng from '../../images/mapTool/marker-deng.png';
import Marker_chong from '../../images/mapTool/marker-chong.png';

const { TextArea } = Input;
const AMap = window.AMap;
const AMapUI = window.AMapUI;

/**
 * 在地图上批量添加点
 * @吴昊
 * 2020-07-17
 * */
const AddMapMarker = (props) => {
  const [form] = Form.useForm();
  // 坐标类型
  const [gpsTypes, setGpsTypes] = useState('1');
  // 展现方式
  const [markerType, setMarkerType] = useState('1');
  // 坐标
  const [gps, setGps] = useState('');
  // 点击时的弹窗对象
  let infoWindow = new AMap.InfoWindow({ offset: new AMap.Pixel(0, -30) });

  const { map, handleCancel, visible } = props;

  // 确定
  const handleOk = (values) => {
    const { gpsTypes, markerType, gps } = values;
    if (['', null, undefined].indexOf(gps) > -1) {
      message.error('坐标未填写!');
      return false;
    }
    // setGpsTypes(gpsTypes);
    // setMarkerType(markerType);
    // setGps(gps);

    // TODO 两个方法应该是在状态更新后执行
    // 在地图上生成指定的点
    getMarkerType(values);
    // 关闭弹窗
    handleCancel();
  };

  // 在地图上生成指定的点
  // eslint-disable-next-line complexity
  const getMarkerType = (values) => {
    const { gpsTypes, markerType: markerTypeTem, gps } = values;
    const markerType = Number(markerTypeTem);
    // let imgUrl = "http://data.tsingvast.com:15383/BusAnalysis";
    let icon = '';
    let offset = new AMap.Pixel(-10, -26);
    let colors = '';
    if (markerType === 1) {
      icon = Marker_gps_hong;
    } else if (markerType === 2) {
      icon = Marker_gps_lan;
    } else if (markerType === 3) {
      icon = Marker_gps_lv;
    } else if (markerType === 4) {
      icon = Marker_gps_cheng;
    } else if (markerType === 5) {
      icon = Marker_gps_zi;
    } else if (markerType === 11) {
      icon = Marker_ban;
      offset = new AMap.Pixel(-5, -10);
    } else if (markerType === 12) {
      icon = Marker_deng;
      offset = new AMap.Pixel(-6, -13);
    } else if (markerType === 13) {
      icon = Marker_chong;
    } else if (markerType === 14) {
      icon = Marker_gps_zhan;
      offset = new AMap.Pixel(-6, -13);
    } else if (markerType === 6) {
      colors = 'red';
    } else if (markerType === 7) {
      colors = '#0099FF';
    } else if (markerType === 8) {
      colors = '#00CC00';
    } else if (markerType === 9) {
      colors = '#FF9900';
    } else if (markerType === 10) {
      colors = '#9999FFF';
    } else if (markerType === 15) {
      icon = Marker_gps_hong;
      colors = 'red';
    } else if (markerType === 16) {
      icon = Marker_gps_lan;
      colors = '#0099FF';
    } else if (markerType === 17) {
      icon = Marker_gps_lv;
      colors = '#00CC00';
    } else if (markerType === 18) {
      icon = Marker_gps_cheng;
      colors = '#FF9900';
    } else if (markerType === 19) {
      icon = Marker_gps_zi;
      colors = '#9999FFF';
    }

    const { prvSelf, overlayGroups } = props;
    // const { map, colors, gps, gpsTypes, prvSelf } = props;
    const params = {
      map,
      gps,
      gpsTypes,
    };
    if (icon && colors === '') {
      // 点
      prvSelf.setState({
        // overlayGroups: [...overlayGroups, new CreateMarker(icon, offset, self)],
        overlayGroups: [
          ...overlayGroups,
          new CreateMarker({
            ...params,
            icon,
            offset,
            infoWindow,
          }),
        ],
      });
    } else if (icon === '' && colors) {
      // eslint-disable-next-line no-new
      new CreateHaiLiang({
        ...params,
        colors,
        prvSelf,
      });
    } else {
      // 生成线
      // eslint-disable-next-line no-new
      new CreateLine({
        ...params,
        colors,
        prvSelf,
      });
    }
  };

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };

  function handleSubmit(e) {
    form.submit();
  }

  return (
    <Modal
      title="添加GPS点"
      open={visible}
      onOk={handleSubmit}
      onCancel={() => handleCancel()}
      width={750}
      destroyOnClose
      maskClosable
      centered
    >
      <Alert
        description="请输入以“,”分隔的GPS坐标,格式为“经度1,纬度1;经度2,纬度2”，多个GPS坐标请用“;”隔开"
        type="success"
        closable
      />
      <Form form={form} onFinish={handleOk}>
        <Row className="addMarkerAlert" gutter={6}>
          <Col span={24}>
            <Form.Item
              label="坐标类型"
              name="gpsTypes"
              initialValue={'1'}
              {...formItemLayout}
            >
              <Radio.Group>
                <Row className="gpsType" gutter={6}>
                  <Col style={{ width: 118.5 }} span={8}>
                    <Radio value="1">GPS</Radio>
                  </Col>
                  <Col style={{ width: 118.5 }} span={8}>
                    <Radio value="2">高德坐标</Radio>
                  </Col>
                  <Col style={{ width: 118.5 }} span={8}>
                    <Radio value="3">百度坐标</Radio>
                  </Col>
                </Row>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="展现类型"
              name="markerType"
              initialValue={'1'}
              {...formItemLayout}
            >
              <Radio.Group>
                <Row gutter={6}>
                  <Col span={6}>
                    <Radio value="1">红色点</Radio>
                    <Radio value="2">蓝色点</Radio>
                    <Radio value="3">绿色点</Radio>
                    <Radio value="4">橙色点</Radio>
                    <Radio value="5">紫色点</Radio>
                  </Col>
                  <Col span={6}>
                    <Radio value="6">红色海量点</Radio>
                    <Radio value="7">蓝色海量点</Radio>
                    <Radio value="8">绿色海量点</Radio>
                    <Radio value="9">橙色海量点</Radio>
                    <Radio value="10">紫色海量点</Radio>
                  </Col>
                  <Col span={6}>
                    <Radio value="15">红色线</Radio>
                    <Radio value="16">蓝色线</Radio>
                    <Radio value="17">绿色线</Radio>
                    <Radio value="18">橙色线</Radio>
                    <Radio value="19">紫色线</Radio>
                  </Col>
                  <Col span={6}>
                    <Radio value="11">斑马线</Radio>
                    <Radio value="12">红绿灯</Radio>
                    <Radio value="13">充电桩</Radio>
                    <Radio value="14">场站点</Radio>
                  </Col>
                </Row>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="坐标"
              name="gps"
              {...formItemLayout}
              rules={[
                {
                  required: true,
                  message: '请输入坐标!',
                },
              ]}
            >
              <TextArea rows={2} size="middle" placeholder="请输入坐标" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default AddMapMarker;

/**
 * 生成点和指定图标的点
 * @param icon 图标
 * @param offset 图片偏移量
 * @param comSelf 组件的this指向
 * @吴昊
 * */
// function CreateMarker(icon, offset, comSelf) {
function CreateMarker(props) {
  const { map, gps, gpsTypes, icon, offset, infoWindow } = props;
  const self = this;
  self.map = map;
  self.gps = gps;
  self.gpsTypes = gpsTypes;
  self.infoWindow = infoWindow;

  let lnglats = this.getStrgpsToArrgps();
  let markers = [];

  for (let i = 0; i < lnglats.length; i++) {
    let lnglat = lnglats[i];
    // 创建点实例
    let marker = new AMap.Marker({
      position: new AMap.LngLat(lnglat.gaode[0], lnglat.gaode[1]),
      icon: icon,
      offset: offset,
      extData: {
        id: i + 1,
      },
    });
    let content = `<div><b>gps</b>：${lnglat.gps[0].toFixed(
      8,
    )},${lnglat.gps[1].toFixed(8)} </div>`;
    content += `<div><b>高德</b>：${lnglat.gaode[0].toFixed(
      8,
    )},${lnglat.gaode[1].toFixed(8)} </div>`;
    content += `<div><b>百度</b>：${lnglat.baidu[0].toFixed(
      8,
    )},${lnglat.baidu[1].toFixed(8)} </div>`;
    content += `<div id="deleteMarker"></div>`;
    marker.content = content;
    marker.on('click', self.markerClick.bind(this));
    markers.push(marker);
  }

  // 创建覆盖物群组，并将 marker 传给 OverlayGroup
  let overlayGroups = new AMap.OverlayGroup(markers);
  self.map.add(overlayGroups);
  self.map.setFitView();
  return overlayGroups;
}

/**
 * 删除单个marker点
 * */

CreateMarker.prototype.deleteMarker = function (marker = null) {
  if (!marker) return false;
  this.map.remove(marker);
  this.map.clearInfoWindow();
};

/**
 * 坐标转换为字符串
 * */
CreateMarker.prototype.getStrgpsToArrgps = function () {
  let gps = strReplace(this.gps).split(';');
  gps = gps.filter(function (item) {
    return ['', null, undefined].indexOf(item) === -1;
  });
  let list = [];
  for (let i = 0; i < gps.length; i++) {
    let gpsItem = gps[i].split(',');
    if (gpsItem.length === 2) {
      let lng = gpsItem[0];
      let lat = gpsItem[1];
      // 校验经纬度
      if (checkLong(lng) && checkLat(lat)) {
        list.push(
          transformationGpsGD(Number(this.gpsTypes), [
            Number(lng),
            Number(lat),
          ]),
        );
      } else {
        list = [];
        errorTips();
        break;
      }
    } else {
      list = [];
      errorTips();
      break;
    }
  }
  return list;
};

// 批量添加点 - 点击显示详细信息
CreateMarker.prototype.markerClick = function (e) {
  this.infoWindow.setContent(
    `<div class="mapAlerts">${e.target.content}</div>`,
  );
  this.infoWindow.open(this.map, e.target.getPosition());
  setTimeout(() => {
    ReactDOM.render(
      <a onClick={() => this.deleteMarker(e.target)}>删除该点</a>,
      document.getElementById('deleteMarker'),
    );
  }, 50);
};

/**
 * 生成海亮点
 * @param colors 点的颜色
 * @param comSelf 组件的this指向
 * @吴昊
 * */
// function CreateHaiLiang(colors, comSelf, prvSelf) {
function CreateHaiLiang(props) {
  const { map, colors, gps, gpsTypes, prvSelf } = props;
  const self = this;
  self.map = map;

  let listArr = strReplace(gps).split(';').filter(Boolean);
  let data = [];
  try {
    data = transformationGpsPathArr(Number(gpsTypes), listArr);
  } catch (e) {
    errorTips();
    return false;
  }
  let pointSimplifierIns = null;

  AMapUI.load(
    ['ui/misc/PointSimplifier', 'lib/$'],
    function (PointSimplifier, $) {
      if (!PointSimplifier.supportCanvas) {
        alert('当前环境不支持 Canvas！');
        return;
      }

      pointSimplifierIns = new PointSimplifier({
        map: self.map, // 所属的地图实例
        zIndex: 1,

        getPosition: function (item) {
          if (!item) {
            return null;
          }

          let parts = item.split(',');

          // 返回经纬度
          return [parseFloat(parts[0]), parseFloat(parts[1])];
        },
        getHoverTitle: function (dataItem, idx) {
          return idx + ': ' + dataItem;
        },
        renderOptions: {
          // 点的样式
          pointStyle: {
            width: 3,
            height: 3,
            fillStyle: colors,
          },
          // 鼠标hover时的title信息
          hoverTitleStyle: {
            position: 'top',
          },
        },
      });

      pointSimplifierIns.setData(data);
      prvSelf.setState({
        pointSimplifierIns: [
          ...prvSelf.state.pointSimplifierIns,
          pointSimplifierIns,
        ],
      });
    },
  );
}

/**
 * 把点串成线
 * @param colors 点的颜色
 * @param comSelf 组件的this指向
 * @吴昊
 * */
// function CreateLine(colors, comSelf, prvSelf) {
function CreateLine(props) {
  const { map, colors, gps, gpsTypes, prvSelf } = props;
  const self = this;
  self.map = map;

  let listArr = strReplace(gps).split(';').filter(Boolean);
  let data = [];
  try {
    data = transformationGpsPathArr(Number(gpsTypes), listArr, true);
  } catch (e) {
    errorTips();
    return false;
  }
  let polygon = new AMap.Polyline({
    path: data,
    strokeColor: colors,
    strokeWeight: 3,
    strokeOpacity: 0.9,
    fillOpacity: 0,
    fillColor: 'transparent ',
    // showDir: true
    // zIndex: 50,
  });
  self.map.add(polygon);
  prvSelf.setState({
    polylines: [...prvSelf.state.polylines, polygon],
  });
}
