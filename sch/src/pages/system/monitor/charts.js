import * as echarts from 'echarts';

export function initChart(props) {
  const { id, num = 0 } = props;
  var chartDom = document.getElementById(id);
  var myChart = echarts.init(chartDom);
  var option;

  option = {
    tooltip: {
      formatter: '{a} <br/>{b} : {c}%',
    },
    series: [
      {
        name: '使用率',
        type: 'gauge',
        color: getColor(num),
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        progress: {
          show: true,
        },
        pointer: {
          show: false,
          width: 10,
        },
        axisLine: {
          lineStyle: {
            width: 10,
          },
        },
        detail: {
          valueAnimation: false,
          width: '60%',
          lineHeight: 40,
          borderRadius: 8,
          offsetCenter: [0, 0],
          fontSize: 20,
          fontWeight: 'bolder',
          formatter: '{value}%',
          color: 'inherit',
        },
        data: [
          {
            value: num,
            // name: '使用率',
          },
        ],
      },
    ],
  };

  option && myChart.setOption(option);
}

export function getColor(num = 0) {
  const cnt = Number(num);
  if (cnt <= 50) {
    return '#87c872';
  } else if (cnt <= 75) {
    return '#fcbf58';
  } else {
    return '#e01c49';
  }
}
