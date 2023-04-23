import React from 'react';
import { Button, Form, Input } from 'antd';

const Search = (props) => {
  const [form] = Form.useForm();
  const { refs, onSearch } = props;
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  // 提交表单
  const onFinish = (values) => {
    onSearch(values);
  };

  return (
    <div
      className="searchBox"
      ref={refs}
      style={{ width: 'calc(100% - 10px)' }}
    >
      <Form form={form} onFinish={onFinish} layout="inline">
        <Form.Item label="名称" {...formItemLayout} name="name">
          <Input style={{ width: '100%' }} placeholder="请输入角色名称" />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          查询
        </Button>
      </Form>
    </div>
  );
};

export default Search;
