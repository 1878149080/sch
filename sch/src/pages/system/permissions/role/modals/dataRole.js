import React, { useEffect, useState } from 'react';
import { Form, Modal, Tree, Select, Col, Row, Spin } from 'antd';
import {
  getInfo,
  getManufacturer,
  getOrgAllData,
  getSaveParams,
  saveInfo,
} from './dataRoleUtil';

const roleModal = (props) => {
  const [form] = Form.useForm();
  const {
    handleOk,
    // handleCancel,
    record,
  } = props;
  const [orgCheck, setOrgCheck] = useState([]);
  const [manCheck, setManCheck] = useState([]);
  // 组织机构数据
  const [org, setOrg] = useState([]);
  // 厂商数据
  const [manufacturer, setManufacturer] = useState([]);
  // 加载状态
  const [loading, setLoading] = useState(false);
  // 组织机构是否显示树
  const [showTreeOrg, setShowTreeOrg] = useState(false);
  // 厂商是否显示树
  const [showTreeMan, setShowTreeMan] = useState(false);

  useEffect(() => {
    // 获取组织机构
    getOrgAllData({
      setOrg,
    });

    // 获取厂商
    getManufacturer({
      setManufacturer,
    });

    // 获取角色数据权限
    getInfo({
      setLoading,
      form,
      setShowTreeOrg,
      setShowTreeMan,
      setOrgCheck,
      setManCheck,
      params: {
        roleId: record.roleId,
      },
    });
  }, []);

  const handleCancel = () => {
    props.handleCancel();
  };

  // 厂商树选择
  const onOrgCheck = (checkedKeys, info, a) => {
    form.setFieldsValue({
      orgCodes: checkedKeys,
    });
    setOrgCheck(checkedKeys);
  };

  // 厂商树选择
  const onManCheck = (checkedKeys, info) => {
    form.setFieldsValue({
      supplierIds: checkedKeys,
    });
    setManCheck(checkedKeys);
  };

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  function handleSubmit(e) {
    form.submit();
  }

  // 提交表单
  const onFinish = (values) => {
    const params = getSaveParams(values, record.roleId);

    saveInfo({
      setLoading,
      onCancel: handleCancel,
      handleOk,
      params: {
        rolePermissionList: params,
      },
    });

    // handleOk(
    //   values,
    //   halfCheckedKeys,
    //   form.resetFields,
    //   checked,
    //   setConfirmLoading,
    // );
  };

  return (
    <Modal
      title={'分配数据权限'}
      open={true}
      width={800}
      onOk={handleSubmit}
      confirmLoading={loading}
      onCancel={handleCancel}
      wrapClassName="system-rule-modal"
      destroyOnClose
      bodyStyle={{
        maxHeight: 450,
        overflow: 'auto',
      }}
    >
      <Spin tip="正在加载中..." spinning={loading}>
        <Form form={form} onFinish={onFinish}>
          <Row gutter={10}>
            <Col span={12}>
              <Form.Item
                label="组织权限范围"
                {...formItemLayout}
                name="orgCodes_perValue"
                initialValue={2}
                rules={[
                  {
                    required: true,
                    message: '请选择权限范围!',
                  },
                ]}
              >
                <Select
                  style={{ width: '100%' }}
                  placeholder="请选择"
                  allowClear={false}
                  options={dataPreList}
                  onChange={(value) => {
                    if (value === 5) {
                      setShowTreeOrg(true);
                    } else {
                      setShowTreeOrg(false);
                    }
                  }}
                />
              </Form.Item>
              {showTreeOrg && (
                <Form.Item
                  {...formItemLayout}
                  label="组织机构"
                  name="orgCodes"
                  rules={[
                    {
                      required: true,
                      message: '请选择组织机构',
                    },
                  ]}
                >
                  <Tree
                    checkable
                    showLine
                    checkedKeys={orgCheck}
                    onCheck={onOrgCheck}
                    treeData={org}
                  />
                </Form.Item>
              )}
            </Col>
            <Col span={12} className="right">
              <i className="system-rule-hr" />
              <Form.Item
                label="供应商权限范围"
                {...formItemLayout}
                name="supplierIds_perValue"
                initialValue={4}
                rules={[
                  {
                    required: true,
                    message: '请选择权限范围!',
                  },
                ]}
              >
                <Select
                  style={{ width: '100%' }}
                  placeholder="请选择供应商"
                  allowClear={false}
                  options={dataPreList2}
                  onChange={(value) => {
                    if (value === 5) {
                      setShowTreeMan(true);
                    } else {
                      setShowTreeMan(false);
                    }
                  }}
                />
              </Form.Item>
              {showTreeMan && (
                <Form.Item
                  {...formItemLayout}
                  label="供应商"
                  name="supplierIds"
                  // initialValue={}
                  rules={[
                    {
                      required: true,
                      message: '请选择供应商权限',
                    },
                  ]}
                >
                  <Tree
                    checkable
                    showLine
                    checkedKeys={manCheck}
                    onCheck={onManCheck}
                    treeData={manufacturer}
                  />
                </Form.Item>
              )}
            </Col>
          </Row>
        </Form>
      </Spin>
    </Modal>
  );
};

export default roleModal;

// 1：本人没有权限，2：本机构，3：本机构及子机构，4：全部，5：自定义
const dataPreList = [
  {
    label: '本人',
    value: 1,
  },
  {
    label: '本机构',
    value: 2,
  },
  {
    label: '本机构及子机构',
    value: 3,
  },
  {
    label: '全部',
    value: 4,
  },
  {
    label: '自定义',
    value: 5,
  },
];

// 1：本人没有权限，2：本机构，3：本机构及子机构，4：全部，5：自定义
const dataPreList2 = [
  {
    label: '本人',
    value: 1,
  },
  // {
  //   label: '本机构',
  //   value: 2,
  // },
  // {
  //   label: '本机构及子机构',
  //   value: 3,
  // },
  {
    label: '全部',
    value: 4,
  },
  {
    label: '自定义',
    value: 5,
  },
];
