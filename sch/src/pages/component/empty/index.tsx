import { Empty } from 'antd';
import EmptyImg from '../../../images/delets/tip05.png';
import React from 'react';

interface EmptyData {
  className?: any;
  description?: any;
}

/**
 * @desc 自定义无数据样式
 * */
const EmptyData = (props: EmptyData) => {
  const { className = '', description = '暂无数据' } = props;
  return (
    <Empty
      className={'empty-data ' + className}
      image={EmptyImg}
      description={description}
    />
  );
};
export default EmptyData;
