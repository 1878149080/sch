import React, { useEffect, useState } from 'react';
import { PlusSquareOutlined } from '@ant-design/icons';
import OrdinaryTab from './tabs';
import OrdinaryPane from './pane';

const OrdTest = (props) => {
  // 标签页 - 选中的面板
  const [activeKey, setActiveKey] = useState('');
  // 标签页 - 数据
  const [panes, setPanes] = useState([
    {
      title: '测试数据，测试1',
      key: 'key1',
    },
    {
      title: '测试数据，测试2',
      key: 'key2',
    },
    {
      title: '测试数据，测试3',
      key: 'key3',
    },
    {
      title: '测试数据，测试4',
      key: 'key4',
    },
    {
      title: '测试数据，测试5',
      key: 'key5',
    },
    {
      title: '测试数据，测试6',
      key: 'key6',
    },
    {
      title: '测试数据，测试7',
      key: 'key7',
    },
    {
      title: '测试数据，测试8',
      key: 'key8',
    },
    {
      title: '测试数据，测试9',
      key: 'key9',
    },
    // {
    //   title: '测试数据，测试10',
    //   key: 'key10',
    // },
    // {
    //   title: '测试数据，测试11',
    //   key: 'key11',
    // },
    // {
    //   title: '测试数据，测试12',
    //   key: 'key12',
    // },
    // {
    //   title: '测试数据，测试13',
    //   key: 'key13',
    // },
    // {
    //   title: '测试数据，测试14',
    //   key: 'key14',
    // },
    // {
    //   title: '测试数据，测试15',
    //   key: 'key15',
    // },
    // {
    //   title: '测试数据，测试16',
    //   key: 'key16',
    // },
    // {
    //   title: '测试数据，测试17',
    //   key: 'key17',
    // },
  ]);

  useEffect(() => {
    setActiveKey('key1');
  }, []);

  // 标签页 - 选中面板
  const tabsOnChange = (activeKey) => {
    setActiveKey(activeKey);
  };

  // 标签页 - 新增和删除页签的回调
  const tabsOnEdit = (targetKey, action) => {
    if (action === 'remove') {
      remove(targetKey);
    } else {
    }
  };

  // 添加
  // add = () => {
  //     const { panes } = this.state;
  //     const activeKey = `newTab${this.newTabIndex++}`;
  //     panes.push({ title: 'New Tab', content: 'New Tab Pane', key: activeKey });
  //     this.setState({ panes, activeKey });
  // };

  // 标签页 - 删除
  const remove = (targetKey) => {
    let newActiveKey = activeKey;
    let lastIndex = 0;
    panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = panes.filter((pane) => pane.key !== targetKey);
    if (newPanes.length && activeKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }

    // console.log("要删除的key：", targetKey);
    // console.log("删除后，获取到的新key： ", newActiveKey);
    setPanes(newPanes);
    setActiveKey(newActiveKey);
  };

  // 按钮组
  const btnList = [
    {
      name: '新增',
      role: 'string_line_template_add',
      icon: <span className="iconfont icon-jihuaxinxi" />,
      handle: () => {},
    },
    {
      name: '查看历史',
      role: 'string_line_template_add',
      icon: <PlusSquareOutlined />,
      handle: () => {},
    },
    {
      name: '导出模板',
      role: 'string_line_template_add',
      icon: <PlusSquareOutlined />,
      handle: () => {},
    },
  ];

  return (
    <div id="qq">
      <OrdinaryTab
        onChange={tabsOnChange}
        onEdit={tabsOnEdit}
        activeKey={activeKey}
        btnList={btnList}
      >
        {panes.map((pane) => {
          const { title, key, closable, Component } = pane;
          return (
            <OrdinaryPane tab={title} key={key} closable={closable}>
              {/*<Component params={pane.params} />*/}
              <div>
                <h1>{title}, 测试数据，测试数据，测试数据</h1>
                <h1>{title}, 测试数据，测试数据，测试数据</h1>
                <h1>{title}, 测试数据，测试数据，测试数据</h1>
                <h1>{title}, 测试数据，测试数据，测试数据</h1>
                <h1>{title}, 测试数据，测试数据，测试数据</h1>
                <h1>{title}, 测试数据，测试数据，测试数据</h1>
                <h1>{title}, 测试数据，测试数据，测试数据</h1>
              </div>
            </OrdinaryPane>
          );
        })}
      </OrdinaryTab>
    </div>
  );
};

export default OrdTest;
