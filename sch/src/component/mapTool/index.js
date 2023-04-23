import React from 'react';
import { Dropdown, Menu } from 'antd';
import AddMapMarker from './addMarker';
import CustomPath from './customPath';
import { transformationGpsGD } from './tool';
import ReactDOM from 'react-dom';

const AMap = window.AMap;
window.markerRule = null;

/**
 * 在地图上查看线路的区间
 * */
class IndexMap extends React.Component {
  constructor(props) {
    super(props);
    // 获取当前时间戳
    this.unixTime = new Date().getTime();
    this.state = {
      // 是否开启最大化
      maximize: false,
      // 弹窗是否显示
      visible: '',

      // 存储点的地图marker组对象
      overlayGroups: [],
      // 海亮点的存储对象
      pointSimplifierIns: [],
      // 串成的线
      polylines: [],

      // 规划路径 - 路径地图对象
      customPathMap: null,

      // 鼠标绘制图形
      mouseTool: null,
      // 存储鼠标绘制好的图形
      overlays: [],
      // 鼠标绘图方式
      mouseEditor: null,
      // 测距地图对象
      rule: null,
      // 画图，图形的右键
      contextMenu: null,
      map: null,
    };
  }

  componentDidMount() {
    const self = this;
    setTimeout(function () {
      self.initMap();
    }, 100);
  }

  componentWillUnmount() {
    // 当不是被引入组件时，才会主动去销毁地图
    if (!this.props.maps) {
      // 销毁地图，并清空地图容器
      if (this.aMap) this.aMap.destroy();
    }
  }

  // 判断是否初始化本组件内部的地图
  checkInitMAp = () => {
    const { maps = null } = this.props;
    return maps
      ? maps
      : AMap.Map('map_' + this.unixTime, {
          resizeEnable: true,
          center: [118.102725, 24.490469],
          zoom: 12,
        });
  };

  initMap() {
    const self = this;
    let map = self.checkInitMAp();
    AMap.plugin(
      [
        'AMap.ToolBar',
        'AMap.Scale',
        'AMap.RangingTool',
        'AMap.MouseTool',
        'AMap.PolyEditor',
        'AMap.RectangleEditor',
        'AMap.Autocomplete',
        'AMap.Driving',
      ],
      function () {
        // // 加载工具条
        // map.addControl(new AMap.ToolBar());
        // Scale
        map.addControl(new AMap.Scale());
        // 鼠标绘制
        let mouseTool = new AMap.MouseTool(map);
        mouseTool.on('draw', (e) => {
          let overlays = self.state.overlays;
          overlays.push(e.obj);
          self.setState(
            {
              overlays,
            },
            () => {
              // console.log(self.state);
              self.monitorMouseGetDrawType(e.obj);
            },
          );
        });
        // 测距插件
        let rule = new AMap.RangingTool(map);
        // 创建右键菜单
        let contextMenu = new AMap.ContextMenu();
        // 右键保存
        contextMenu.addItem(
          '保存区域',
          () => {
            self.handleSaveRegion();
          },
          0,
        );

        self.setState({
          mouseTool,
          rule,
          contextMenu,
          map,
        });
      },
    );

    this.aMap = map;
  }

  // 开启地图最大化
  openMaximize = () => {
    this.setState({
      maximize: !this.state.maximize,
    });
    // 如果是被引入，则可以对引入方进行最大化最小化控制
    // eslint-disable-next-line no-unused-expressions
    this.props.openMaximize?.(!this.state.maximize);
  };

  // 清除下拉
  handleClearOption = (key) => {
    if (key === '1') {
      // 清除添加的点、海量点
      this.clearAddMarker();
    } else if (key === '2') {
      // 清除所有的鼠标画图
      this.clearMouseTool();
    } else if (key === '3') {
      // 清除路径规划
      this.clearCustomPath();
    } else if (key === '4') {
      // 清除以上
      this.clearAddMarker();
      this.clearMouseTool();
      this.clearCustomPath();
    }
  };

  // 工具下拉
  handleToolOption = (key) => {
    // this.closeMouseTool();
    this.closeRule();

    if (key === '1') {
      // 添加点
      this.openAddModal();
    } else if (key === '2') {
      // 路径规划
      this.openCustomPath();
    } else if (key === '3') {
      // 画多边形
      this.monitorMouse('polygon');
    } else if (key === '4') {
      // 画矩形
      this.monitorMouse('rectangle');
    } else if (key === '8') {
      // 画点
      this.monitorMouse('marker');
    } else if (key === '5') {
      // 关闭画图
      this.closeMouseTool();
    } else if (key === '6') {
      this.state.mouseTool && this.state.mouseTool.close();
      // 测量距离
      this.handleOpenRule();
    } else if (key === '7') {
      // 面积测量
      this.monitorMouse('measureArea');
    }
  };

