import React, { useState } from 'react';
import {
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Select,
  TreeSelect,
} from 'antd';
import dayjs from 'dayjs';
import regions from '../../../../utils/region';
import { orgNatureOption, orgTypeOption } from './orgUtil';
import {inputWidth, styleWidth} from '../../../component/search/form';

const treeData = zhuanZuZhi(regions);
const { TextArea } = Input;

const OrgModal = (props) => {
  const [form] = Form.useForm();
  // 点击确认按钮之后的loading
  const [confirmLoading, setConfirmLoading] = useState(false);

  // 取消
  const handleCancel = () => {
    form.resetFields();
    props.handleCancel();
  };

  //
  const { modalsAddOrgCode, modalsAddOrg, orgTreeData, handleOk, list } = props;
  let filterTree = (childrenList) => {
    return childrenList.map((item) => {
      const children = item.children;
      if (children && children.length > 0) {
        // 处理子集是否有相同的
        let newChildren = filterTree(children);
        // 判断当前是否相同
        if (item.orgId === modalsAddOrg) {
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
      } else if (item.orgId === modalsAddOrg) {
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
  let orgTreeDatas = [];
  if (list !== null) {
    orgTreeDatas.push(filterTree(orgTreeData));
  } else {
    orgTreeDatas.push(orgTreeData);
  }
  const formItemLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 17 },
  };

  function handleSubmit(e) {
    form.submit();
  }

  // 提交表单
  const onFinish = (values) => {
    handleOk(values, form.resetFields);
  };
  console.log(orgTreeDatas[0]);
  return (
    <Modal
      title={list ? '修改组织机构' : '添加组织机构'}
      open={true}
      onOk={handleSubmit}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <Form form={form} onFinish={onFinish}>
        <Row gutter={10}>
          <Col span={12}>
            <Form.Item
              {...formItemLayout}
              label="上级机构"
              name="parId"
              initialValue={
                list === null ? modalsAddOrgCode : String(list.parentOrgCode)
              }
              rules={[
                {
                  required: true,
                  message: '请选上级机构',
                },
              ]}
            >
              <TreeSelect
                style={{ width: '100%' }}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                treeData={orgTreeDatas[0]}
                placeholder="请选上级机构"
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              {...formItemLayout}
              label="机构名称"
              name="name"
              initialValue={list === null ? null : list.orgNameCn}
              rules={[
                {
                  required: true,
                  message: '请输入机构名称',
                },
              ]}
            >
              <Input placeholder="请输入名称" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              {...formItemLayout}
              label="编码"
              name="code"
              initialValue={list === null ? null : list.orgCode}
              rules={[
                {
                  required: true,
                  message: '请输入编码',
                },
              ]}
            >
              <Input placeholder="请输入编码" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              {...formItemLayout}
              label="机构类别"
              name="orgType"
              initialValue={list === null ? null : list.orgType}
              rules={[
                {
                  required: true,
                  message: '请选择机构类别',
                },
              ]}
            >
              <Select
                // style={{}}
                size="middle"
                placeholder="请选择机构类别"
                allowClear={false}
                options={orgTypeOption}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              {...formItemLayout}
              label="机构性质"
              name="orgNature"
              initialValue={list === null ? null : list.orgNature}
              rules={[
                {
                  required: true,
                  message: '请选择机构性质',
                },
              ]}
            >
              <Select
                // style={{}}
                size="middle"
                placeholder="请选择机构性质"
                allowClear={false}
                options={orgNatureOption}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              {...formItemLayout}
              label="地区"
              name="districtId"
              initialValue={list === null ? '1' : String(list.districtId)}
              rules={[
                {
                  required: true,
                  message: '请选择地区',
                },
              ]}
            >
              <TreeSelect
                style={{ width: '100%' }}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                treeData={treeData}
                placeholder="请选择地区"
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              {...formItemLayout}
              label="联系人"
              name="orgContact"
              initialValue={list === null ? null : list.orgContact}
              rules={[
                {
                  required: true,
                  message: '请输入联系人',
                },
              ]}
            >
              <Input
                placeholder="请输入联系人"
                allowClear={false}
                maxLength="8"
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              {...formItemLayout}
              label="生效时间"
              name="validDate"
              initialValue={list === null ? dayjs() : dayjs(list.validDate)}
              rules={[
                {
                  required: true,
                  message: '请选择日期',
                },
              ]}
            >
              <DatePicker
                style={inputWidth}
                // size="small"
                format={'YYYY-MM-DD'}
                allowClear={false}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              {...formItemLayout}
              label="联系电话"
              name="orgContactTitle"
              initialValue={list === null ? null : list.orgContactTitle}
            >
              <Input placeholder="请输入联系电话" maxLength="11" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              {...formItemLayout}
              label="联系人职务"
              name="orgContactPhone"
              initialValue={list === null ? null : list.orgContactPhone}
            >
              <Input placeholder="请输入联系人职务" maxLength="16" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              {...formItemLayout}
              label="成立日期"
              name="estbDate"
              initialValue={
                list === null || !list.estbDate
                  ? undefined
                  : dayjs(list.estbDate)
              }
            >
              <DatePicker
                style={styleWidth}
                // size="small"
                format={'YYYY-MM-DD'}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col span={12}>
            <Form.Item
              {...formItemLayout}
              label="机构地址"
              name="orgAddress"
              initialValue={list === null ? null : list.orgAddress}
            >
              <TextArea rows={4} placeholder="请输入机构地址" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              {...formItemLayout}
              label="备注"
              name="remark"
              initialValue={list === null ? null : list.remark}
            >
              <TextArea rows={4} placeholder="请输入备注" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default OrgModal;

/**
 * @method zhuanZuZhi
 * @param {Array} arr
 * @return {number} result 返回结果
 */
function zhuanZuZhi(arr) {
  const arrMap = new Map();
  let roots = null;
  arr.forEach(function (item, index) {
    const upid = item.upid;
    const itemObject = {
      title: item.cname,
      value: item.id,
      key: 'treeData' + item.id,
      upid: upid || null,
    };
    if (index === 0) {
      roots = {
        ...itemObject,
        children: [],
      };
    } else {
      if (arrMap.has(upid)) {
        const mapItem = arrMap.get(upid);
        mapItem.push(itemObject);
      } else {
        arrMap.set(upid, [itemObject]);
      }
    }
  });
  roots.children = eachChild(roots, arrMap);
  return [roots];
}

/**
 * @method eachChild
 * @param {object} nodes 对象
 * @param {Map} mapArr 存储所有的父节点的子集
 */
function eachChild(nodes, mapArr) {
  const Id = nodes.value;
  if (mapArr.has(Id)) {
    let list = mapArr.get(Id);
    let test = list.map((item) => {
      item.children = eachChild(item, mapArr);
      return item;
    });
    return test;
  } else {
    return null;
  }
}
