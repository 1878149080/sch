export function exportFile(params: {
  url: string;
  fileName?: string;
  callback?: () => void;
}): void;

export function download(params: {
  url: string; // 地址
  conditions: any[]; // 条件
  orderConditions: any[]; // 排序字段
  paramsName?: string; // 地址参数字段名
  fileName?: string;
  before?: (url: string, data: string) => string; // 请求发送前的地址处理函数
}): void;

export function downExcel(params: {
  url: string,
  param: any,
  fields: any,
  fileName?: string,
  callback?: () => void
}): void;
