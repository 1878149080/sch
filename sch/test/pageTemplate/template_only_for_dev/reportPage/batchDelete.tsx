import React, { useState } from 'react';
import { Form, Row, Col, Modal, Input, Select, DatePicker, Tooltip, Button } from 'antd';
import { carRegister } from '@/services/car/carManage';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const Option = Select.Option;
const { confirm } = Modal;
const { Search } = Input;
const {TextArea} = Input; 


const Register: React.FC<any> = (props) => {
  const { } = props;
  const { visible, title, onOk, onCancel } = props.modal;
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

  return (<Modal
    visible={true}
    title={title}
    centered
    width={500}
    confirmLoading={confirmLoading}
    onOk={() => {
      setConfirmLoading(true);
      onOk(form.getFieldsValue(), setConfirmLoading);
    }}
    onCancel={onCancel}
    destroyOnClose={true}
  >
    <div className="register-container" style={{padding: "0 20px"}}>
      确定作废这些证书吗
      <Form form={form} layout="horizontal" labelWrap labelCol={{ span: 4 }} labelAlign="left">
        <Row gutter={16}>
          <Col span={24}><Form.Item label="原因::" name="remark">
            <TextArea rows={4} />
          </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  </Modal>)
}

export default Register;