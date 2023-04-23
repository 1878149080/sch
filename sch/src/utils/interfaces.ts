// import { getQueryPager } from '@/utils/queryPage/modelsUtil';
export interface SearchProps {
  refs: (node: HTMLElement | null) => void;
  onSearch: (form: object) => void;
}

// 表格list参数类型
export interface ListProps {
  pageThis: object | (() => { refList: HTMLElement | null }); // 如果是class component值就是this, function component就是普通对象
  getPage: (queryPager?: any) => void; // 页面和每页大小改变触发得事件
  table: {
    loading: boolean;
    dataSource: any[];
  };
  getQueryPager?: any;

  [index: string]: any;
}

// 表格工具栏按钮参数
export interface BarBtn {
  name: string; // 按钮名称
  disabled?: boolean; // 是否展示
  icon?: JSX.Element | null; // 图标
  role?: string | string[]; //权限标识
  handle?: () => void; // 点击事件
}

// 表格工具tableToolbar参数
export interface TableToolbarType {
  pageThis?: object | (() => { refList: HTMLElement | null }); // 获取index页面的this
  columns: any; // 表格头
  setColumn: (columns: any) => void;
  columnFilterEnable?: boolean; // 是否展示列配置
  btnList?: BarBtn[]; // 按钮列表
  canExpand?: boolean; // 是否显示最大化
  className?: string; // tableToolbar列名
  title?: string | JSX.Element | Function | any[]; // 表格名称
  // tableBtnRefs?: (node: HTMLElement | null) => void,
}

export interface OrdersType {
  fieldName: string;
  isAsc: boolean;
}

// 表格参数
export interface TableType {
  pagination: object | boolean;
  table: {
    loading: boolean;
    dataSource: any[];
    columns: any[];
    scroll?: {
      y?: number;
      x?: number;
    };
    columnSorter?: (columnObj: object) => OrdersType[];
    [index: string]: any;
  };
  getPage?: (queryPager?: any) => void;
  queryPager?: object;
}

/*************** 登录request ***************/
export type URLType = string; // 登录地址
export type RequestOptionsType = {
  login?: boolean; // true：说明是登录，需要调用登录接口
  logout?: boolean; // true: 说明是推出登录，需要调用推出登录接口
  upData?: boolean; // true: 说明是上传文件
  data?: any; // 请求参数，
};
