import React, { useState } from 'react';
import { Col, Form, Input, Modal, Row, Select } from 'antd';

const Option = Select.Option;
const { confirm } = Modal;
const { Search } = Input;
const { TextArea } = Input;

const Register: React.FC<any> = (props) => {
  const {} = props;
  const { visible, title, currentRow = [], onOk, onCancel } = props.modal;
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

  const versionList = currentRow?.map((item: any, index: number) => (
    <li>
      {index + 1}. {item.versionNo}
    </li>
  ));

  return (
    <Modal
      open={true}
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
      <div className="register-container" style={{ padding: '0 20px' }}>
        确定作废以下软件版本吗？
        <ul className="softVersion">{versionList}</ul>
        <Form
          form={form}
          layout="horizontal"
          labelWrap
          labelCol={{ span: 4 }}
          labelAlign="left"
        >
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="原因::" name="remark">
                <TextArea rows={4} maxLength={500} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </Modal>
  );
};

export default Register;
