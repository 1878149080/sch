import React, { useRef, useState } from "react";
import { Table } from "antd";
// import { VList } from '../../../../component/vList/vlist2';
import { columnAddResize, thComponents } from "../resizable";

/**
 * 数据表格
 * @吴昊
 * */

function List(props) {
  // eslint-disable-next-line no-unused-vars
  const [columns, setColumns] = useState([]);
  // const [tableWidth, setTableWidth] = useState(0);
  const tableRef = useRef(null);

  // 获取表格高度
  const getTableHeight = () => {
    const tabsWidth = getRootWidth(tableRef);
    return {
      tableWidth: tabsWidth,
    };
  };

  // 获取dataIndex
  const getDataIndex = (list = []) => {
    return list.map((item) => item.dataIndex || '-').join('');
  };

  // 表头列，实时更新
  const checkColumn = () => {
    const stateColumns = columns;
    const propsColumns = props.columns;
    const stateStr = getDataIndex(stateColumns);
    const propsStr = getDataIndex(propsColumns);
    // 1. 根据dataIndex，判断是否是新的表头
    const upSate = JSON.stringify(stateStr) !== JSON.stringify(propsStr);
    return upSate ? propsColumns : stateColumns;
  };

  // 过滤数组。
  // 1。 固定列，调整列位置，否则会引起样式Bug
  // 2。 添加拖拽列功能
  const filterColumn = () => {
    // const list =
    //   this.state.columns.length > 0 ? this.state.columns : this.props.columns;
    // const { tableWidth } = this.state;
    const { tableWidth } = getTableHeight();
    const list = checkColumn();
    const left = [];
    const content = [];
    const right = [];
    for (let i = 0; i < list.length; i++) {
      const item = list[i];
      const { fixed = '', columnVisible = true } = item;
      // 过滤隐藏列
      if (columnVisible) {
        if (fixed === 'right') {
          right.push(item);
        } else if (fixed === '') {
          content.push(item);
        } else {
          left.push(item);
        }
      }
    }

    const data = [].concat(left, content, right);
    let copyData = data.map((item) => {
      return { ...item };
    });
    let width = 0;
    for (let i = 0; i < data.length; i++) {
      width += data[i].width;
    }
    // 判断展示的表格宽度是否大于当前的表格宽度，小于的时候不进行固定，防止出现表格错行
    if (width < tableWidth) {
      copyData.map((item) => {
        item.fixed = '';
        return item;
      });
      // 添加拖拽列
      return columnAddResize(props.preSelf, copyData);
    } else {
      // 添加拖拽列
      return columnAddResize(props.preSelf, data);
    }
  };

  // 如果条数大于或者等于50条，则自动开启虚拟列表
  const isVirtuallistTable = () => {
    const { dataSource } = props;
    // if (dataSource.length >= 50) {
    //   const scroll = isScroll();
    //   const newTableCom = VList({ height: scroll.y });
    //   // const newTableCom = VList();
    //   return Object.assign({}, thComponents, newTableCom);
    // }
    return thComponents;
  };

  // 获取滚动数据
  const isScroll = () => {
    const { scroll, columns, tableHeight } = props;
    const scrollY = scroll ? (scroll.y ? scroll.y : 0) : 0;
    const xx = columns
      .map((item) => {
        return item.columnVisible !== false ? item.width : 0;
      })
      .reduce((a, b) => a + b);
    const a = {
      x: xx,
      y: tableHeight - scrollY,
    };
    //console.log(a);
    return a;
  };

  const { dataSource = [], loading = false, onChange } = props;

  // console.log(dataSource);
  return (
    <Table
      ref={tableRef}
      id={'table' + new Date().getTime()}
      columns={filterColumn()}
      components={isVirtuallistTable()}
      // components={VList({
      //   height: scroll.y,
      //   // height: 500,
      // })}
      // bordered={true}
      dataSource={dataSource}
      loading={loading}
      rowkey={(item) => item.key}
      pagination={false}
      onChange={onChange}
      scroll={isScroll()}
      size="small"
      style={{ background: '#fff' }}
    />
  );
}

function ListComponent(props) {
  return List(props);
}

function getRootWidth(ref) {
  const id = ref?.current?.props?.id;
  const DomObject = document.getElementById(id);
  return DomObject ? DomObject.offsetWidth : 0;
}

export default ListComponent;
