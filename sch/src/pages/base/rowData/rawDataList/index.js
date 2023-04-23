import React from 'react';
import { connect } from 'umi';
import List from './list';
import Search from './search';
import Modal from './modal';
import dayjs from 'dayjs';
import config from '../../../../utils/config';
import { Card, Checkbox, Popover } from 'antd';
import { CloudDownloadOutlined, SettingOutlined } from '@ant-design/icons';
import './index.less';
import { setBuryingPoint } from '../../../../utils/log/request';
import { downExcel } from '../../../../services/base/rowData/rowDataList';
const tomcatUrl2 = config.tomcatUrl;

/**
 * @desc 原始数据列表
 * @class index
 * @author 吴昊 2020/4/9
 */
class index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orgId: sessionStorage.getItem('orgId') || '1',
      curDate: dayjs().subtract(2, 'days'),
      startTime: dayjs().subtract(5, 'm'),
      endTime: dayjs(),
      visible: false,
      data: [],
      // 表格高度
      tableHeight: 0,
      // 下载时的加载状态
      confirmLoading: false,
      columnLists: [],
      typeVisible: false,
      columns: [],
      selectsData: [],
    };
    this.escapeMap = {
      cheliang_fuhe: {
        0: ' ',
        1: '小负荷',
        2: '中负荷',
        3: '大负荷',
      },
      chesu_state: {
        0: '停车',
        1: '加速',
        2: '匀速',
        3: '减速',
      },
      dangwei: {
        '-1': '倒档',
        0: '空档',
        1: '1档',
        2: '2档',
        3: '3档',
        4: '4档',
        5: '5档',
      },
      dongli_state: {
        '-1': '',
        0: '怠速停车',
        1: '滑行',
        2: '动力行车',
      },
      huandang_state: {
        '-1': ' ',
        0: '0',
        1: '1',
      },
      clutchstate: {
        '-1': ' ',
        1: '半联动',
        2: '结合',
      },
      podao_state: {
        '-1': '下坡',
        0: '平路',
        1: '上坡',
      },
      qibustate: {
        0: ' ',
        1: '起步状态',
      },
      xunhuan_state: {
        0: '循环暂停',
        1: '循环中',
      },
    };
  }

  componentDidMount() {
    // 用户访问埋点
    setBuryingPoint('原始数据列表');
    this.getColumnData();
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'rawDataList/clearState',
    });
  }

  // 通用 effects
  commonHandle(obj) {
    const { dispatch } = this.props;
    dispatch({
      type: 'rawDataList/commonHandle',
      payload: obj,
    });
  }

  // 获取表头数据
  getColumnData(type) {
    this.props.dispatch({
      type: 'rawDataList/getKpiColumn',
      payload: {
        // isKpi: false,
        isKpi: true,
        // escapeMap,
        energyType: 1,
        type: 2,
      },
    });
  }

  // 获取表头
  getKpiColumn(type) {
    // const {escapeMap} = this.state;
    const {
      rawDataList: { carType },
    } = this.props;
    if (type !== carType) {
      this.commonHandle({ carType: type });
    }
  }

  handleOk(value) {
    const self = this;
    const { curDate, startTime, endTime } = self.state;
    const {
      rawDataList: { busValue, carType, queryPager },
    } = self.props;
    const { type, startDate, endDate, carNumber, lineCode } = queryPager;
    let data = [];
    // const formatDate = (date1, startEnd) => {
    //   return (
    //     dayjs(date1).format('YYYY-MM-DD') + dayjs(startEnd).format('HH:mm:ss')
    //   );
    // };
    // const startTimeX = dayjs(
    //   formatDate(curDate, startDate),
    //   'YYYY-MM-DD HH:mm:ss',
    // ).valueOf();
    // const endTimex = dayjs(
    //   formatDate(curDate, endDate),
    //   'YYYY-MM-DD HH:mm:ss',
    // ).valueOf();
    for (let i = 0; i < value.length; i++) {
      data.push(value[i].dataIndex);
    }
    let datas = data.join(',');
    let str = '';
    // if (datas.indexOf("time_date") > -1) {
    //   let tiHuan = datas.replace(new RegExp("time_date", 'gm'), 'curdate;curtime');
    //   str = tiHuan.replace(new RegExp(",", 'gm'), ';');
    // } else {
    str = datas.replace(new RegExp(',', 'gm'), ';');
    // }

    // 下载按钮的加载状态
    self.setState({
      confirmLoading: true,
    });
    const params = `${str},${lineCode},${carNumber},${startDate},${endDate},1,params&type=${
      type || 2
    }`;
    downExcel({
      param: params,
      fileName: '原始数据列表.xlsx',
      callback: () => {
        self.setState({
          confirmLoading: false,
          visible: false,
        });
      },
    });
  }
  // 导出CSV
  handleExportCsv = () => {
    this.setState({
      visible: true,
    });
  };

  render() {
    const self = this;
    const { dispatch, rawDataList } = this.props;
    const {
      loading,
      queryPager,
      pagination,
      columnList,
      list,
      lineValue,
      busValue,
      columnsData,
      selects,
    } = rawDataList;
    const {
      curDate,
      startTime,
      endTime,
      visible,
      data,
      confirmLoading,
      tableHeight,
      columnLists,
    } = this.state;

    const searchProps = {
      refs: (node) => {
        self.search = node;
      },
      handleSubmit: (formValue) => {
        const { fleet, plateNumber = '', type } = formValue;
        const { startTimeX, endTimeX } = getDate(formValue);
        const carArr = plateNumber?.split(',') || [];

        dispatch({
          type: 'rawDataList/getKpiColumn',
          payload: {
            // isKpi: false,
            isKpi: true,
            // escapeMap,
            energyType: 1,
            type: type,
          },
        });
        dispatch({
          type: 'rawDataList/getByPage',
          payload: {
            withTotal: true,
            pageIndex: 1,
            pageSize: queryPager.pageSize,
            energyType: 1,

            lineName: carArr[0] || '123',
            lineCode: carArr[1] || '123',
            carNumber: carArr[2] || '123',

            startDate: startTimeX,
            endDate: endTimeX,
            type,
          },
        });
        // self.commonHandle({ selects: [], columnList: [], columnsData: [] });
      },
    };

    // 列表的props
    const listProps = {
      tableBtnRefs: (node) => {
        self.tableBtn = node;
      },
      selects: selects,
      tableHeight,
      prevSelf: self,
      loading,
      // columns: columnLists.length === 0 ? columnList : columnLists,
      columns: columnList,
      dataSource: list,
      pagination,
      onChange: function (pagination) {
        let queryPagers = Object.assign({}, queryPager);
        queryPagers.pageIndex = pagination.current;
        queryPagers.pageSize = pagination.pageSize;
        dispatch({
          type: 'rawDataList/getByPage',
          payload: {
            ...queryPagers,
          },
        });
      },
    };

    const modalProps = {
      curDate,
      startTime,
      endTime,
      data,
      lineValue,
      busValue,
      visible,
      confirmLoading,
      list: columnList,
      handleCancel: () => {
        self.setState({
          visible: false,
        });
      },
      handleOk: this.handleOk.bind(this),
    };
    const proHtml = columnsData?.map((item) => {
      return {
        label: item,
        value: item,
      };
    });
    return (
      <div id="rawDataList" className="content-box-bg">
        <Search {...searchProps} />
        <Card
          size="small"
          title="原始数据列表"
          hoverable={false}
          bodyStyle={{
            padding: 0,
          }}
          style={{
            width: 'calc(100% - 28px)',
            marginTop: '10px',
            margin: '10px 14px 0',
          }}
          extra={
            <div className="cardExtra">
              <a onClick={this.handleExportCsv}>
                <CloudDownloadOutlined />
                excel下载
              </a>
              <Popover
                content={
                  <Checkbox.Group
                    className="rawDataPopover"
                    options={proHtml}
                    value={selects}
                    style={{
                      width: '200px',
                      overflow: 'auto',
                      height: '500px',
                    }}
                    onChange={(selects) => {
                      this.commonHandle({ selects });
                    }}
                  />
                }
                trigger="click"
                placement="bottomRight"
              >
                <a>
                  <SettingOutlined />
                  配置列
                </a>
              </Popover>
            </div>
          }
        >
          <List {...listProps} />
        </Card>
        {visible ? <Modal {...modalProps} /> : null}
      </div>
    );
  }
}

function mapStateToProps({ rawDataList }) {
  return { rawDataList };
}

export default connect(mapStateToProps)(index);

function getDate(formValue) {
  const { date, startTime, endTime } = formValue;
  const formatDate = (date1, startEnd) => {
    return (
      dayjs(date1).format('YYYY-MM-DD ') + dayjs(startEnd).format('HH:mm:ss')
    );
  };
  const startTimeX = dayjs(
    formatDate(date, startTime),
    'YYYY-MM-DD HH:mm:ss',
  ).format('x');
  const endTimeX = dayjs(
    formatDate(date, endTime),
    'YYYY-MM-DD HH:mm:ss',
  ).format('x');
  return {
    startTimeX,
    endTimeX,
  };
}
