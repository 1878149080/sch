import React, { useEffect, useState } from "react";
import { Col, Form, Input, Modal, Row, Select } from "antd";
// import { carRegister } from '@/services/car/carManage';

const Option = Select.Option;
const { confirm } = Modal;
const { Search } = Input;
const { TextArea } = Input;

const Register: React.FC<any> = (props) => {
  const { echo } = props;
  const { visible, title, onOk, onCancel } = props.modal;
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

  useEffect(() => {
    if (echo) {
      form.setFieldsValue({
        projectId: echo?.projectId,
        projectName: echo?.projectName,
        projectManagerId: echo?.projectManagerId,
        cityName: echo?.cityName,
        projectDesc: echo?.projectDesc,
      });
    }
  }, [echo]);

  return (
    <Modal
      open={true}
      title={title}
      centered
      width={500}
      confirmLoading={confirmLoading}
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
        <Form
          form={form}
          layout="horizontal"
          labelCol={{ span: 4 }}
          labelAlign="right"
          initialValues={
            {
              // projectName: '123r',
              // projectManagerId: 1,
              // cityName: '12345',
            }
          }
        >
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item hidden label="项目编码::" name="projectId">
                <Input placeholder="请输入编码" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="项目名称::"
                name="projectName"
                rules={[{ required: true, message: '项目名称必选' }]}
              >
                <Input placeholder="请输入项目名称" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="项目经理::"
                name="projectManagerId"
                rules={[{ required: true, message: '项目名称必选' }]}
              >
                <Select allowClear showSearch placeholder="请选择项目经理">
                  {/* {
                  option.certType?.filter(item => item.dictValue !== 4).map(item => {
                    return <Option value={item.dictValue} key={item.dictName}>{item.dictName}</Option>
                  })
                } */}
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="城市::"
                name="cityName"
                rules={[{ required: true, message: '城市必选' }]}
              >
                <Select allowClear showSearch placeholder="请选择城市">
                  {/* {
                  option.certType?.filter(item => item.dictValue !== 4).map(item => {
                    return <Option value={item.dictValue} key={item.dictName}>{item.dictName}</Option>
                  })
                } */}
                </Select>
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label="项目描述"
                name="projectDesc"
                rules={[{ required: true, message: '项目描述必选' }]}
              >
                <TextArea placeholder="请输入项目描述" rows={4} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </Modal>
  );
};

export default Register;
