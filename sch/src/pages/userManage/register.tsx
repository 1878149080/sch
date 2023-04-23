import React, { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Upload,
  Radio,
} from 'antd';

// interface
import { optionType } from '@/pages/interface';

const Option = Select.Option;
const { confirm } = Modal;
const { Search } = Input;
const { TextArea } = Input;

const Register: React.FC<any> = (props) => {
  const { echo, type } = props;
  const { visible, title, onOk, onCancel } = props.modal;
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [terminalType, setTerminalType] = useState<number>();

  const getFileType = () => {
    if (terminalType === 1) {
      return ['.bin'];
    }
    if (terminalType === 2 || terminalType === 3) {
      return ['.apk'];
    }
    return ['.bin', '.apk'];
  };
  const uploadProps = {
    accept: getFileType().join(','),
    maxCount: 1,
    beforeUpload: (file: any) => {
      return false;
    },
  };

  const onTerminalChange = (value: number) => {
    setTerminalType(value);
  };

  useEffect(() => {
    if(echo) {
      form.setFieldsValue({
        username: echo.username,
        nickname: echo.nickname,
        gender: echo.gender,
        status: echo.status,
        password: echo.password,
      })
      console.log('====================================');
      console.log(echo);
      console.log('====================================');
    }
  }, [echo])

  return (
    <Modal
      open={true}
      title={title}
      centered
      width={600}
      wrapClassName="version-wrap"
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
          labelCol={{ span: 6 }}
          labelAlign="right"
          initialValues={{
            gender: 0,
            status: 1,
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="username"
                label="名称::"
                rules={[{ required: true, message: '名称必填' }]}
              >
                <Input allowClear placeholder="请输入名称" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="nickname"
                label="别名::"
              >
                <Input allowClear placeholder="请输入别名" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="password"
                label="密码::"
                rules={[{ required: true, message: '密码必填' }]}
              >
                <Input.Password disabled={type === "edit" ? true: false} allowClear placeholder="请输入密码" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="gender"
                label="性别::"
              >
                <Radio.Group>
                  <Radio value={0}>男</Radio>
                  <Radio value={1}>女</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="status"
                label="类型::"
              >
                <Radio.Group>
                  <Radio value={0}>管理员</Radio>
                  <Radio value={1}>普通用户</Radio>
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
