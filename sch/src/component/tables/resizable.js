import React, { useState } from "react";
import { Resizable } from "react-resizable";

/*
 * 可伸缩列
 * @吴昊
 * */
export const ResizeableTitle = (props) => {
  const { onResize, width, ...restProps } = props;
  // 添加偏移量
  const [offset, setOffset] = useState(0);

  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable
      // 宽度重新计算结果，表头应当加上偏移量，这样拖拽结束的时候能够计算结果；
      // 当然在停止事件再计算应当一样，我没试过（笑）
      width={width + offset}
      height={0}
      handle={
        <span
          // 有偏移量显示竖线
          // className={classnames(["react-resizable-handle", offset && "active"])}
          className={`react-resizable-handle ${offset && 'active'}`}
          // 拖拽层偏移
          style={{ transform: `translateX(${offset}px)` }}
          onClick={(e) => {
            // 取消冒泡，不取消貌似容易触发排序事件
            e.stopPropagation();
            e.preventDefault();
          }}
        />
      }
      // 拖拽事件实时更新
      onResize={(e, { size }) => {
        // 这里只更新偏移量，数据列表其实并没有伸缩
        setOffset(size.width - width);
      }}
      // 拖拽结束更新
      onResizeStop={(...argu) => {
        // 拖拽结束以后偏移量归零
        setOffset(0);
        // 这里是props传进来的事件，在外部是列数据中的onHeaderCell方法提供的事件，请自行研究官方提供的案例
        onResize(...argu);
      }}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps} />
    </Resizable>
  );
};

// 将组件插入到表格
export const thComponents = {
  header: {
    cell: ResizeableTitle,
  },
};

// 过滤源columns数组，添加拖动事件
export function columnAddResize(self, columns) {
  return columns.map((col, index) => ({
    ...col,
    onHeaderCell: (column) => ({
      width: column.width,
      onResize: handleResize(self, index),
    }),
  }));
  // self.setState({
  //   columns: setColumn,
  // });
}

// 监听拖动事件
export const handleResize =
  (self, index) =>
  (e, { size }) => {
    e.stopImmediatePropagation();
    self.setState(() => {
      const { columns } = self.state;
      const column = columns.length > 0 ? columns : self.props.columns;
      const nextColumns = [...column];
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width,
      };
      return { columns: nextColumns };
    });
  };
