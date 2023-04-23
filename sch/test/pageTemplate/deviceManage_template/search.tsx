import React from 'react';
import { Button, Col, DatePicker, Form, FormInstance, Row, Select } from 'antd';

// interface
import { SearchProps } from '@/utils/interfaces';

const { Option } = Select;
const { RangePicker } = DatePicker;

interface SearchTypeX extends SearchProps {
  form: FormInstance;
}

const Search: React.FC<SearchTypeX> = (props) => {
  const { onSearch, form } = props;
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
                placeholder="请选择设备类型"
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
                placeholder="请选择设备厂商"
                onChange={supplierChanged}
              >
                <Option value="1234">234</Option>
                <Option value="1234">234</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item>
              <Select allowClear mode="multiple" placeholder="请选择项目">
                <Option value="1234">234</Option>
                <Option value="1234">234</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item>
              <Select allowClear mode="multiple" placeholder="请选择车牌">
                <Option value="1234">234</Option>
                <Option value="1234">234</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item>
              <Select allowClear mode="multiple" placeholder="请选择软件版本">
                <Option value="1234">234</Option>
                <Option value="1234">234</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item>
              <Select allowClear mode="multiple" placeholder="请选择设备状态">
                <Option value="1234">234</Option>
                <Option value="1234">234</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={6}>
            <Form.Item>
              <RangePicker allowClear format="YYYY-MM-DD" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item>
              <Select allowClear mode="multiple" placeholder="请选择设备编码">
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
