# 导出配置列

> 具体例子路径:`web/base_data/src/pages/brt/speedCloud/dynamicSpeedLimits/dynamicSpeedLimit/list.tsx` 

## Service

```js
// 列表下载
export const downloadURL =
  Config.tomcatUrl + '/tsvcloud/brt/ruleparam/dtxs/export?cond=';

// 导出方法
export function downExcel(params: any) {
  exportFile({
    url: downloadURL + (params?.param || '') + '&fields=' + (params?.fields || ''),
    fileName: params?.fileName,
    callback: params?.callback,
  });
}

```

## 使用方法

```js
import ExportExcel from "@/pages/component/exportExcel/exportExcel";

// 导出列的props
const exportProps = {
  // 配置列的内容
  list: columns.filter((item: any) => item.title !== '操作'),
  // 导出文件的业务
  handleOk: (props: any) => {
    const {newCol, setLoading} = props;
    downExcel({
      param: encodeURIComponent(
        JSON.stringify({
          queryPager,
        }),
      ),
      fields: newCol,
      fileName: '1111',
      callback: () => {
        exportProps.handleCancel();
        setLoading(false);
      }
    });
  },
  // 关闭弹簧
  handleCancel: () => {
    this.setState({
      exportExcel: false,
    })
  }
};
```
