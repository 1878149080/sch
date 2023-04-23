import React from "react";
import { Col, Row } from "antd";

/***
 * @desc 服务器信息
 * **/
const SeverInfo = (props) => {
  const { sys } = props;
  return (
    <>
      <Row gutter={0}>
        <Col span={8}>服务器名称</Col>
        <Col span={16}> {sys?.computerName ?? '--'}</Col>
        <Col span={8}>操作系统</Col>
        <Col span={16}>{sys?.osName ?? '--'}</Col>

        <Col span={8}>服务器IP</Col>
        <Col span={16}>{sys?.computerIp ?? '--'}</Col>
        <Col span={8}>系统架构</Col>
        <Col span={16}>{sys?.osArch ?? '--'}</Col>
        <Col span={8}>CPU</Col>
        <Col span={16}>{sys?.cpu ?? '--'}</Col>
      </Row>

      {/*<Descriptions column={1}>*/}
      {/*  <Descriptions.Item label="服务器名称">*/}
      {/*    {sys?.computerName ?? '--'}*/}
      {/*  </Descriptions.Item>*/}
      {/*  <Descriptions.Item label="操作系统">*/}
      {/*    {sys?.osName ?? '--'}*/}
      {/*  </Descriptions.Item>*/}
      {/*  <Descriptions.Item label="服务器IP">*/}
      {/*    {sys?.computerIp ?? '--'}*/}
      {/*  </Descriptions.Item>*/}
      {/*  <Descriptions.Item label="系统架构">*/}
      {/*    {sys?.osArch ?? '--'}*/}
      {/*  </Descriptions.Item>*/}
      {/*  <Descriptions.Item label="CPU">*/}
      {/*    {sys?.cpu ?? '--'}*/}
      {/*  </Descriptions.Item>*/}
      {/*</Descriptions>*/}
    </>
  );
};
export default SeverInfo;
