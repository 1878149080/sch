import React, { useEffect, useState } from 'react';
import { Form, Input, Modal, Tree } from 'antd';

const { TextArea } = Input;
const { TreeNode } = Tree;

const roleModal = (props) => {
  const [form] = Form.useForm();
  const {
    // visible,
    permission,
    rootMenus,
    handleOk,
    list,
  } = props;
  const [permissionIds, setPermissionIds] = useState([]);
  // 半选中状态的父级
  const [halfCheckedKeys, setHalfCheckedKeys] = useState([]);
  // 判断是否选择
  const [checked, setChecked] = useState(false);
  // 提交状态
  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    const { list, rootMenus } = props;
    if (list) {
      let ids = list.menuIds
        .filter((a) => rootMenus.indexOf(a) === -1)
        .map((item) => String(item));
      setPermissionIds(ids);
      form.setFieldsValue({
        permissionIds: ids,
      });
      // console.log(ids);
    }
  }, []);

  const handleCancel = () => {
    form.resetFields();
    props.handleCancel();
  };

  const onCheck = (checkedKeys, info) => {
    setPermissionIds(checkedKeys);
    setHalfCheckedKeys(info.halfCheckedKeys);
    setChecked(true);
    // console.log(checkedKeys);
    form.setFieldsValue({
      permissionIds: checkedKeys,
    });
  };

  const renderTreeNodes = (data) =>
    data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      if (Number(item.perssionType) === 5) {
        return (
          <TreeNode key={item.value} {...item} style={{ display: 'none' }} />
        );
      } else {
        return <TreeNode key={item.value} {...item} />;
      }
      // return <TreeNode key={item.value} {...item} />;
    });

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 15 },
  };

  function handleSubmit(e) {
    form.submit();
  }

  // 提交表单
  const onFinish = (values) => {
    handleOk(
      values,
      halfCheckedKeys,
      form.resetFields,
      checked,
      setConfirmLoading,
    );
  };

  return (
    <Modal
      title={list ? '修改角色' : '添加角色'}
      open={true}
      onOk={handleSubmit}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      destroyOnClose
      bodyStyle={{
        maxHeight: 450,
        overflow: 'auto',
      }}
    >
      <Form form={form} onFinish={onFinish}>
        <Form.Item
          {...formItemLayout}
          label="名称"
          name="name"
          initialValue={list === null ? null : list.name}
          rules={[
            {
              required: true,
              message: '请输入名称',
            },
          ]}
        >
          <Input placeholder="请输入名称" maxLength={10} />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="备注"
          name="remark"
          initialValue={list === null ? null : list.remark}
        >
          <TextArea rows={4} placeholder="请输入备注" maxLength={200} />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="菜单权限"
          name="permissionIds"
          initialValue={
            list
              ? // ? list.menuIds.filter((a) => rootMenus.indexOf(a) === -1)
                list.menuIds
                  .filter((a) => rootMenus.indexOf(a) === -1)
                  .map((item) => String(item))
              : null
          }
          rules={[
            {
              required: true,
              message: '请选择菜单权限',
            },
          ]}
        >
          <Tree
            checkable
            showLine
            // checkStrictly
            checkedKeys={permissionIds}
            onCheck={onCheck}
          >
            {renderTreeNodes(permission)}
          </Tree>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default roleModal;
