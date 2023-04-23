import { message } from "antd";

/** 导出需要携带token，此处采用原生XMLHttpRequest去下载文件流 */
// 对参数没有处理
export function exportFile(params) {
  const { url, fileName, callback } = params;

  function createObjectURL(object) {
    return window.URL
      ? window.URL.createObjectURL(object)
      : window.webkitURL.createObjectURL(object);
  }

  var xhr = new XMLHttpRequest();
  var formData = new FormData();
  xhr.open('get', url);
  xhr.setRequestHeader(
    'Authorization',
    'Bearer ' + localStorage.getItem('tsvcloud_token'),
  );
  xhr.responseType = 'blob';
  xhr.onload = function (e) {
    if (this.status === 200) {
      var blob = this.response;
      let fileNames = null;
      let contentDisposition = xhr.getResponseHeader('Content-Disposition');
      const { type } = blob;
      // if(blob.statusCode === 500){
      if (type === 'text/plain' || type === 'application/json') {
        const reader = new FileReader();
        reader.readAsText(blob, 'utf-8');
        reader.onload = function (e) {
          const result = JSON.parse(reader.result);
          message.error(
            result?.message ?? result?.content ?? '导出功能发生了错误！',
          );
        };

        return false;
      }
      // todo 为啥要区分开发环境和线上环境？？？？
      // if (window.location.hostname.indexOf('localhost') === -1) {
      // fileNames = decodeURIComponent(xhr.getResponseHeader("Content-Disposition")?.split(";")[1]?.split("filename=")[1]);

      // 如果没有该标头，获取结果则为null
      if (contentDisposition) {
        fileNames = decodeURI(
          contentDisposition
            ?.split(';')[1]
            ?.split('filename=')[1]
            .replaceAll('"', ''),
        );
      }
      //   const fileNames = xhr.getResponseHeader("Content-Disposition").split(";")[1].split("filename=")[1];
      //   const fileNames1 = xhr.getResponseHeader("Content-Disposition");
      //   console.log(fileNames);
      //   console.log(fileNames1);
      // }
      if (window.navigator.msSaveOrOpenBlob) {
        // navigator.msSaveBlob(blob, filename);
        navigator.msSaveBlob(blob, fileNames ?? fileName);
      } else {
        var a = document.createElement('a');
        var url = createObjectURL(blob);
        a.href = url;
        a.download = fileNames ?? (fileName ? fileName : '报表.xlsx');
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      }
    } else {
      message.error('导出功能发生了错误！');
    }
  };
  xhr.onloadend = function (e) {
    callback && callback();
  }
  xhr.send(formData);
}

// 处理下载参数 按照分页导出条件处理参数
export function download({
  url,
  conditions,
  orderConditions,
  paramsName,
  before,
  fileName,
}) {
  let cond = '';
  conditions.forEach((condItem) => {
    cond =
      cond +
      condItem['conditionType'] +
      ':' +
      condItem['dataType'] +
      ':' +
      condItem['fieldName'] +
      ':' +
      condItem['type'] +
      ':' +
      condItem['value'];
    if (condItem['group']) {
      cond = cond + ':' + condItem['group'];
    }
    cond = cond + ';';
  });
  let order = '';
  orderConditions.forEach((orderItem, index) => {
    order = order + orderItem['fieldName'] + ':' + orderItem['isAsc'];
    order = order + ';';
  });
  let URL = url + '?' + (paramsName || 'cond') + '=' + cond;
  URL += '&orderCond=' + order;

  if (before) {
    exportFile({ url: before(url, cond), fileName });
  } else {
    exportFile({ url: URL, fileName });
  }
}

// 直接使用分页条件，并且使用encodeURIComponent加密
export function downExcel(params) {
  let str = encodeURIComponent(JSON.stringify(params.param)) || "";
  exportFile({
    url: params.url + "?cond=" + str + '&fields=' + (params?.fields || ''),
    fileName: params?.fileName,
    callback: params.callback
    // downloadURL + "?cond=" + (params?.param || '') + '&fields=' + (params?.fields || ''),
  });
}
