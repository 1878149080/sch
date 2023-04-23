import React, { useEffect, useState } from 'react';
import { Col, Form, Input, Modal, Radio, Row, Select, Space } from 'antd';

const Option = Select.Option;
const { TextArea } = Input;

const Register: React.FC<any> = (props) => {
  const { echo } = props;
  const { visible, title, onOk, onCancel } = props.modal;
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

  useEffect(() => {
    if (echo) {
      form.setFieldsValue({
        dictName: echo.dictName,
        dictType: echo.dictType,
        dictValue: echo.dictValue,
        dictCode: echo.dictCode,
        remark: echo.remark,
      });
    }
  }, [echo]);

  //   {
  //     "createBy": "admin",  //  创建人 required
  //     "createTime": "2022-10-24 18:37:06",  创建时间required
  //         "updateBy": "admin", // 编辑时更新人required
  //         "updateTime": "2022-10-24 18:37:06", // 编辑时更新时间required
  //         "remark": "性别男", // 评论
  //         "dictCode": 1, // 字典id编码 // 编辑时必须带上
  //     //     "dictSort": 1,
  //         "dictLabel": "男",required // 字典lable值
  //         "dictValue": "0", // required 字典label 的value值
  //         "dictType": "sys_user_sex",required 字典类型
  //         "isDefault": "Y", // 默认值 required 默认必选，后期有用
  //         "status": "0", required // 状态
  //     //     "dictName": "用户性别",
  //     //     "default": true
  //     }

  // 字典值规则
  const validator = (_: any, value: any) => {
    let reg = /[\u4E00-\u9FA5]+/gim;
    if (reg.test(value)) {
      return Promise.reject(new Error('只能是数字或者英文字符'));
    } else {
      return Promise.resolve();
    }
  };
  const dictValueRules = [
    { required: true, message: '字典值必填' },
    { validator: validator },
  ];

  return (
    <Modal
      open={true}
      title={title}
      centered
      width={600}
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
            status: '0',
          }}
        >
          <Row gutter={16}>
            <Form.Item label="编码::" hidden name="dictCode">
              <Input />
            </Form.Item>
            <Col span={12}>
              <Form.Item
                label="字典名称::"
                name="dictName"
                rules={[{ required: true, message: '字典名称必填' }]}
              >
                <Input placeholder="请输入字典名称" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="字典类型::"
                name="dictType"
                rules={[{ required: true, message: '字典类型必填' }]}
              >
                <Input placeholder="请输入字典类型" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="字典值::"
                name="dictValue"
                rules={dictValueRules}
              >
                <Input placeholder="请输入字典值" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="status"
                label="状态::"
                rules={[{ required: true, message: '状态必选' }]}
              >
                <Radio.Group>
                  <Space direction="horizontal">
                    <Radio value="0">正常</Radio>
                    <Radio value="1">停用</Radio>
                  </Space>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="备注::" name="remark" labelCol={{ span: 3 }}>
                <TextArea rows={4} placeholder="请输入备注" />
              </Form.Item>
            </Col>
          </Row>
          {/* <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="字典类型::"
                name="dictType"
                rules={[{ required: true, message: '省份必选' }]}
              >
                <Input placeholder="请输入字典类型" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="数据标签::"
                name="country"
                rules={[{ required: true, message: '国家必选' }]}
              >
                <Input placeholder="请输入数据标签" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="数据键值::"
                name="country"
                rules={[{ required: true, message: '国家必选' }]}
              >
                <Input placeholder="请输入数据键值" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="样式属性::"
                name="country"
                rules={[{ required: true, message: '国家必选' }]}
              >
                <Input placeholder="请输入样式属性" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="显示排序::"
                name="country"
                rules={[{ required: true, message: '国家必选' }]}
              >
                <Input placeholder="请输入显示排序" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="回显样式::"
                name="country"
                rules={[{ required: true, message: '国家必选' }]}
              >
                <Input placeholder="请输入回显样式" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="状态::"
                name="city"
                rules={[{ required: true, message: '城市必选' }]}
              >
                <Select placeholder="请输入状态">
                <Option value={0} key={0}>
                    正常
                  </Option>
                  <Option value={1} key={1}>
                    停用
                  </Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="备注::"
                name="remark"
                labelCol={{ span: 3 }}
                rules={[{ required: true, message: '公司必选' }]}
              >
                <TextArea rows={4} placeholder="请输入备注" />
              </Form.Item>
            </Col>
          </Row> */}
        </Form>
      </div>
    </Modal>
  );
};

export default Register;
