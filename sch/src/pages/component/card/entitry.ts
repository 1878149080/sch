export interface CardInterface {
  // 标题
  title?: any;
  // 尺寸
  size?: string;
  // 类名
  className?: string;
  // ref
  ref?: any;
  // 操作区域
  extra?: any;
  // 是否开启最大化
  isMaximize?: boolean;
  // 最大化事件监听
  onChangeMax?: any;
  // 子元素
  children?: any;
}
