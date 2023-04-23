import React from 'react';
import { Col, Form, Input, Modal, Row, Select } from 'antd';

const Option = Select.Option;
const { confirm } = Modal;
const { Search } = Input;
const { TextArea } = Input;

const Register: React.FC<any> = (props) => {
  const {} = props;
  const { visible, title, onOk, onCancel } = props.modal;
  const [form] = Form.useForm();
  const register = () => {};

  return (
    <Modal
      open={true}
      title={title}
      centered
      width={500}
      onOk={() => {
        register();
        // onOk(form.getFieldsValue());
      }}
      onCancel={onCancel}
      destroyOnClose={true}
    >
      <div className="register-container">
        <Form
          form={form}
          layout="horizontal"
          labelWrap
          labelCol={{ span: 4 }}
          labelAlign="left"
        >
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="标签类型::">
                <Select>
                  <Option value={6}>121</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="标签名称::">
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="标签值::">
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="标签序号::">
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="父标签">
                <Select>
                  <Option value={6}>121</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="标签描述">
                <TextArea rows={4} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </Modal>
  );
};

export default Register;
