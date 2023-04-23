import React, { useEffect, useState } from 'react';
import { Row, Col, Select, Form, DatePicker, Button, Input } from 'antd';
import { FormTip } from '@/utils/columnsUtils';
import dayjs from 'dayjs';

// interface
import { SearchProps } from '@/utils/interfaces';
import { FormInstance } from 'antd';
const { Option } = Select;
const { RangePicker } = DatePicker;

interface SearchTypeX extends SearchProps {
  form: FormInstance;
}

const Search: React.FC<SearchTypeX> = (props) => {
  const { onSearch, form } = props;

  useEffect(() => {
    form.submit();
  }, []);

  const onFinish = (form: object) => {
    onSearch(form);
  };

  return (
    <div id="1" ref={props.refs}>
      <Form onFinish={onFinish} form={form} initialValues={{
        date: [dayjs().subtract(3, "month"), dayjs()]
      }}>
        <Row gutter={16}>
        <Col span={4}>
            <FormTip title="时间">
              <Form.Item name="date">
                <RangePicker allowClear={false} format="YYYY-MM-DD" />
              </Form.Item>
            </FormTip>
          </Col>
          <Col span={4}>
            <FormTip title="设备类型:">
              <Form.Item name="terminalType">
                <Select showSearch placeholder="请选择设备类型">
                  {/* {option.terminalType?.map((item) => {
                    return (
                      <Option value={item.dictValue} key={item.dictName}>
                        {item.dictName}
                      </Option>
                    );
                  })} */}
                </Select>
              </Form.Item>
            </FormTip>
          </Col>
          <Col span={4}>
            <FormTip title="状态">
              <Form.Item name="status">
                <Select
                  allowClear
                  showSearch
                  mode="multiple"
                  placeholder="请选择证书类型"
                >
                  <Option value={0} key={0}>
                    有效
                  </Option>
                  <Option value={1} key={1}>
                    无效
                  </Option>
                </Select>
              </Form.Item>
            </FormTip>
          </Col>
          <Col span={4}>
            <FormTip title="版本号">
              <Form.Item name="certType">
                <Input placeholder="请输入版本号" />
              </Form.Item>
            </FormTip>
          </Col>
          <Col span={4}>
            <FormTip title="描述">
              <Form.Item name="certType">
              <Input placeholder="请输入描述" />
              </Form.Item>
            </FormTip>
          </Col>
          <Col span={2}>
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
