import React from "react";
import { Col, Row } from "antd";

/***
 * @desc java信息
 * **/
const JavaInfo = (props) => {
  const { jvm } = props;
  return (
    <>
      <Row gutter={0}>
        <Col span={8}>JAVA名称</Col>
        <Col span={16}> {jvm?.name ?? '--'}</Col>
        <Col span={8}>JAVA版本</Col>
        <Col span={16}>{jvm?.version ?? '--'}</Col>

        <Col span={8}>Java的安装路径</Col>
        <Col span={16}>{jvm?.home ?? '--'}</Col>
        <Col span={8}>Java供应商</Col>
        <Col span={16}>{jvm?.vendor ?? '--'}</Col>
        <Col span={8}>Jvm最大可用内存</Col>
        <Col span={16}>{jvm?.max ?? '--'}</Col>
      </Row>

      {/*<Descriptions column={1}>*/}
      {/*  <Descriptions.Item label="JAVA名称">*/}
      {/*    {jvm?.name ?? '--'}*/}
      {/*  </Descriptions.Item>*/}
      {/*  <Descriptions.Item label="JAVA版本">*/}
      {/*    {jvm?.version ?? '--'}*/}
      {/*  </Descriptions.Item>*/}
      {/*  <Descriptions.Item label="Java的安装路径">*/}
      {/*    {jvm?.home ?? '--'}*/}
      {/*  </Descriptions.Item>*/}
      {/*  <Descriptions.Item label="Java供应商">*/}
      {/*    {jvm?.supplier ?? '--'}*/}
      {/*  </Descriptions.Item>*/}
      {/*  <Descriptions.Item label="Jvm最大可用内存">*/}
      {/*    {jvm?.max ?? '--'}*/}
      {/*  </Descriptions.Item>*/}
      {/*</Descriptions>*/}
    </>
  );
};
export default JavaInfo;
