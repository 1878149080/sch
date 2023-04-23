import React, { useState } from 'react';
import { Form, Row, Col, Modal, Input, Select, Button, Upload } from 'antd';
import dayjs from 'dayjs';
import { FormTip } from '@/utils/columnsUtils';
import { useOption } from '@/utils/hooks';
import { softVersion } from '@/services/OTA/softVersion';

// interface
import { optionType, optionItem } from '../../interface';


const Option = Select.Option;
const { confirm } = Modal;
const { Search } = Input;
const { TextArea } = Input;

const Register: React.FC<any> = (props) => {
  const { echo } = props;
  const { visible, title, onOk, onCancel } = props.modal;
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [option] = useOption(['terminalType'], callback);

  const uploadProps = {
    accept: '.bin',
    maxCount: 1,
    beforeUpload: (file: any) => {
      return false;
    },
  }
  function callback(option: optionType) {
    let fields: any = {};
    if(option?.terminalType) {
      fields.terminalType = option.terminalType[0].dictValue
      // form.setFieldsValue({terminalType: option.terminalType[0].dictValue})
    }
    if(echo) {
      fields.terminalType = echo.terminalType;
      fields.versionNo = echo.versionNo;
      fields.versionDesc = echo.versionDesc;
      // fields.versionNo = echo.versionNo,
    }
    form.setFieldsValue(fields);
  }

  return (
    <Modal
      visible={true}
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
          initialValues={{}}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="terminalType" label="设备类型::">
                <Select showSearch disabled={echo ? true : false} placeholder="请选择设备类型">
                  {option.terminalType?.map((item) => {
                    return (
                      <Option value={item.dictValue} key={item.dictName}>
                        {item.dictName}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="versionNo" label="版本号::">
                <Input placeholder="请输入版本号" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="file" label="软件包::">
                <Upload {...uploadProps}>
                  <Button>文件上传</Button>
                  <span style={{color: "#169bd5"}}>{echo?.versionFile}</span>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item labelCol={{ span: 3 }} label="评估意见::" name="versionDesc">
                <TextArea rows={3} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </Modal>
  );
};

export default Register;
