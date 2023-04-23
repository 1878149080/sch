import React, { useEffect, useState } from 'react';
import {
  Button,
  Col,
  DatePicker,
  Form,
  FormInstance,
  Input,
  Row,
  Select,
} from 'antd';
import { FormTip } from '@/utils/columnsUtils';
import { getTerminalType } from '@/services/common';

// interface
import { SearchProps } from '@/utils/interfaces';
import { optionItem } from '@/pages/interface';

const { Option } = Select;
const { RangePicker } = DatePicker;

interface SearchTypeX extends SearchProps {
  form: FormInstance;
}

const Search: React.FC<SearchTypeX> = (props) => {
  const { onSearch, form } = props;
  // const [option] = useOption(['terminalType']);
  const [terminal, setTerminal] = useState<optionItem[]>([]);

  useEffect(() => {
    getTerminalType({}).then((res) => {
      if (res.statusCode === 200) {
        setTerminal(res.content.terminalType);
      }
    });
    form.submit();
  }, []);

  const onFinish = (form: object) => {
    onSearch(form);
  };
  const selectFilter = (value: any, option: any) => {
    return option.children.includes(value);
  };
  // function callback(option: optionType) {
  //   if(option?.terminalType) {
  //     form.setFieldsValue({terminalType: option.terminalType[0].dictValue})
  //   }
  // }

  return (
    <div id="1" ref={props.refs}>
      <Form
        onFinish={onFinish}
        form={form}
        initialValues={
          {
            // date: [dayjs().subtract(3, "month"), dayjs()]
          }
        }
      >
        <Row gutter={16}>
          <Col span={4}>
            <FormTip title="创建时间">
              <Form.Item name="date">
                <RangePicker allowClear format="YYYY-MM-DD" />
              </Form.Item>
            </FormTip>
          </Col>
          <Col span={4}>
            <FormTip title="设备类型">
              <Form.Item name="terminalType">
                <Select
                  allowClear
                  showSearch
                  filterOption={selectFilter}
                  placeholder="请选择设备类型"
                  size="middle"
                  mode="multiple"
                >
                  {terminal?.map((item) => {
                    return (
                      <Option value={item.dictValue} key={item.dictName}>
                        {item.dictName}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </FormTip>
          </Col>
          <Col span={4}>
            <FormTip title="状态">
              <Form.Item name="status">
                <Select
                  allowClear
                  showSearch
                  // mode="multiple"
                  placeholder="请选择状态"
                >
                  <Option value={0} key={0}>
                    无效
                  </Option>
                  <Option value={1} key={1}>
                    有效
                  </Option>
                </Select>
              </Form.Item>
            </FormTip>
          </Col>
          <Col span={4}>
            <FormTip title="版本号">
              <Form.Item name="version">
                <Input allowClear placeholder="请输入版本号" />
              </Form.Item>
            </FormTip>
          </Col>
          <Col span={4}>
            <FormTip title="描述">
              <Form.Item name="versionDesc">
                <Input allowClear placeholder="请输入描述" />
              </Form.Item>
            </FormTip>
          </Col>
          <Col span={2}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Search;
