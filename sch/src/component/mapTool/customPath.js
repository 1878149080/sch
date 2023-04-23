import React, { useState } from 'react';
import {
  Alert,
  AutoComplete,
  Button,
  Col,
  Form,
  Input,
  message,
  Modal,
  Radio,
  Row,
  Table,
} from 'antd';
import coordtransform from 'coordtransform';

const AMap = window.AMap;

/**
 * 自定义路径
 * @吴昊
 * 2020-08-05
 * */
const AddMapMarker = (props) => {
  const [form] = Form.useForm();

  // 坐标类型
  const [gpsTypes, setGpsTypes] = useState('1');
  // 展现方式
  const [markerType, setMarkerType] = useState('1');
  // 坐标
  const [gps, setGps] = useState('');
  // 表格数据
  const [dataSource, setDataSource] = useState([]);
  // 地理名称下拉
  const [autoComplete, setAutoComplete] = useState([]);
  // 点击时的弹窗对象
  let infoWindow = new AMap.InfoWindow({ offset: new AMap.Pixel(0, -30) });

  // 根据条件往表格中添加数据
  const addTableData = (values) => {
    const { gps, gpsTypes } = values;
    const a = gps.split(';');
    const b = gps.split('；');
    if (['', null, undefined].indexOf(gps) > -1) {
      message.error('经纬度或者地理名称未填写!');
      return false;
    } else if (
      a.length > 2 ||
      b.length > 2 ||
      (a[1] && a[1].length > 0) ||
      (b[1] && b[1].length > 0)
    ) {
      message.error('经纬度每次只能输入一对！');
      return false;
    } else if (gpsTypes.length <= 16) {
      // const { dataSource } = this.state;
      // const { setFieldsValue } = this.props.form;
      let temData = [].concat(dataSource);
      temData.push({
        id: dataSource.length + 1,
        place: gps,
        gpsType: gpsTypes,
      });
      setDataSource(temData);

      // 清空输入框
      form.setFieldsValue({
        gps: '',
      });
    } else if (gpsTypes.length > 16) {
      message.error('最多输入16组坐标!');
    }
  };

  // 删除单条数据
  const deletePlace = (record) => {
    setDataSource(dataSource.filter((item) => item.id !== record.id));
  };

  // 清空表格
  const clearTable = () => {
    setDataSource([]);
  };

  // 地点的实时模糊查询
  const onSearch = (searchText) => {
    let autoOptions = {
      city: '厦门',
    };
    let autoComplete = new AMap.Autocomplete(autoOptions);
    autoComplete.search(searchText, function (status, result) {
      let data = [];
      if (result.info === 'OK') {
        let tips = result.tips || [];
        for (let i = 0; i < tips.length; i++) {
          let item = tips[i];
          data.push(item.name);
        }
      }
      setAutoComplete(data);
    });
  };

  // 确定 - 准备生成路径
  const handleOk = () => {
    const { prvSelf, clearCustomPath, handleCancel } = props;
    clearCustomPath();
    prvSelf.setState({
      customPathMap: new CustomPathDriving(dataSource, prvSelf.aMap),
    });
    handleCancel();
  };

  const self = this;
  const { visible, handleCancel } = props;

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  const columns = [
    {
      title: '序号',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '地点/经纬度',
      dataIndex: 'place',
      key: 'place',
    },
    {
      title: '坐标类型',
      dataIndex: 'gpsType',
      key: 'gpsTypes',
      render(text, record, index) {
        return text === '1' ? 'GPS' : text === '2' ? '高德坐标' : '地理名称';
      },
    },
    {
      title: '操作',
      dataIndex: 'caozuo',
      key: 'caozuo',
      render: (text, record, index) => {
        return <a onClick={() => self.deletePlace(record)}>删除</a>;
      },
    },
  ];

  return (
    <Modal
      title="自定义路径规划"
      open={visible}
      onOk={handleOk}
      onCancel={() => handleCancel()}
      width={950}
      bodyStyle={{
        padding: 10,
      }}
      destroyOnClose
      maskClosable
      centered
    >
      <Alert
        description="坐标与地理名称不能混用,每次只能添加一个坐标或者地理名称！例如，地理名称如：厦门站。坐标如:116.22,28.444;"
        type="success"
        closable
      />
      <Form onFinish={addTableData} style={{ marginTop: 10 }}>
        <Row gutter={6}>
          {gpsTypes !== '3' ? (
            <Col span={8}>
              <Form.Item
                label="经纬度"
                name="gps"
                {...formItemLayout}
                rules={[
                  {
                    required: true,
                    message: '请输入经纬度!',
                  },
                ]}
              >
                <Input placeholder="经度,纬度" maxLength={50} />
              </Form.Item>
            </Col>
          ) : (
            <Col span={8}>
              <Form.Item
                label="地理名称"
                name="gps"
                {...formItemLayout}
                rules={[
                  {
                    required: true,
                    message: '请输入地理名称!',
                  },
                ]}
              >
                <AutoComplete
                  dataSource={autoComplete}
                  onSearch={onSearch}
                  placeholder="请输入地理名称"
                />
              </Form.Item>
            </Col>
          )}

          <Col span={10}>
            <Form.Item
              label="坐标类型"
              name="gpsTypes"
              initialValue={'1'}
              {...formItemLayout}
            >
              <Radio.Group onChange={(e) => setGpsTypes(e.target.value)}>
                <Radio value="1">GPS坐标</Radio>
                <Radio value="2">高德坐标</Radio>
                <Radio value="3">地理名称</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                // width: '80px',
                // height: '36px',
                marginTop: '2px',
              }}
            >
              添加
            </Button>
            <Button
              type="primary"
              style={{
                // width: '80px',
                // height: '36px',
                marginTop: '2px',
                marginLeft: 10,
              }}
              onClick={clearTable}
            >
              清空表格
            </Button>
          </Col>
        </Row>
      </Form>
      <div>
        <Table
          columns={columns}
          dataSource={dataSource}
          size="small"
          rowKey={(record) => record.id + record.place + record.gpsType}
          pagination={false}
        />
      </div>
    </Modal>
  );
};

