import { message } from "antd";
import config from "./config";
import { clearStorage } from "./localStorage";
// import {getIsIe} from "./index";

/**
 * 数组队列 - 主要用于当需要刷新token的时候，阻塞ajax，等新的请求到达后，则执行队列列面的ajax方法
 */
let ajaxQueue = [];

export default function downloadFile(url, callback, retryTimes = 0) {
  const loginTime = Number(localStorage.getItem('tsvcloud_loginTime'));
  const newTIme = new Date().getTime();
  const times = newTIme - loginTime;

  const recordUrl = url.replace(',params', '');

  const promise = new Promise(function (resolve, reject) {
    // token快过期，续期 - 剩余10分钟时，自动续期
    // if (times >= 6000) {
    if (times <= 6000) {
      if (ajaxQueue.length === 0) {
        refreshToken();
      }
      ajaxQueue.push(function () {
        requestAjax(recordUrl, url, callback, resolve, reject);
      });
    } /* else if(!options.login && !options.logout && times >= 600000){
            // 当超出时间后，则自动退出
            clearStorage();
            window.qyhdSelf.props.history.replace("/");
        } */ else {
      requestAjax(recordUrl, url, callback, resolve, reject);
    }
  }).catch((error) => {
    if (retryTimes < 0) {
      console.log(retryTimes);
      return new Promise(function (resolve, reject) {
        setTimeout(() => {
          resolve(downloadFile(url, callback, retryTimes + 1));
        }, 1000);
      });
    } else {
      // eslint-disable-next-line no-new
      new Error(error.statusText);
      return requestError(error);
    }
  });

  return promise;
}

// 创建ajax
function requestAjax(recordUrl, url, callback, resolve, reject) {
  let client = new XMLHttpRequest();
  client.onreadystatechange = handler;
  client.open('get', recordUrl);
  client.setRequestHeader(
    'Authorization',
    'Bearer ' + localStorage.getItem('tsvcloud_token'),
  );
  client.setRequestHeader('Accept', 'application/json');
  client.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
  client.send();

  function handler() {
    if (this.readyState !== 4) {
      console.log('接口错误');
      if (callback) callback();
      return;
    }
    if (this.status === 200) {
      let result = this.responseText;
      if (typeof result === 'string') {
        try {
          result = JSON.parse(result);
          console.log('下载解析错误');
          message.error(result.message);
        } catch (e) {
          const a = document.createElement('a');
          a.style.display = 'none';
          a.download = 'true';
          a.href = url.replace(',params', ',delete');
          a.click();
          // 如果有回调，则执行回调
          if (callback) callback();
        }
      }
      resolve(result);
    } else {
      reject(new Error(this.statusText));
    }
  }
}

// 处理请求错误
function requestError(ajaxObj) {
  let data = {
    statusCode: 500,
    message: '发送请求失败, 请稍后刷新页面重试！请联系开发人员！',
  };

  if (ajaxObj.status === 400) {
    data.statusCode = 400;
    data.message = '错误请求参数，如字段错误!';
  } else if (ajaxObj.status === 401) {
    data.statusCode = 401;
    if (!window.error401) {
      window.error401 = true;
      data.message = '您还没有登录!';
      message.error(data.message, 4);
      logout();
    }
  } else if (ajaxObj.status === 403) {
    data.statusCode = 403;
    if (!window.error403) {
      window.error403 = true;
      data.message = '登录已失效!';
      message.error(data.message, 4);
      logout();
    }
  } else if (ajaxObj.status === 404) {
    data.statusCode = 404;
    data.message = '请求地址不存在!';
  } else if (ajaxObj.status === 500) {
    data.statusCode = 500;
    data.message = '服务器内部发生错误!';
  } else if (
    ajaxObj.status === 0 &&
    ajaxObj.readyState === 4 &&
    ajaxObj.processData === false
  ) {
    // 上传错误提示
    data.message = '本地文件发生了改变，请重新上传！';
  } else if (
    ajaxObj.status === 0 &&
    ajaxObj.readyState === 4 &&
    ajaxObj.timeout === 0 &&
    ajaxObj.ontimeout === null &&
    ajaxObj.response === null
  ) {
    // 可能是服务器在重启
    data.message = '服务器可能在维护，请10分钟后，重新尝试！';
    message.error(data.message, 4);
    logout('weihu');
  } else {
    // 未知错误，作为统一的错误提示语
    console.warn('下面是错误的请求日志--------');
    console.error(ajaxObj);
  }
  return data;
}

// 退出登录
function logout(weihu) {
  const qyhdSelf = window.qyhdSelf;
  if (qyhdSelf) {
    qyhdSelf.props.dispatch({
      type: 'app/logout',
      payload: weihu,
      history: qyhdSelf.props.history,
    });
  } else {
    clearStorage();
    window.history.replace('/Maintain');
  }
}

// /uptiis2/baseAPI
// 刷新token，promise
function refreshToken() {
  let promise = new Promise(function (resolve, reject) {
    let client = new XMLHttpRequest();
    client.open('post', config.tomcatUrl + '/sysadmin/user/refreshToken');
    client.setRequestHeader('Accept', 'application/json');
    client.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    client.setRequestHeader(
      'Authorization',
      'Bearer ' + localStorage.getItem('tsvcloud_token'),
    );
    client.onreadystatechange = handler;
    client.responseType = 'json';
    client.send(JSON.stringify({}));

    function handler() {
      if (this.readyState !== 4) {
        return;
      }
      if (this.readyState === 4 && this.status === 200) {
        console.log(this.response);
        const data = this.response;
        if (data.statusCode === 200) {
          localStorage.setItem('tsvcloud_token', data.content);
          localStorage.setItem('tsvcloud_loginTime', new Date().getTime());
          ajaxQueue.forEach((item, index) => {
            item();
            if (ajaxQueue.length - 1 === index) {
              ajaxQueue = [];
            }
          });
          resolve(true);
        } else {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject(this);
        }
      } else {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject(this);
      }
    }
  }).catch((error) => {
    ajaxQueue = [];
    logout();
    message.error('登录时长续期失败！自动退出！');
  });

  return promise;
}

// 处理下载参数
export function download({
  url,
  conditions,
  orderConditions,
  paramsName,
  before,
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
    downloadFile(before(url, cond));
  } else {
    downloadFile(URL);
  }
}
