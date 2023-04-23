import React from "react";
import { Col, Progress, Row } from "antd";
import { getColor } from "@/pages/system/monitor/charts";

/***
 * @desc 磁盘信息
 * **/
const FileInfo = (props) => {
  const { sysFiles = [] } = props || {};

  const list = sysFiles.map((item) => {
    const pro = item?.usage ?? 0;
    const color = getColor(pro);
    return (
      <>
        <Col span={5}>{item?.dirName ?? '--'}</Col>
        <Col span={5}>{item?.total ?? '--'}</Col>
        <Col span={5}>{item?.used ?? '--'}</Col>
        <Col span={5}>{item?.free ?? '--'}</Col>
        {/*<Col span={5}>{item?.usage ?? '--'}</Col>*/}
        <Col span={5}>
          <Progress percent={pro} strokeColor={color} />
        </Col>
      </>
    );
  });

  return (
    <>
      <Row gutter={0}>
        <Col span={5}>磁盘名称</Col>
        <Col span={5}>大小</Col>
        <Col span={5}>已用</Col>
        <Col span={5}>可用</Col>
        <Col span={5}>利用率</Col>
        {/*<Col span={16}>{sysFiles?.computerName ?? '--'}</Col>*/}
        {list}
      </Row>
    </>
  );
};
export default FileInfo;
