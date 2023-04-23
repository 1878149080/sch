import React, { useEffect } from "react";
import { Button, Col, DatePicker, Form, Row, Select, Tooltip } from "antd";
import { useOption } from "@/utils/hooks/index";

// interface
import { SearchProps } from "@/utils/interfaces";
// import { FormInstance } from 'antd';
const { Option } = Select;
const { RangePicker } = DatePicker;

interface SearchTypeX extends SearchProps {}

const Search: React.FC<SearchTypeX> = (props) => {
  const { onSearch } = props;
  const [form] = Form.useForm();
  const [option, setOption] = useOption(['projectId']);
  useEffect(() => {
    form.submit();
  }, []);
  const onFinish = (form: object) => {
    onSearch(form);
  };
  const deviceChanged = (value: any) => {};
  const supplierChanged = (value: any) => {};

  return (
    <div id="1" ref={props.refs}>
      <Form onFinish={onFinish} form={form} initialValues={{}}>
        <Row gutter={16}>
          <Col span={4}>
            <Tooltip title="项目名称">
              <Form.Item name="project">
                <Select
                  showSearch
                  allowClear
                  placeholder="请选择项目名称"
                  onChange={deviceChanged}
                >
                  {option.projectId?.map((item) => {
                    return (
                      <Option value={item.dictValue} key={item.dictName}>
                        {item.dictName}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Tooltip>
          </Col>
          <Col span={4}>
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