export default AddMapMarker;

// 根据自定义名称规划驾车导航路线
function CustomPathDriving(arr, maps) {
  let drivingOption = {
    policy: AMap.DrivingPolicy.LEAST_DISTANCE,
    ferry: 1, // 是否可以使用轮渡
    map: maps,
    hideMarkers: false, // 设置隐藏路径规划的起始点图标,true：隐藏
    showTraffic: false, // 设置是否显示实时路况。true: 显示
    // autoFitView: false // 设置规划结束后，自动调整视野。 true：启用自动调整
  };

  // 构造路线导航类
  let driving = new AMap.Driving(drivingOption);
  let list = [];

  // 按照地理名称导航
  if (arr[0].gpsType === '3') {
    for (let i = 0; i < arr.length; i++) {
      let item = arr[i];
      list.push({
        keyword: item.place,
        city: '厦门',
      });
    }
    // 根据地理名称规划驾车导航路线
    driving.search(list, function (status, result) {
      if (status === 'complete') {
        console.log('自定义路径，绘制驾车路线完成');
      } else {
        console.error('自定义路径，获取驾车数据失败：' + result);
      }
    });
  } else {
    // 按照坐标查询
    for (let i = 0; i < arr.length; i++) {
      list.push(zhuanHuanZuoBiao(arr[i]));
    }
    // 根据起终点经纬度规划驾车导航路线
    driving.search(
      list[0],
      list[list.length - 1],
      {
        waypoints: list.length === 2 ? [] : list.slice(1, -1),
      },
      function (status, result) {
        if (status === 'complete') {
          console.log('自定义路径，绘制驾车路线完成');
        } else {
          console.error('自定义路径，获取驾车数据失败：' + result);
        }
      },
    );
  }

  return driving;
}

// 自定添加路径 - 转换路径的坐标
function zhuanHuanZuoBiao(obj) {
  let gaoDe = [];
  if (obj.gpsType === '1') {
    let tem = obj.place.replace(';', '').split(',');
    gaoDe = coordtransform.wgs84togcj02(tem[0], tem[1]);
    gaoDe = new AMap.LngLat(gaoDe[0], gaoDe[1]);
  } else {
    gaoDe = obj.place.replace(';', '').split(',');
    gaoDe = new AMap.LngLat(gaoDe[0], gaoDe[1]);
  }
  return gaoDe;
}
