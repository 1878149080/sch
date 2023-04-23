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
    <div id="1" ref={props.refs}>
      <Form
        onFinish={onFinish}
        form={form}
        initialValues={{
          date: [dayjs().subtract(3, 'month').startOf('day'), dayjs()],
        }}
      >
        <Row gutter={16}>
          <Col span={9} xxl={5}>
            <FormTip title="登录时间">
              <Form.Item name="date">
                <RangePicker allowClear={false} format="YYYY-MM-DD" />
              </Form.Item>
            </FormTip>
          </Col>
          <Col span={5} xxl={4}>
            <FormTip title="登录地址">
              <Form.Item name="ipaddr">
                <Input placeholder="请输入登录地址" allowClear={true} />
              </Form.Item>
            </FormTip>
          </Col>
          <Col span={5} xxl={4}>
            <FormTip title="登录名称">
              <Form.Item name="useName">
                <Input placeholder="请输入登录名称" allowClear={true} />
              </Form.Item>
            </FormTip>
          </Col>
          <Col span={5} xxl={4}>
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
