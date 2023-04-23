import React, { useState } from 'react';
import { Col, Form, Input, Modal, Radio, Row, Select, Space } from 'antd';

const Option = Select.Option;
const { confirm } = Modal;
const { Search } = Input;
const { TextArea } = Input;

const Register: React.FC<any> = (props) => {
  const {} = props;
  const { visible, title, onOk, onCancel } = props.modal;
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

  return (
    <Modal
      open={true}
      title={title}
      centered
      width={500}
      confirmLoading={confirmLoading}
      onOk={() => {
        form.validateFields().then(() => {
          setConfirmLoading(true);
          onOk(form.getFieldsValue(), setConfirmLoading);
        });
      }}
      onCancel={onCancel}
      destroyOnClose={true}
    >
      <div className="register-container" style={{ padding: '0 20px' }}>
        <Form
          form={form}
          layout="horizontal"
          labelWrap
          labelCol={{ span: 4 }}
          labelAlign="left"
          initialValues={{
            type: 'key',
          }}
        >
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="type"
                rules={[{ required: true, message: '密钥类型必选' }]}
              >
                <Radio.Group>
                  <Space direction="vertical">
                    <Radio value="key">基础秘钥</Radio>
                    <Radio value="unsecure">免密秘钥</Radio>
                    <Radio value="pk8">PK8秘钥</Radio>
                  </Space>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </Modal>
  );
};

export default Register;
