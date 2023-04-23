import React, { useState } from 'react';
import { Col, DatePicker, Form, Input, Modal, Row, Select } from 'antd';
import dayjs from 'dayjs';

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
            country: 'CN',
            province: 'FuJian',
            city: 'Xiamen',
            company: 'Xiamen public Transport Group',
            organ: 'Xiamen public Transport Group Certification Authority',
            sTime: dayjs().subtract(1, 'day'),
            eTime: dayjs(),
          }}
        >
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="国家::"
                name="country"
                rules={[{ required: true, message: '国家必选' }]}
              >
                <Select>
                  <Option value="CN">CN</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="省份::"
                name="province"
                rules={[{ required: true, message: '省份必选' }]}
              >
                <Select>
                  <Option value="FuJian">FuJian</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label="城市::"
                name="city"
                rules={[{ required: true, message: '城市必选' }]}
              >
                <Select>
                  <Option value="Xiamen">Xiamen</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="公司::"
                name="company"
                rules={[{ required: true, message: '公司必选' }]}
              >
                <Select>
                  <Option value="Xiamen public Transport Group">
                    Xiamen public Transport Group
                  </Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="签发机构::"
                name="organ"
                rules={[{ required: true, message: '签发机构必选' }]}
              >
                <Select>
                  <Option value="Xiamen public Transport Group Certification Authority">
                    Xiamen public Transport Group Certification Authority
                  </Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="证书名称::"
                name="certName"
                rules={[{ required: true, message: '证书名称必填' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="生效时间::"
                name="sTime"
                rules={[{ required: true, message: '生效时间必选' }]}
              >
                <DatePicker format="YYYY-MM-DD" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="失效时间::"
                name="eTime"
                rules={[{ required: true, message: '失效时间必选' }]}
              >
                <DatePicker format="YYYY-MM-DD" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </Modal>
  );
};

export default Register;