  // 打开弹窗
  openAddModal = () => {
    this.setState({
      visible: 'AddMapMarker',
    });
  };

  // 清除添加的点和海量点
  clearAddMarker = () => {
    const {
      overlayGroups = [],
      pointSimplifierIns = [],
      polylines = [],
    } = this.state;
    this.aMap.remove([...overlayGroups, ...polylines]);
    this.aMap.clearInfoWindow();
    pointSimplifierIns.forEach((item) => {
      item.setData([]);
    });
    this.setState({
      overlayGroups: [],
      pointSimplifierIns: [],
      polylines: [],
    });
  };

  // 打开自定义路径的规划
  openCustomPath = () => {
    this.setState({
      visible: 'CustomPath',
    });
  };
  // 清除路径
  clearCustomPath = () => {
    const { customPathMap } = this.state;
    if (customPathMap) {
      customPathMap.clear();
    }
  };

  // 鼠标画点的时候，鼠标变十字
  handleMapOpenCursor = () => {
    const aMapHtml = this.aMap.getContainer();
    if (aMapHtml) {
      aMapHtml.className = aMapHtml.className + ' add-marker-cursor';
    }
  };

  // 不是鼠标画点的时候，关闭鼠标十字
  handleMapCloseCursor = () => {
    const aMapHtml = this.aMap.getContainer();
    if (aMapHtml) {
      aMapHtml.className = aMapHtml.className.replace(' add-marker-cursor', '');
    }
  };

  // 监听鼠标绘制工具的类型，并开启绘制
  monitorMouse = (type) => {
    const self = this;
    const { mouseTool } = this.state;
    switch (type) {
      case 'marker': {
        mouseTool.marker({
          // 同Marker的Option设置
        });
        break;
      }

      case 'polygon': {
        mouseTool.polygon({
          fillColor: '#00b0ff',
          strokeColor: '#80d8ff',
          // 同Polygon的Option设置
        });
        break;
      }

      case 'rectangle': {
        mouseTool.rectangle({
          fillColor: '#00b0ff',
          strokeColor: '#80d8ff',
          // 同Polygon的Option设置
        });
        break;
      }

      case 'measureArea': {
        mouseTool.measureArea({
          strokeColor: '#80d8ff',
          fillColor: '#80d8ff',
          fillOpacity: 0.3,
          // 同 Polygon 的 Option 设置
        });
        break;
      }
    }
    // const {mouseEditor} = this.state;
    if (type === 'marker') {
      self.handleMapOpenCursor();
    } else {
      self.handleMapCloseCursor();
    }
    self.setState({
      mouseEditor: type,
    });
  };

  // 获取类型
  monitorMouseGetDrawType = (obj) => {
    // let self = this;
    let Editor = null;

    // 绘制对象添加默认属性
    obj.editorId = new Date().getTime();

    // 多边形
    if (obj.CLASS_NAME.indexOf('Polygon') > -1) {
      Editor = new AMap.PolyEditor(this.aMap, obj);
    } else if (obj.CLASS_NAME.indexOf('Rectangle') > -1) {
      // 矩形
      Editor = new AMap.RectangleEditor(this.aMap, obj);
    }

    if (Editor && ['measureArea'].indexOf(this.state.mouseEditor) === -1) {
      Editor.open();
      obj.editorSstate = true;
      obj.Editor = Editor;

      // 关闭上次的编辑状态
      this.clearMouseState(obj);

      obj.on('click', () => {
        // 关闭上次的编辑状态
        this.clearMouseState(obj);

        if (obj.editorSstate) {
          obj.editorSstate = false;
          Editor.close();
        } else {
          obj.editorSstate = true;
          Editor.open();
        }
        // window.drawParent = Editor;
      });

      // 绑定鼠标右击事件——保存弹窗
      obj.on('rightclick', (e) => {
        const { gaodeArr } = this.getMouseObj(obj);
        this.setState(
          {
            saveGpsObj: {
              gaodeArr,
            },
          },
          () => {
            this.state.contextMenu.open(this.aMap, e.lnglat);
          },
        );
      });
    }

    // 如果是添加点
    let isMarker = obj.CLASS_NAME.indexOf('Marker') > -1;
    if (isMarker) {
      obj.on('click', () => {
        const positions = obj.getPosition();
        const lnglat = transformationGpsGD(2, [positions.lng, positions.lat]);
        let content = `<div><b>gps</b>：${lnglat.gps[0].toFixed(
          8,
        )},${lnglat.gps[1].toFixed(8)} </div>`;
        content += `<div><b>高德</b>：${lnglat.gaode[0].toFixed(
          8,
        )},${lnglat.gaode[1].toFixed(8)} </div>`;
        content += `<div><b>百度</b>：${lnglat.baidu[0].toFixed(
          8,
        )},${lnglat.baidu[1].toFixed(8)} </div>`;
        content += `<div id="deleteMarker2"></div>`;
        const infoWindow = new AMap.InfoWindow({
          offset: new AMap.Pixel(0, -30),
        });

        infoWindow.setContent(`<div class="mapAlerts">${content}</div>`);
        infoWindow.open(this.aMap, obj.getPosition());
        setTimeout(() => {
          ReactDOM.render(
            <a
              onClick={() => {
                infoWindow.close();
                this.aMap.remove(obj);
              }}
            >
              删除该点
            </a>,
            document.getElementById('deleteMarker2'),
          );
        }, 50);
      });
    }

    // 关闭鼠标操作
    !isMarker && this.state.mouseTool && this.state.mouseTool.close();

    this.setState({
      mouseEditor: isMarker ? 'marker' : undefined,
    });
  };

