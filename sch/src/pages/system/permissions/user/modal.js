import React, { useEffect, useState } from 'react';
import { Checkbox, Form, Input, Modal, Radio, Select, TreeSelect } from 'antd';
import { checkPassword } from '../../../../utils/password/checkPassword';

const { TextArea } = Input;

const UserModal = (props) => {
  const [form] = Form.useForm();
  const { list, role, orgId, orgTreeData, handleOk } = props;
  const [confirmDirty, setConfirmDirty] = useState(false);
  const [pwdState, setPwdState] = useState(null);
  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    setPwdState(list);
  }, []);

  const handlePwdState = (e) => {
    if (e.target.value) {
      setPwdState(null);
    } else {
      setPwdState('a');
      form.validateFields(['pwd'], { force: true });
      form.validateFields(['pwd2'], { force: true });
    }
  };

  const handleConfirmBlur = (e) => {
    const value = e.target.value;
    setConfirmDirty(confirmDirty || !!value);
    // this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  const compareToFirstPassword = (rule, value, callback) => {
    // const form = this.props.form;
    const length = String(value ? value : '').length;

    if (length < 8) {
      callback('密码位数少于8位!');
    } else if (length > 16) {
      callback('密码位数大于16位!');
    } else if (!checkPassword(value)) {
      callback('密码未包含数字、字母、特殊字符!');
    } else {
      // callback();
      if (value && value !== form.getFieldValue('pwd')) {
        callback('输入的两个密码不一致！');
      } else {
        callback();
      }
    }
  };

  const validateToNextPassword = (rule, value, callback) => {
    // const { list } = this.props;
    const length = String(value ? value : '').length;
    // if (list !== null) {
    // const form = this.props.form;
    if (value && confirmDirty) {
      form.validateFields(['pwd2'], { force: true });
    }
    // callback();
    if (length < 8) {
      callback('密码位数少于8位!');
    } else if (length > 16) {
      callback('密码位数大于16位!');
    } else if (!checkPassword(value)) {
      callback('密码未包含数字、字母、特殊字符!');
    } else {
      callback();
    }
    // } else {
    //   callback();
    // }
  };

  const handleCancel = () => {
    form.resetFields();
    props.handleCancel();
  };

  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 14 },
  };

  function handleSubmit(e) {
    form.submit();
  }

  // 提交表单
  const onFinish = (values) => {
    handleOk(values, form.resetFields, setConfirmLoading);
  };

  const roleGroup = role.map((item) => {
    return {
      label: item.name,
      value: item.roleId,
    };
  });

  // 1本人,2本机构,3本机构及子机构,4全部
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
  ];

  // console.log(orgTreeData);
  const getDefault = () => {
    return orgId
      ? Number(orgId)
      : orgTreeData.length > 0
      ? Number(orgTreeData[0].orgId)
      : undefined;
  };

  return (
    <Modal
      title={list ? '修改用户' : '添加用户'}
      className="system-user-modal"
      open={true}
      onOk={handleSubmit}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      destroyOnClose
      maskClosable
      centered
    >
      <Form
        form={form}
        onFinish={onFinish}
        layout="horizontal"
        style={{ maxHeight: '450px', overflow: 'auto' }}
        onFinishFailed={(props) => {
          const { values, errorFields = [], outOfDate } = props;
          // console.log(values);
          // console.log(errorFields);
          // console.log(outOfDate);
          // onFinish
          if (errorFields.length === 0) {
            onFinish(values);
          }
        }}
      >
        <Form.Item
          {...formItemLayout}
          label="所属机构"
          name="parId"
          initialValue={list === null ? getDefault() : list.orgId}
          rules={[
            {
              required: true,
              message: '请选择所属机构',
            },
          ]}
        >
          <TreeSelect
            style={{ width: '100%' }}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            treeData={orgTreeData}
            placeholder="请选择所属机构"
          />
        </Form.Item>

        <Form.Item
          label="登录名称"
          {...formItemLayout}
          name="name"
          initialValue={list === null ? null : list.name}
          rules={[
            {
              required: true,
              message: '请输入登录名称!',
            },
          ]}
        >
          <Input placeholder="请输入登录名称" maxLength={20} />
        </Form.Item>

        {list ? null : (
          <div>
            <Form.Item
              label="密码"
              {...formItemLayout}
              name="pwd"
              initialValue={list === null ? null : list.pwd}
              rules={[
                {
                  required: true,
                  message: '',
                },
                // {
                //   min: 6,
                //   message: '密码长度最小6位!',
                // },
                // {
                //   max: 30,
                //   message: '密码长度最大30位!',
                // },
                {
                  validator: validateToNextPassword,
                },
              ]}
              hasFeedback
              extra={`8~16位，必须包含数字、字母、特殊字符~!@#$%^&*()_+<>?:"{},.;'`}
            >
              <Input
                type="password"
                onChange={handlePwdState}
                placeholder={'请输入密码'}
                maxLength={30}
              />
            </Form.Item>

            <Form.Item
              label="确认密码"
              {...formItemLayout}
              name="pwd2"
              initialValue={list === null ? null : list.pwd}
              rules={[
                {
                  required: true,
                  message: '',
                },
                {
                  validator: compareToFirstPassword,
                },
              ]}
              hasFeedback
              extra={`8~16位，必须包含数字、字母、特殊字符~!@#$%^&*()_+<>?:"{},.;'`}
            >
              <Input
                type="password"
                placeholder={'请输入确认密码'}
                onChange={handlePwdState}
                onBlur={handleConfirmBlur}
                maxLength={30}
              />
            </Form.Item>
          </div>
        )}

        <Form.Item
          label="真实姓名"
          {...formItemLayout}
          name="realName"
          initialValue={list === null ? null : list.realName}
          rules={[
            {
              required: true,
              message: '请输入真实姓名!',
            },
          ]}
        >
          <Input placeholder="请输入真实姓名" maxLength={8} />
        </Form.Item>

        <Form.Item
          label="角色"
          {...formItemLayout}
          name="roles"
          initialValue={list === null ? null : list.roleIds}
          rules={[
            {
              required: true,
              message: '请选择用户角色!',
            },
          ]}
        >
          <Checkbox.Group options={roleGroup} />
        </Form.Item>
        <Form.Item
          label="系统内置用户"
          {...formItemLayout}
          name="isSys"
          initialValue={list === null ? false : list.isSys}
          rules={[
            {
              required: true,
              message: '请选择系统内置用户!',
            },
          ]}
        >
          <Radio.Group>
            <Radio value={true}>是</Radio>
            <Radio value={false}>否</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="无效用户"
          {...formItemLayout}
          name="isInvalid"
          initialValue={list === null ? false : list.isInvalid}
          rules={[
            {
              required: true,
              message: '请选择无效用户!',
            },
          ]}
        >
          <Radio.Group>
            <Radio value={true}>是</Radio>
            <Radio value={false}>否</Radio>
          </Radio.Group>
        </Form.Item>

        {/*<Form.Item*/}
        {/*  label="数据权限"*/}
        {/*  {...formItemLayout}*/}
        {/*  name="dataPre"*/}
        {/*  initialValue={list === null ? 3 : list.dataPre}*/}
        {/*  rules={[*/}
        {/*    {*/}
        {/*      required: true,*/}
        {/*      message: '请选择数据权限!',*/}
        {/*    },*/}
        {/*  ]}*/}
        {/*>*/}
        {/*  <Select*/}
        {/*    style={{ width: '100%' }}*/}
        {/*    placeholder="请选择"*/}
        {/*    allowClear={false}*/}
        {/*    options={dataPreList}*/}
        {/*  />*/}
        {/*</Form.Item>*/}

        <Form.Item
          label="备注"
          {...formItemLayout}
          name="remark"
          initialValue={list === null ? null : list.remark}
        >
          <TextArea placeholder="请输入备注" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserModal;
