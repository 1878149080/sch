import React, { useEffect, useState, useRef } from 'react';
import { Modal, Table, Form } from 'antd';
import {columns, getSelectColumns} from "@/pages/component/exportExcel/util";

/**
 * @desc 根据选择的列，导出数据到CSV
 * @class ExportExcel 导出配置
 * @author 吴昊 2020/4/13
 */
const ExportExcel = (props: any) => {
  const { list = [], handleOk } = props;
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [preX, setPreX] = useState(0);
  const [preY, setPreY] = useState(0);
  const [styleTop, setStyleTop] = useState(25);
  const [styleLeft, setStyleLeft] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const newKey = list.map((item: any) => item.title);
    setSelectedRowKeys(newKey);
    setSelectedRows(list);
  }, []);

  // 表格多选控制
  const onSelectChange = (selectedRowKeys: any, selectedRows: any) => {
    setSelectedRowKeys(selectedRowKeys);
    setSelectedRows(selectedRows);
  };

  const handleCancel = () => {
    // 如果没有在向后请求，则执行取逻辑
    if (!loading) {
      // this.props.form.resetFields();
      props.handleCancel();
    }
  };

  const handleMoseDown = (evt: any) => {
    setPreX(evt.pageX);
    setPreY(evt.pageY);
    setDragging(true);
  };

  const handleMouseMove = (evt: any) => {
    // if (this.isOverWindow) {
    //   this.handleMouseUp();
    //   return;
    // }
    const left = styleLeft + (evt.pageX - preX);
    const top = styleTop + (evt.pageY - preY);
    setPreX(evt.pageX);
    setPreY(evt.pageY);
    setStyleLeft(left);
    setStyleTop(top);
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const style = { left: styleLeft, top: styleTop };

  // 保存
  function handleSubmit() {
    const newCol = getSelectColumns(selectedRows);
    setLoading(true);
    handleOk({newCol, setLoading});
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <Modal
      title="导出配置"
      visible={true}
      onOk={handleSubmit}
      onCancel={handleCancel}
      bodyStyle={{
        padding: 2,
      }}
      okButtonProps={{
        disabled: selectedRows.length === 0,
      }}
      style={style}
      confirmLoading={loading}
      destroyOnClose
      maskClosable={!loading}
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
          onMouseUp={handleMouseUp}
        ></div>
      )}
    </Modal>
  );
};

export default ExportExcel;