  // 清除上次编辑的的清除状态
  clearMouseState = (obj = undefined) => {
    const { loadRegion, overlays = [] } = this.state;
    loadRegion && loadRegion.editorClose();
    overlays.forEach((item) => {
      if (obj === undefined || item.editorId !== obj.editorId) {
        item.editorSstate = false;
        item.Editor && item.Editor.close();
      }
    });
  };

  // 关闭鼠标绘制功能
  closeMouseTool = () => {
    this.state.overlays.forEach((item) => {
      item.visible = false;
      item.Editor && item.Editor.close();
    });
    this.handleMapCloseCursor();
    this.state.mouseTool && this.state.mouseTool.close();
  };

  // 清除所有的鼠标绘图
  clearMouseTool = () => {
    this.closeMouseTool();
    this.state.mouseTool && this.state.mouseTool.close(true);
    this.setState({
      overlays: [],
    });
    this.aMap.clearInfoWindow();
  };

  // 开启测距
  handleOpenRule = () => {
    const { rule, map } = this.state;
    const arr = [];
    rule.on('addnode', (e) => {
      const data = new AMap.LngLat(e.position.lng, e.position.lat);
      arr.push(data);
    });
    rule.turnOn();
    rule.on('end', () => {
      if (window.markerRule) {
        map.remove(window.markerRule);
      }
      map.off('mousemove', ruleMove);
      map.off('click', ruleClick);
      window.markerRule = null;
      this.closeRule();
    });
    map.on('rightclick', function () {
      if (window.markerRule) {
        map.remove(window.markerRule);
      }
      map.off('mousemove', ruleMove);
      window.markerRule = null;
    });

    function ruleClick() {
      map.on('mousemove', ruleMove);
    }

    map.on('click', ruleClick);

    function ruleMove(e) {
      const lng = e.lnglat.getLng();
      const lat = e.lnglat.getLat();
      const data = new AMap.LngLat(lng, lat);
      // arr.push(data);
      // const distances = Math.round(AMap.GeometryUtil.distanceOfLine(arr));
      if (window.markerRule) {
        map.remove(window.markerRule);
      }
      if (arr.length > 0) {
        const lnglat = arr[arr.length - 1];
        // const a = new AMap.LngLat(lngLat[0], lngLat[1]);
        const distance = Math.round(lnglat.distance(data));
        const markerContent =
          '' +
          '<div class="custom-content-marker">' +
          // '   <img src="//a.amap.com/jsapi_demos/static/demo-center/icons/dir-via-marker.png">' +
          '</div>';
        // 创建点实例
        window.markerRule = new AMap.Marker({
          // position: [station.lng, station.lat],
          position: [lng, lat],
          offset: new AMap.Pixel(-5, -8),
          content: markerContent,
        });
        const htmls = [
          '<div class=\'infoBoxContent\' style="line-height: 12px;font-size: 12px;padding: 0;margin: 0">',
          '<div style="margin-top: -5px">总长:<span  style="color: red;font-weight: 600;font-size: 14px">' +
            distance +
            '米</span>' +
            '</div>',
          '<div style="margin-top: -5px">单击继续；双击或右键结束</div>',
          '</div>',
        ];
        window.markerRule.setLabel({
          offset: new AMap.Pixel(0, 0), // 设置文本标注偏移量
          // content: '<span style=\"color: red;font-size: 12px\">' + (distance) + "米</span>", // 设置文本标注内容
          content: htmls.join('<br>'), // 设置文本标注内容
          direction: 'right', // 设置文本标注方位
        });
        map.add(window.markerRule);
      }
    }

    map.on('mousemove', ruleMove);
    this.setState({
      mouseEditor: 'rule',
    });
  };

  // 关闭测量距离
  closeRule = () => {
    // 关闭测距
    this.state.rule.turnOff();
    this.setState({
      mouseEditor: undefined,
    });
  };

