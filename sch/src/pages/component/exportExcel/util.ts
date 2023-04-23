// 表头
export const columns = [
  {
    title: '序号',
    dataIndex: 'ids',
    key: 'ids',
    width: 60,
    render(text: any, record: any, index: number) {
      return index + 1;
    },
  },
  {
    title: '列名',
    dataIndex: 'title',
    key: 'title',
  },
];

// 获取选中的列
export function getSelectColumns(columns = []) {
  return columns.map((item: any) => item.dataIndex).join(',');
}


