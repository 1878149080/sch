import React, { useState } from "react";
import { Col, Form, Input, Modal, Row, Select } from "antd";
// import { carRegister } from '@/services/car/carManage';

const Option = Select.Option;
const { confirm } = Modal;
const { Search } = Input;
const { TextArea } = Input;

const Invalid: React.FC<any> = (props) => {
  const {} = props;
  const { visible, title, onOk, onCancel } = props.modal;
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

  return (
    <Modal
      open={true}
      title={title}
      centered
      confirmLoading={confirmLoading}
      width={500}
      onOk={() => {
        setConfirmLoading(true);
        form
          .validateFields()
          .then(() => onOk(form.getFieldsValue(), setConfirmLoading))
          .catch(() => setConfirmLoading(false));
      }}
      onCancel={onCancel}
      destroyOnClose={true}
    >
      <div className="register-container">
        确定删除这些项目吗
        <Form
          form={form}
          layout="horizontal"
          labelWrap
          labelCol={{ span: 4 }}
          labelAlign="left"
        >
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="remark"
                label="项目描述"
                rules={[{ required: true, message: '项目描述必填' }]}
              >
                <TextArea rows={4} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </Modal>
  );
};

export default Invalid;
