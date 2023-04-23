import React, { Suspense } from 'react';
import ErrorBoundary from '../../component/errorCom/ErrorBoundary';
import { Layout, Spin } from 'antd';

const { Content } = Layout;

/*
 *  内容区域
 * */
class concent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { Component, indexSelf, params, title } = this.props;

    return (
      <ErrorBoundary title={title}>
        <Content>
          <Suspense
            fallback={
              <Spin
                className="page-spin"
                tip="正在加载页面中..."
                size="large"
              />
            }
          >
            <Component indexSelf={indexSelf} params={params} />
          </Suspense>
        </Content>
      </ErrorBoundary>
    );
  }
}

export default concent;
