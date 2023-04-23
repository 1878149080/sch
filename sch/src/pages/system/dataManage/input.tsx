import React, { useState } from "react";
import { Select } from "antd";

// 既可以选择，有支持输入
const CusSelect: React.FC<any> = (props) => {
  const [option, setOption] = useState([
    {
      value: 1,
      label: '1',
    },
  ]);
  const onChange = (value: any) => {};
  return <Select showSearch options={option} onChange={onChange}></Select>;
};
