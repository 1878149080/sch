import React, { useState } from 'react';
import { Col, DatePicker, Form, Input, Modal, Row } from 'antd';
import dayjs from 'dayjs';

const Register: React.FC<any> = (props) => {
  const { row } = props;
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
      <div className="cert-register-container" style={{ padding: '0 20px' }}>
        <Form
          form={form}
          layout="horizontal"
          labelWrap
          labelCol={{ span: 4 }}
          labelAlign="left"
          initialValues={{
            validTime: dayjs(row.validTime),
            invalidTime: dayjs(row.invalidTime),
          }}
        >
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="数字证书::">
                {row.certIssuerName ?? '--'}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="地区::">{row.st ?? '--'}</Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="城市::">{row.l ?? '--'}</Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="组织::">{row.o ?? '--'}</Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="签发机构::">{row.ou ?? '--'}</Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="常用名::"
                name="cn"
                rules={[{ required: true, message: '常用名必填' }]}
              >
                <Input placeholder="请输入常用名" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="证书名称::"
                name="certName"
                rules={[{ required: true, message: '证书名称必填' }]}
              >
                <Input placeholder="请输入证书名称" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="生效时间::">
                <Form.Item
                  name="validTime"
                  style={{
                    display: 'inline-block',
                    verticalAlign: 'top',
                    width: 'calc(34%)',
                  }}
                  rules={[{ required: true, message: '生效时间必选' }]}
                >
                  <DatePicker allowClear={false} format="YYYY-MM-DD" />
                </Form.Item>
                <span className="interval">到</span>
                <Form.Item
                  name="invalidTime"
                  style={{
                    display: 'inline-block',
                    verticalAlign: 'top',
                    width: 'calc(34%)',
                  }}
                  rules={[{ required: true, message: '失效时间必选' }]}
                >
                  <DatePicker allowClear={false} format="YYYY-MM-DD" />
                </Form.Item>
                <span className="total">
                  共{dayjs(row.invalidTime).diff(dayjs(row.validTime), 'day')}天
                </span>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </Modal>
  );
};

export default Register;
