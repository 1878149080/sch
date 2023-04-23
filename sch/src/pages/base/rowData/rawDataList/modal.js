import React, { useEffect, useState, useRef } from 'react';
import { Modal, Table, Form } from 'antd';

/**
 * @desc 根据选择的列，导出数据到CSV
 * @class modalConfirm 导出配置
 * @author 吴昊 2020/4/13
 */
const modalConfirm = (props) => {
  const { confirmLoading, visible, list, handleOk } = props;
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [preX, setPreX] = useState(0);
  const [preY, setPreY] = useState(0);
  const [styleTop, setStyleTop] = useState(25);
  const [styleLeft, setStyleLeft] = useState(0);
  const windowH = document.body.clientHeight;
  const windowW = document.body.clientWidth;

  // 表格多选控制
  const onSelectChange = (selectedRowKeys, selectedRows) => {
    setSelectedRowKeys(selectedRowKeys);
    setSelectedRows(selectedRows);
  };
  // 清空表格选择
  const clearTableSelect = () => {
    setSelectedRowKeys([]);
    setSelectedRows([]);
  };
  const handleCancel = () => {
    // 如果没有在向后请求，则执行取逻辑
    if (!confirmLoading) {
      // this.props.form.resetFields();
      props.handleCancel();
    }
  };

  const isOverWindow = (moveX, moveY) => {
    const er = 10;
    if (moveX < er) return true;
    if (moveX > windowW - er) return true;
    if (moveY < er) return true;
    if (moveY > windowH - er) return true;
    return false;
  };

  const handleMoseDown = (evt) => {
    setPreX(evt.pageX);
    setPreY(evt.pageY);
    setDragging(true);
  };

  const handleMouseMove = (evt) => {
    // if (this.isOverWindow) {
    //   this.hanldeMouseUp();
    //   return;
    // }
    const left = styleLeft + (evt.pageX - preX);
    const top = styleTop + (evt.pageY - preY);
    setPreX(evt.pageX);
    setPreY(evt.pageY);
    setStyleLeft(left);
    setStyleTop(top);
  };

  const hanldeMouseUp = () => {
    setDragging(false);
  };

  const style = { left: styleLeft, top: styleTop };

  function handleSubmit(e) {
    handleOk(selectedRows);
  }

  const columns = [
    {
      title: '序号',
      dataIndex: 'ids',
      key: 'ids',
      width: 60,
      render(text, record, index) {
        return index;
      },
    },
    {
      title: '列名',
      dataIndex: 'title',
      key: 'title',
    },
  ];
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <Modal
      title="导出配置"
      visible={visible}
      onOk={handleSubmit}
      onCancel={handleCancel}
      bodyStyle={{
        padding: 2,
      }}
      style={style}
      confirmLoading={confirmLoading}
      destroyOnClose
      maskClosable={confirmLoading}
      centered
    >
      <div className="drag-target" onMouseDown={handleMoseDown}></div>
      <Table
        columns={columns}
        dataSource={list}
        bordered
        size="small"
        style={{ background: '#fff' }}
        pagination={false}
        rowSelection={rowSelection}
        rowKey={(record) => record.title}
        scroll={{ y: 500 }}
      />
      {dragging && (
        <div
          className="drag-mask"
          onMouseMove={handleMouseMove}
          onMouseUp={hanldeMouseUp}
        ></div>
      )}
    </Modal>
  );
};

export default modalConfirm;
