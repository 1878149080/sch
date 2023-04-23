import { message } from "antd";
import config from "./config";
// import { getIsIe } from "./index";
import { clearStorage } from "./localStorage";
// import { getLoginPage } from "./logo/util";
// import history from './history';
// const Ajax = require("robe-ajax")
// import { URLType, RequestOptionsType} from './interfaces'
// import { history } from "umi";
import { useNavigate } from 'react-router-dom';



/**
 * 数组队列 - 主要用于当需要刷新token的时候，阻塞ajax，等新的请求到达后，则执行队列列面的ajax方法
 */
let ajaxQueue = [];

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url: URLType      The URL we want to request
 * @param  {object} options: RequestOptionsType   The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export function request(url, options) {
  // const navigate = useNavigate();
  const loginTime = Number(localStorage.getItem('school_loginTime'));
  const newTIme = new Date().getTime();
  const times = newTIme - loginTime;

  let promise = new Promise(function (resolve, reject) {
    // if (!options.login && !options.logout && times >= 86386405) {
    //   // 1 是否超过1天，超过则自动退出登录
    //   logout();
    // } else if (
    //   !options.login &&
    //   !options.logout &&
    //   times < 86386405 &&
    //   times >= 14393014
    // ) {
    //   // 2 是否未超过1天，并且已超过4小时，需要刷新token，之后再去刷新菜单
    //   if (ajaxQueue.length === 0) {
    //     refreshToken();
    //   }
    //   ajaxQueue.push(function () {
    //     requestAjax(url, options, resolve, reject);
    //   });
    // } else {
    //   requestAjax(url, options, resolve, reject);
    // }
    requestAjax(url, options, resolve, reject);

  }).catch((error) => {
    // eslint-disable-next-line no-new
    new Error(error.statusText);
    return requestError(error);
  });

  return promise;
}

// 创建ajax
function requestAjax(url, options, resolve, reject, errEach = -1) {
  let client = new XMLHttpRequest();
  client.open(options.methods || 'post', url);
  // 请求超时，单位毫秒，默认为1小时
  client.timeout = 3600000;
  // 超时处理
  client.ontimeout = function () {
    let eachNum = errEach;
    if (errEach === 0) eachNum = 3;
    if (eachNum >= 0) {
      requestAjax(url, options, resolve, reject, eachNum - 1);
    } else if (!window.logoutNum) {
      console.log('进入维护页！');
      window.logoutNum = true;
      logout();
    }
  };
  client.onreadystatechange = handler;

  if (!options.login && !options.token) {
    client.setRequestHeader(
      'token',
      localStorage.getItem('school_token'),
    );
  }

  if(options.methods === "get"){
    client.send();
  }else if (options.upData) {
    // client.setRequestHeader("Content-Type", 'application/json; charset=UTF-8')
    client.processData = false; // todo 不知道作用
    client.send(options.data);
  } else {
    client.responseType = 'json';
    client.setRequestHeader('Accept', 'application/json');
    client.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    client.send(JSON.stringify(options.data || {}));
  }

  function handler() {
    if (this.readyState !== 4) {
      return;
    }
    if (this.readyState === 4 && this.status === 200) {
      let result = this.response;
      if(typeof result === 'string') {
        JSON.parse(result);
      }
      // if (getIsIe() && typeof result === 'string') {
      //   result = JSON.parse(result);
      // } else if (!this.processData && typeof result === 'string') {
      //   result = JSON.parse(result);
      // }

      // 如果后端有返回错误信息，就在这里统一展示错误提示
      result?.statusCode !== 200 &&
        result?.message &&
        message.error(result?.message);

      resolve(result);
    } else {
      reject(this);
      // reject(new Error(this));
    }
  }
}

// 处理请求错误
function requestError(ajaxObj) {
  let data = {
    statusCode: 600,
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
    data.message = '您没有权限访问!';
  } else if (ajaxObj.status === 422) {
    data.statusCode = 422;
    if (!window.error422) {
      window.error422 = true;
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
    // data.message = '服务器可能在维护，请10分钟后，重新尝试！';
    // message.error(data.message, 4);
    logout(navigate);
  } else {
    // 未知错误，作为统一的错误提示语
    console.warn('下面是错误的请求日志--------');
    console.error(ajaxObj);
  }
  return data;
}

// 退出登录
function logout() {
  clearStorage();
  // navigate('/');
  // if (weihu) {
  // } else {
  //   // getLoginPage();
  //   // history.replace('/');
  // }
}

// 刷新token，promise
function refreshToken() {
  let promise = new Promise(function (resolve, reject) {
    let client = new XMLHttpRequest();
    client.open('post', config.tomcatUrl + '/sysadmin/token/refreshToken');
    client.setRequestHeader('Accept', 'application/json');
    client.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    client.setRequestHeader(
      'Authorization',
      'Bearer ' + localStorage.getItem('school_token'),
    );
    client.onreadystatechange = handler;
    client.responseType = 'json';
    client.send(JSON.stringify({}));

    function handler() {
      if (this.readyState !== 4) {
        return;
      }
      if (this.readyState === 4 && this.status === 200) {
        const data = this.response;
        if (data.statusCode === 200) {
          localStorage.setItem('school_token', data.content);
          localStorage.setItem('school_loginTime', new Date().getTime());
          window.__TOKEN = data.content;
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
  })
    .then((res, rej) => {
      if (rej) {
        ajaxQueue = [];
        logout();
      }
    })
    .catch((error) => {
      ajaxQueue = [];
      logout();
      // message.error("登录时长续期失败！自动退出！");
    });

  return promise;
}
