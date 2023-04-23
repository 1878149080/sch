import { IApi } from 'umi';

// 头部请求
const headList = [
  // `<title>车云基础平台</title>`,
  `<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">`,
  `<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />`,
  `<meta http-equiv="Pragma" content="no-cache" />`,
  `<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />`,
  `<meta name="renderer" content="webkit"/>`,
  `<meta name="force-rendering" content="webkit"/>`,
];

// js请求
const jsList = [
  // `<script src="https://webapi.amap.com/maps?v=2.0&key=146f6dba88e9d662d6ab1e5fe3665521"></script>`,
  // `<script src="http://webapi.amap.com/ui/1.1/main.js"></script>`
];

export default (api: IApi) => {
  api.modifyHTML(($) => {
    $('head').append(headList);
    $('#root').after(jsList);
    return $;
  });
};
