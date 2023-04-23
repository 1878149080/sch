import React, { useState } from 'react';
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
} from 'antd';
import { useOption } from '@/utils/hooks';

// interface
import { optionType } from '@/pages/interface';

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

  function callback(option: optionType) {
    let fields: any = {};
    if (option?.terminalType) {
      fields.terminalType = option.terminalType[0].dictValue;
      // form.setFieldsValue({terminalType: option.terminalType[0].dictValue})
    }
    if (echo) {
      fields.terminalType = echo.terminalType;
      fields.versionNo = echo.versionNo;
      fields.versionDesc = echo.versionDesc;
      // fields.versionNo = echo.versionNo,
    }
    setTerminalType(fields.terminalType);
    form.setFieldsValue(fields);
  }

  const onTerminalChange = (value: number) => {
    setTerminalType(value);
  };

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
          initialValues={{}}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="terminalType"
                label="设备类型::"
                rules={[{ required: true, message: '设备类型必选' }]}
              >
                <Select
                  onChange={onTerminalChange}
                  showSearch
                  disabled={echo ? true : false}
                  placeholder="请选择设备类型"
                >
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
              <Form.Item
                name="versionNo"
                label="版本号::"
                rules={[{ required: true, message: '版本号必填' }]}
              >
                <Input placeholder="请输入版本号" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                labelCol={{ span: 3 }}
                name="file"
                label="软件包::"
                rules={[{ required: true, message: '软件包必传' }]}
              >
                <Upload {...uploadProps}>
                  <Button>文件上传</Button>
                  <span style={{ color: '#169bd5', marginLeft: '5px' }}>
                    支持扩展名:
                    {getFileType().map((item) => {
                      return <span style={{ margin: '0 5px' }}>{item}</span>;
                    })}
                  </span>
                  <p style={{ color: '#169bd5' }}>{echo?.versionFile}</p>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                labelCol={{ span: 3 }}
                label="版本描述::"
                name="versionDesc"
                rules={[{ required: true, message: '版本描述' }]}
              >
                <TextArea rows={3} maxLength={500} showCount />
              </Form.Item>
            </Col>
          </Row>

          <Alert description="版本文件中必须包含版本信息！" type="warning" />
        </Form>
      </div>
    </Modal>
  );
};

export default Register;
