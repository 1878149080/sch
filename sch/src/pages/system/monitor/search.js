import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row, Select } from 'antd';
import { getSys } from '@/services/System/monitor';

const Option = Select.Option;

/**
 *
 */
function Index(props) {
  const { onSearch, form, setLoading } = props;
  const [sys, setSys] = useState([]);
  const onFinish = (form) => {
    onSearch(form);
  };

  useEffect(() => {
    getSys({})
    .then((res) => {
      if (res.statusCode === 200) {
        let data = res.content.map(item => {
          item.value = item.hostName + "," + item.type;
          return item;
        })
        setSys(data);
        form.setFieldsValue({
          host: data[0].value
        })
        form.submit();
      }else{
        setLoading(false);
      }
    })
  }, []);

  return (
    <div>
      <Form onFinish={onFinish} form={form} initialValues={{}}>
        <Row gutter={16}>
          <Col span={4}>
            {/* <FormTip title="证书类型"> */}
            <Form.Item name="host">
              <Select
                placeholder="请选择服务器"
              >
                {sys?.map((item) => {
                  return (
                    <Option value={item.value} key={item.value}>
                      {item.hostName}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            {/* </FormTip> */}
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
}

export default Index;
