import React from 'react';
import { Button, Col, Form, Input, Row, Select } from 'antd';

const Option = Select.Option;

const Search = (props) => {
  const [form] = Form.useForm();
  const { refs, roleProps, onSearch } = props;

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   validateFields((errors) => {
  //     if (errors) {
  //       return;
  //     }
  //     onSearch(getFieldsValue());
  //   });
  // }

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  const roleOption = roleProps.map((item) => {
    return (
      <Option value={item.roleId} key={item.roleId}>
        {item.name}
      </Option>
    );
  });

  // 提交表单
  const onFinish = (values) => {
    onSearch(values);
  };

  return (
    <div className="search" ref={refs}>
      <Form form={form} onFinish={onFinish}>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item label="角色" {...formItemLayout} name="roleId">
              <Select
                style={{ width: '100%' }}
                placeholder="请选择"
                allowClear
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {roleOption}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="真实名称" {...formItemLayout} name="realName">
              <Input style={{ width: '100%' }} placeholder="请输入真实名称" />
            </Form.Item>
          </Col>

          <Col span={8} offset={0} pull={0} style={{ textAlign: 'left' }}>
            <Button
              type="primary"
              htmlType="submit"
              // style={{ marginTop: '8px' }}
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
