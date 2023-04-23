import React from 'react';
import config from '@/utils/config';
import { message } from 'antd';
// import src from "../../../../../public/yd/extCharts/kpiChartDriver.html";

const { adminUrl } = config;

class index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    window.message = message;
  }

  render() {
    const urls =
      window.location.href?.indexOf('800') > -1
        ? 'yd/extCharts/kpiChartDriver.html'
        : 'yd/extCharts/kpiChartDriver.html';
    return (
      <div
        style={{
          width: '100%',
          height: 'calc(100vh - 72px)',
          overflow: 'hidden',
        }}
      >
        <iframe
          src={urls}
          style={{ width: '100%', height: '100%', border: 'none' }}
        />
      </div>
    );
  }
}

export default index;
