import React, { useEffect } from 'react';
import {
  Button,
  Col,
  DatePicker,
  Form,
  FormInstance,
  Input,
  Row,
  Select,
} from 'antd';
import { FormTip } from '@/utils/columnsUtils';
import dayjs from 'dayjs';

// interface
import { SearchProps } from '@/utils/interfaces';

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
  const deviceChanged = (value: any) => {};
  const supplierChanged = (value: any) => {};

  return (
    <div id="1" ref={props.refs}>
      <Form
        onFinish={onFinish}
        form={form}
        initialValues={{
          date: [dayjs().subtract(3, 'month').startOf('month'), dayjs()],
        }}
      >
        <Row gutter={16}>
          {/*<Col span={7} xxl={4}>*/}
          {/*  <FormTip title="创建日期">*/}
          {/*    <Form.Item name="date">*/}
          {/*      <RangePicker allowClear={false} format="YYYY-MM-DD" />*/}
          {/*    </Form.Item>*/}
          {/*  </FormTip>*/}
          {/*</Col>*/}
          <Col span={5} xxl={4}>
            <FormTip title="字典名称">
              <Form.Item name="dictName">
                <Input allowClear placeholder="请输入字典名称" />
              </Form.Item>
            </FormTip>
          </Col>
          <Col span={5} xxl={4}>
            <FormTip title="字典类型">
              <Form.Item name="dictType">
                <Input allowClear placeholder="请输入字典类型" />
              </Form.Item>
            </FormTip>
          </Col>
          <Col span={5} xxl={4}>
            <FormTip title="状态">
              <Form.Item name="status">
                <Select
                  allowClear
                  mode="multiple"
                  placeholder="请选择状态"
                  onChange={supplierChanged}
                >
                  <Option value={0} key={0}>
                    正常
                  </Option>
                  <Option value={1} key={1}>
                    停用
                  </Option>
                </Select>
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
