import React, { useState } from 'react';
import dayjs from 'dayjs';
import { Drawer } from 'antd';
import { render } from '@/pages/system/operationLog/columns';

export default function (props: any) {
  const columns = [
    {
      title: '编号',
      dataIndex: 'infoId',
      key: 'infoId',
      width: 70,
      align: 'left',
      sorter: true,
      render: render,
    },
    {
      title: '真实名称',
      dataIndex: 'userName',
      key: 'userName',
      width: 70,
      align: 'left',
      sorter: true,
      render: render,
    },
    {
      title: '地址',
      dataIndex: 'ipaddr',
      key: 'ipaddr',
      width: 70,
      align: 'left',
      sorter: true,
      render: render,
    },
    {
      title: '异常名称',
      dataIndex: 'exceptionName',
      key: 'exceptionName',
      width: 70,
      align: 'left',
      sorter: true,
      render: render,
    },
    {
      title: '异常描述',
      dataIndex: 'msg',
      key: 'msg',
      width: 70,
      align: 'left',
      sorter: true,
      render: (text: any) => {
        return text ? <RenderTip text={text} /> : '--';
      },
    },
    {
      title: '访问时间',
      dataIndex: 'accessTime',
      key: 'accessTime',
      width: 70,
      align: 'left',
      sorter: true,
      defaultSortOrder: 'descend',
      render: renderDate,
    },
  ];
  return columns;
}

function renderDate(text: string) {
  return dayjs(text).format('YYYY-MM-DD HH:mm:ss');
}

function RenderTip(props: any) {
  const { text } = props;
  const [open, setOpen]: any = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <a className="text-tip" onClick={showDrawer}>
        {text}
      </a>
      <Drawer
        title="异常描述"
        placement="right"
        closable={false}
        width={1000}
        onClose={onClose}
        open={open}
      >
        <code rootStyle={{ fontSize: 12 }}>{text}</code>
      </Drawer>
    </>
  );
}
