import React from 'react';
import Icon from '../../images/system/pageError.png';
import { Result } from 'antd';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 将错误日志上报给服务器
    // logErrorToMyService(error, errorInfo);
    console.log('错误边界，error:', error);
    console.log('错误边界，errorInfo:', errorInfo);
  }

  getTitle = () => {
    const { title } = this.props;
    if (title) {
      return (
        <div>
          错误来自：<span style="color:red">${title}</span> 页面
        </div>
      );
    }
    return '';
  };

  render() {
    if (this.state.hasError) {
      // 你可以自定义降级后的 UI 并渲染
      return (
        <Result
          className="page-error"
          icon={<img src={Icon} alt="错误代码403的图片" />}
          title={
            <>
              <div>网络或者浏览器异常，请手动刷新页面。</div>
            </>
          }
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
