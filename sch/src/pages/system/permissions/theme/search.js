import React from "react";
import { Button, Col, Form, Input, Row } from "antd";

/**
 * @desc 根据菜单名称查询
 * @class 查询组件
 * @author 吴昊 2020/1/16
 */
const Search = (props) => {
  const { onSearch } = props;
  const [form] = Form.useForm();

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  // 提交表单
  const onFinish = (values) => {
    onSearch(values);
  };

  return (
    <div className="search">
      <Form form={form} onFinish={onFinish}>
        <Row gutter={24}>
          <Col span={8} offset={0} pull={0} style={{ textAlign: 'left' }}>
            <Form.Item label="菜单名称" {...formItemLayout} name="USER_NAME">
              <Input
                size="small"
                style={{ width: '100%' }}
                placeholder="请输入菜单名称"
              />
            </Form.Item>
          </Col>
          <Col span={8} offset={0} pull={0} style={{ textAlign: 'left' }}>
            <Button
              type="primary"
              icon="search"
              htmlType="submit"
              size="small"
              style={{
                marginTop: '8px',
              }}
            >
              查询
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Search;