  // 如果是被引入的，则不需要设定高度
  checkImportCss = () => {
    const self = this;
    let result = {};
    if (!this.props.maps) {
      result = {
        width: '100%',
        height: self.state.maximize
          ? '100%'
          : `calc(100vh - ${self.getSearchHeight()}px - 96px)`,
      };
    }
    return result;
  };

  // 获取查询条件的高度
  getSearchHeight = () => {
    const { searchRef = null } = this.props;
    if (searchRef) {
      return searchRef.offsetHeight || 236;
    }
    return 140;
  };

  render() {
    const self = this;
    const { maps = null, expand = [] } = this.props;
    const {
      maximize,
      visible,
      overlayGroups,
      pointSimplifierIns,
      customPathMap,
    } = this.state;

    // 清除下拉
    const clearMenu = (
      <Menu onClick={({ key }) => this.handleClearOption(key)}>
        <Menu.Item key="1">清除添加的点</Menu.Item>
        <Menu.Item key="2">清除画图形状</Menu.Item>
        <Menu.Item key="3">清除路径规划</Menu.Item>
        <Menu.Item key="4">清除以上所有</Menu.Item>
      </Menu>
    );

    // 工具下拉
    const toolMenu = (
      <Menu onClick={({ key }) => this.handleToolOption(key)}>
        <Menu.Item key="1">
          <span className="iconfont icon-ditu" title="添加点" />
          添加点
        </Menu.Item>
        <Menu.Item key="2">
          <span className="iconfont icon-lujing" title="自定义路径规划" />
          路径规划
        </Menu.Item>
        <Menu.Item key="3">
          <span className="iconfont icon-duobianxing" title="画多边形" />
          画多边形
        </Menu.Item>
        <Menu.Item key="4">
          <span className="iconfont icon-juxing" title="画矩形" />
          画矩形
        </Menu.Item>
        <Menu.Item key="8">
          <span className="iconfont icon-dingwei2" title="画点" />
          画点
        </Menu.Item>
        <Menu.Item key="5">
          <span className="iconfont icon-shouzhi" title="关闭画图" />
          关闭画图
        </Menu.Item>
        <Menu.Item key="6">
          <span className="iconfont icon-juli" title="测量距离" />
          测量距离
        </Menu.Item>
        <Menu.Item key="7">
          <span className="iconfont icon-mianji" title="面积测量" />
          面积测量
        </Menu.Item>
      </Menu>
    );

    // 添加点
    const addMarkerProps = {
      map: self.aMap,
      prvSelf: self,
      visible: visible === 'AddMapMarker',
      overlayGroups,
      pointSimplifierIns,
      handleCancel: () => {
        this.setState({
          visible: '',
        });
      },
    };

    // 路径规划
    const customPathProps = {
      prvSelf: self,
      visible: visible === 'CustomPath',
      customPathMap,
      clearCustomPath: () => {
        this.clearCustomPath();
      },
      handleCancel: () => {
        this.setState({
          visible: '',
        });
      },
    };

    return (
      <div
        className={'mapTool ' + (!maps && maximize ? 'MaximizeWindows' : '')}
        // style={this.checkImportCss}
      >
        <div className="mapToolBox">
          <div className="tool">
            <Dropdown overlay={toolMenu} trigger={['click']}>
              <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                <span className="iconfont icon-dadian" />
                打点工具
              </a>
            </Dropdown>
            {/*<i />*/}
          </div>

          <div className="tool">
            <Dropdown
              overlay={clearMenu}
              trigger={['click']}
              placement="bottomRight"
            >
              <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                <span className="iconfont icon-ditushanjian" />
                地图清除
              </a>
            </Dropdown>
            {/*<i />*/}
          </div>

          {expand}

          {/*<div className="tool" onClick={this.openMaximize}>*/}
          {/*  <span style={{ marginRight: 2 }}>*/}
          {/*    <Icon*/}
          {/*      type={maximize ? 'fullscreen-exit' : 'fullscreen'}*/}
          {/*      title={maximize ? '地图最小化' : '地图最大化'}*/}
          {/*    />*/}
          {/*  </span>*/}
          {/*  <span>{maximize ? '地图最小化' : '地图最大化'}</span>*/}
          {/*</div>*/}
        </div>

        {maps ? null : (
          <div
            id={'map_' + this.unixTime}
            style={{
              border: '1px solid #ddd',
              width: '100%',
              height: '100%',
              minHeight: 340,
            }}
          />
        )}

        {visible === 'AddMapMarker' ? (
          <AddMapMarker {...addMarkerProps} />
        ) : null}
        {visible === 'CustomPath' ? <CustomPath {...customPathProps} /> : null}
      </div>
    );
  }
}

export default IndexMap;
