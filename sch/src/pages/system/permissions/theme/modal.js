import React, { useState } from 'react';
import {
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Row,
  Switch,
  TreeSelect,
} from 'antd';
import { iconList } from '../../../../utils/icon';

const { TextArea } = Input;

/**
 * @desc 添加/编辑菜单
 * @class 菜单弹窗
 * @author 吴昊 2020/1/16
 */
const ThemeModal = (props) => {
  const {
    handleCancel,
    modalsMenu,
    treeData,
    // visible,
    handleOk,
    confirmLoading,
    // handleCancel,
    list = null,
  } = props;
  const [form] = Form.useForm();
  // icon弹窗是否显示
  const [visibleIcon, setVisibleIcon] = useState(false);
  // 主动更改类型
  const [setPerssionType, setSetPerssionType] = useState(null);

  const handleCancels = () => {
    form.resetFields();
    handleCancel();
  };

  // 点击输入框，弹出选择icon的弹窗
  const handleClickIconInput = () => {
    setVisibleIcon(true);
  };

  // 选中icon
  const handleSelectIco = (value) => {
    form.setFieldsValue({
      icon: value,
    });
    setVisibleIcon(false);
  };

  // 过滤树结构
  const filterTree = (childrenList) => {
    const { modalsAddOrg } = props;
    return childrenList.map((item) => {
      const children = item.children;
      if (children && children.length > 0) {
        // 处理子集是否有相同的
        let newChildren = filterTree(children);
        // 判断当前是否相同
        if (item.menuId === modalsAddOrg) {
          return {
            ...item,
            children: newChildren,
            disabled: true,
            selectable: true,
          };
        } else {
          return {
            ...item,
            children: newChildren,
          };
        }
      } else if (item.menuId === modalsAddOrg) {
        return {
          ...item,
          disabled: true,
          selectable: true,
        };
      } else {
        return item;
      }
    });
  };

  // 更改类型
  const handlePerssionType = (e) => {
    setSetPerssionType(e.target.value);
  };

  // 表单元素的宽度
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  // 表单提交事件
  function handleSubmit(e) {
    form.submit();
  }

  // 转化icon的list
  const iconHtml = iconList.map((item, index) => {
    // return <AppstoreOutlined />;
    return <span />;
  });

  // 默认显示哪个类型
  let defaultType = list === null ? 0 : list.perssionType || 0;
  defaultType = setPerssionType === null ? defaultType : setPerssionType;

  // 提交表单
  const onFinish = (values) => {
    handleOk(values, form.resetFields);
  };

  return (
    <div>
      <Modal
        title={list ? '修改菜单' : '添加菜单'}
        width={900}
        open={true}
        onOk={handleSubmit}
        confirmLoading={confirmLoading}
        onCancel={handleCancels}
      >
        <Form form={form} onFinish={onFinish}>
          <Row gutter={6}>
            <Col span={12}>
              <Form.Item
                {...formItemLayout}
                label="类型"
                name="perssionType"
                initialValue={list === null ? 0 : list.perssionType}
                rules={[
                  {
                    required: true,
                    message: '请选择菜单类型',
                  },
                ]}
              >
                <Radio.Group buttonStyle="solid" onChange={handlePerssionType}>
                  <Radio.Button value={0}>菜单</Radio.Button>
                  <Radio.Button value={1}>按钮</Radio.Button>
                  <Radio.Button value={2}>API</Radio.Button>
                  <Radio.Button value={3}>目录</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                {...formItemLayout}
                label="上级"
                name="menuParId"
                initialValue={
                  list === null
                    ? modalsMenu
                      ? modalsMenu.menuId
                      : null
                    : list.menuParId
                }
                rules={[
                  {
                    required: true,
                    message: '请选择上级菜单',
                  },
                ]}
              >
                <TreeSelect
                  style={{ width: '100%' }}
                  allowClear={false}
                  dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                  treeData={list !== null ? filterTree(treeData) : treeData}
                  placeholder="请选上级菜单"
                />
              </Form.Item>
            </Col>

            {/*{defaultType === 0 ? (*/}
            {/*  <Col span={12}>*/}
            {/*    <Form.Item*/}
            {/*      {...formItemLayout}*/}
            {/*      label="图标"*/}
            {/*      name="icon"*/}
            {/*      initialValue={list === null ? undefined : list.icon}*/}
            {/*    >*/}
            {/*      <Input*/}
            {/*        allowClear*/}
            {/*        placeholder="请选择图标"*/}
            {/*        onClick={() => handleClickIconInput()}*/}
            {/*      />*/}
            {/*    </Form.Item>*/}
            {/*  </Col>*/}
            {/*) : null}*/}

            <Col span={12}>
              <Form.Item
                {...formItemLayout}
                label="名称"
                name="menuName"
                initialValue={list === null ? null : list.menuName}
                rules={[
                  {
                    required: true,
                    message: '请输入名称',
                  },
                ]}
              >
                <Input allowClear={false} placeholder="请输入名称" />
              </Form.Item>
            </Col>

            {defaultType === 1 ? (
              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  label="权限标识"
                  name="permissionCode"
                  initialValue={list === null ? undefined : list.permissionCode}
                  rules={[
                    {
                      required: true,
                      message: '请输入权限标识',
                    },
                  ]}
                >
                  <Input
                    allowClear={false}
                    style={{ width: '100%' }}
                    placeholder="请输入权限标识"
                  />
                </Form.Item>
              </Col>
            ) : null}

            {defaultType !== 3 ? (
              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  label="地址"
                  name="menuAddr"
                  initialValue={list === null ? null : list.menuAddr}
                  rules={[
                    {
                      required: defaultType !== 0,
                      message: '请输入地址',
                    },
                  ]}
                >
                  <Input allowClear={false} placeholder="请输入地址" />
                </Form.Item>
              </Col>
            ) : null}

            <Col span={12}>
              <Form.Item
                {...formItemLayout}
                label="序号"
                name="menuIndex"
                initialValue={
                  list === null
                    ? modalsMenu
                      ? modalsMenu.childLength
                      : 0
                    : list.menuIndex
                }
                rules={[
                  {
                    required: true,
                    message: '请输入序号',
                  },
                ]}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  min={0}
                  max={99}
                  placeholder="请输入序号"
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                {...formItemLayout}
                label="是否开启"
                name="isInvalid"
                initialValue={list === null ? true : !list.isInvalid}
                valuePropName="checked"
              >
                <Switch checkedChildren="开启" unCheckedChildren="关闭" />
              </Form.Item>
            </Col>

            {defaultType === 0 || defaultType === 3 ? (
              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  label="备注"
                  name="menuRemark"
                  initialValue={list === null ? null : list.menuRemark}
                >
                  <TextArea allowClear rows={4} placeholder="请输入备注" />
                </Form.Item>
              </Col>
            ) : null}
          </Row>
        </Form>
      </Modal>
      <Modal
        title="菜单图标"
        className="menuModal"
        open={visibleIcon}
        bodyStyle={{
          padding: '0 0 24px 0',
        }}
        footer={null}
        onCancel={() => setVisibleIcon(false)}
      >
        <div className="iconList">{iconHtml}</div>
      </Modal>
    </div>
  );
};

export default ThemeModal;
