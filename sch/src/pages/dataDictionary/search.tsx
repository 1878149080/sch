import React, { useEffect } from "react";
import { Button, Col, DatePicker, Form, Row, Select } from "antd";

// interface
import { SearchProps } from "@/utils/interfaces";
// import { FormInstance } from 'antd';
const { Option } = Select;
const { RangePicker } = DatePicker;

interface SearchTypeX extends SearchProps {}

const Search: React.FC<SearchTypeX> = (props) => {
  const { onSearch } = props;
  const [form] = Form.useForm();
  useEffect(() => {
    form.submit();
  }, []);
  const onFinish = (form: object) => {
    onSearch(form);
  };
  const deviceChanged = (value: any) => {};
  const supplierChanged = (value: any) => {};

  return (
    <div id="1" ref={props.refs}>
      <Form onFinish={onFinish} form={form} initialValues={{}}>
        <Row gutter={16}>
          <Col span={4}>
            <Form.Item>
              <Select
                showSearch
                placeholder="请选择类别"
                onChange={deviceChanged}
              >
                <Option value="1234">234</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item>
              <Select
                allowClear
                mode="multiple"
                placeholder="请选择标签类型"
                onChange={supplierChanged}
              >
                <Option value="1234">234</Option>
                <Option value="1234">234</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item>
              <Select allowClear mode="multiple" placeholder="请选择标签值">
                <Option value="1234">234</Option>
                <Option value="1234">234</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={4}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Search;
