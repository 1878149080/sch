/**
 * @desc 接收路由参数
 * **/

const PageIndex = (props) => {
  // params 为路由参数
  const { params } = props;
  return <div>{params.id}</div>;
};

export default PageIndex;
