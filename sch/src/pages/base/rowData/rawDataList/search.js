import React, { useEffect, useState } from 'react';
import {
  Col,
  Row,
  DatePicker,
  TreeSelect,
  TimePicker,
  Button,
  Form,
  Tooltip,
  Select,
} from 'antd';
import dayjs from 'dayjs';
import { FormTip } from '@/utils/columnsUtils';
import { getLineCarTree, getOrgData } from './util/request';

const Search = (props) => {
  const { refs, handleSubmit } = props;
  const [form] = Form.useForm();
  const [orgOption, setOrgOption] = useState([]);
  const [lineOption, setLineOption] = useState([]);

  useEffect(() => {
    getOrgData({
      setOrgOption,
      form,
      callback: (orgValue) => {
        getLineData(orgValue, 1);
      },
    });
  }, []);

  // 获取线路数据
  const getLineData = (orgValue, isSearch = 0) => {
    getLineCarTree({
      form,
      isSearch,
      setLineOption,
      params: {
        orgId: orgValue,
      },
    });
  };

  // 更改组织机构，重新获取线路车辆
  const handleOrgChange = (orgValue) => {
    form.setFieldsValue({
      plateNumber: undefined,
    });
    getLineData(orgValue);
  };

  // 提交表单
  const onFinish = (values) => {
    handleSubmit(values);
  };

  return (
    <Row gutter={10} style={{ marginLeft: '0px', marginRight: '0px' }}>
      <div className="searchBox" ref={refs}>
        <Form
          form={form}
          onFinish={onFinish}
          layout="inline"
          initialValues={{
            date: dayjs(),
            startTime: dayjs().add(-5, 'minute'),
            endTime: dayjs(),
          }}
        >
          <Col span={4}>
            <Tooltip title="组织机构">
              <Form.Item name="fleet">
                <TreeSelect
                  style={{ width: '100%' }}
                  dropdownStyle={{
                    maxHeight: 500,
                    overflow: 'auto',
                  }}
                  treeData={orgOption}
                  onSelect={handleOrgChange}
                  placeholder="请选择所属机构"
                />
              </Form.Item>
            </Tooltip>
          </Col>
          <Col span={4}>
            <Tooltip title="车辆">
              <Form.Item name="plateNumber">
                <TreeSelect
                  treeData={lineOption}
                  disabled={lineOption?.length === 0}
                  style={{ width: '100%' }}
                  placeholder="请选择车牌号"
                  dropdownStyle={{
                    maxHeight: 500,
                    overflow: 'auto',
                  }}
                  showSearch
                />
              </Form.Item>
            </Tooltip>
          </Col>
          <Col span={4}>
            <FormTip title="日期">
              <Form.Item name="date">
                <DatePicker
                  allowClear={false}
                  style={{ width: '100%' }}
                  format="YYYY-MM-DD"
                />
              </Form.Item>
            </FormTip>
          </Col>
          <Col span={5}>
            <div
              style={{
                display: 'inline-block',
                width: 'calc(50% - 10px)',
              }}
            >
              <FormTip title="开始时间">
                <Form.Item name="startTime">
                  <TimePicker allowClear={false} style={{ width: '100%' }} />
                </Form.Item>
              </FormTip>
            </div>
            <span
              style={{
                display: 'inline-block',
                width: '20px',
                textAlign: 'center',
              }}
            >
              -
            </span>
            <div
              style={{
                display: 'inline-block',
                width: 'calc(50% - 10px)',
              }}
            >
              <FormTip title="结束日期">
                <Form.Item name="endTime">
                  <TimePicker allowClear={false} style={{ width: '100%' }} />
                </Form.Item>
              </FormTip>
            </div>
          </Col>
          <Col span={4}>
            <Tooltip title="营运公交类型">
              <Form.Item name="type" initialValue="2">
                <Select
                  allowClear={false}
                  placeholder="请选择营运公交类型"
                  options={typeOption}
                />
              </Form.Item>
            </Tooltip>
          </Col>
          <Col span={2} offset={0} pull={0} style={{ textAlign: 'left' }}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
          </Col>
        </Form>
      </div>
    </Row>
  );
};

export default Search;

// 营运类型
export const typeOption = [
  {
    label: "常规公交",
    value: "2"
  },
  {
    label: "BRT公交",
    value: "1"
  },
];
