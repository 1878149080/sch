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
          accessTime: [dayjs().add(-29, 'day'), dayjs()],
        }}
      >
        <Row gutter={16}>
          <Col span={9} xxl={5}>
            <FormTip title="异常时间范围">
              <Form.Item name="accessTime">
                <RangePicker
                  allowClear={false}
                  showTime={true}
                  format="YYYY-MM-DD HH:mm:ss"
                />
              </Form.Item>
            </FormTip>
          </Col>
          <Col span={4} xxl={4}>
            <FormTip title="地址">
              <Form.Item name="ipaddr">
                <Input placeholder="请输入地址" allowClear={true} />
              </Form.Item>
            </FormTip>
          </Col>
          <Col span={4} xxl={4}>
            <FormTip title="真实名称">
              <Form.Item name="useName">
                <Input placeholder="请输入真实名称" allowClear={true} />
              </Form.Item>
            </FormTip>
          </Col>
          <Col span={5} xxl={4}>
            <FormTip title="异常名称">
              <Form.Item name="exceptionName">
                <Input placeholder="请输入异常名称" allowClear={true} />
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
