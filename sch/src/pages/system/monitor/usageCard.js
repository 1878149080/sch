import React, { useEffect } from "react";
import { Col, Row } from "antd";
import { initChart } from "@/pages/system/monitor/charts";

/**
 * @desc 使用率
 * */
const UsageCard = (props) => {
  const { type, data, id } = props;
  const { c1, c1V, c2, c2V, num = 0 } = getTypeData(type, data);

  useEffect(() => {
    initChart({
      id,
      num,
    });
  }, [data]);

  return (
    <div className="chart-box">
      <div className="chart" id={id}></div>
      {/*<div className="chart" id="monitor-chart1"></div>*/}
      <Row gutter={0}>
        <Col span={12} style={{ textAlign: 'right', paddingRight: 25 }}>
          {c1}
        </Col>
        <Col span={12} style={{ paddingLeft: 25 }}>
          {c1V ?? '--'}
        </Col>
        <Col span={12} style={{ textAlign: 'right', paddingRight: 25 }}>
          {c2}
        </Col>
        <Col span={12} style={{ paddingLeft: 25 }}>
          {c2V ?? '--'}
        </Col>
      </Row>
      {/*<Descriptions column={1}>*/}
      {/*  <Descriptions.Item label={c1}>{c1V ?? '--'}</Descriptions.Item>*/}
      {/*  <Descriptions.Item label={c2}>{c2V ?? '--'}</Descriptions.Item>*/}
      {/*</Descriptions>*/}
    </div>
  );
};
export default UsageCard;

// 根据类型获取数据
function getTypeData(type, data) {
  if (type === 1) {
    const { cpuBasicFrequency, cpuNum, used } = data?.cpu ?? {};
    return {
      c1: 'CPU主频',
      c1V: cpuBasicFrequency,
      c2: '核心数',
      c2V: cpuNum,
      num: used,
    };
  } else if (type === 2) {
    const { total, used, usage, moreTotal, moreUsed } = data?.mem ?? {};
    return {
      c1: '总内存',
      // c1V: (moreTotal ?? "--") + 'G',
      c1V: (moreTotal ? (moreTotal / 1024 / 1024).toFixed(2) : "--") + 'G',
      c2: '已用内存',
      c2V: (moreUsed ? (moreUsed / 1024 / 1024).toFixed(2) : "--") + 'G',
      num: usage,
    };
  } else if (type === 3) {
    const { total, used, usedRate, usage } = data?.jvm ?? {};
    return {
      c1: 'JVM大小',
      c1V: (total ?? "--") + 'M',
      c2: '已用JVM',
      c2V: (used ?? "--") + 'M',
      // num: usedRate,
      num: usage ?? 0,
    };
  } else if(type === 4) {
    const { total, used, usedRate, usage } = data?.sysFileCountDo ?? {};
    return {
      c1: '磁盘大小',
      c1V: (total ?? "--") + 'G',
      c2: '已用大小',
      c2V: (used ? used.toFixed(2) : "--") + 'G',
      // num: usedRate,
      num: usage ?? 0,
    };
  }
}
