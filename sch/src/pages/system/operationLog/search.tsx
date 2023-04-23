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

  return (
    <div ref={props.refs}>
      <Form
        onFinish={onFinish}
        form={form}
        initialValues={{
          date: [dayjs().startOf('day'), dayjs()],
        }}
      >
        <Row gutter={16}>
          <Col span={6} xxl={4}>
            <FormTip title="操作时间">
              <Form.Item name="date">
                <RangePicker allowClear format="YYYY-MM-DD" />
              </Form.Item>
            </FormTip>
          </Col>
          <Col span={6} xxl={4}>
            <FormTip title="系统模块">
              <Form.Item name="title">
                <Input allowClear placeholder="请输入系统模块" />
              </Form.Item>
            </FormTip>
          </Col>
          <Col span={6} xxl={4}>
            <FormTip title="操作人员">
              <Form.Item name="operName">
                <Input allowClear placeholder="请输入操作人员" />
              </Form.Item>
            </FormTip>
          </Col>
          <Col span={6} xxl={4}>
            <FormTip title="操作类型">
              <Form.Item name="businessType">
                <Select allowClear mode="multiple" placeholder="请选择操作类型">
                  <Option value={0} key={0}>
                    访问
                  </Option>
                  <Option value={1} key={1}>
                    编辑
                  </Option>
                  <Option value={2} key={2}>
                    导出
                  </Option>
                </Select>
              </Form.Item>
            </FormTip>
          </Col>
          <Col span={6} xxl={4}>
            <FormTip title="状态">
              <Form.Item name="status">
                <Select allowClear mode="multiple" placeholder="请选择状态">
                  <Option value={0} key={0}>
                    成功
                  </Option>
                  <Option value={1} key={1}>
                    异常
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
