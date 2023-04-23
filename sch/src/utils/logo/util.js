import { autoLogin } from './reqLogoin';

// 生产环境 ip
export const PRD_IP = '172.21.10.1';
// 生产环境 port
const PRD_IP_PORT = '15380';
// 生产环境 域名
const PRD_DOMAIN = 'sangfor.013f429e37a996b272727ce2c8aeed15.com';

// 测试环境 ip
const STG_IP = '210.74.1.28';
// 生产环境 port
const STG_PORT = '15380';
// 测试环境 域名
const STG_DOMAIN = 'data.tsingvast.com';
// 测试环境 域名的端口
const STG_DOMAIN_PORT = '15380';

// 开发环境
const DEV_IP = 'localhost';
const DEV_IP_PORT = '8000';

// http
const HTTP = 'http://';
// https
const HTTPs = 'https://';

/**
 * @desc 测试环境 + 本地开发
 * */

export function getUrl() {
  const hostname = window.location.hostname;

  if (hostname.indexOf(PRD_IP) > -1 || hostname.indexOf(PRD_DOMAIN) > -1) {
    // 生产环境
    return getPRDUrl(hostname);
  } else if (
    hostname.indexOf(STG_IP) > -1 ||
    hostname.indexOf(STG_DOMAIN) > -1
  ) {
    // 测试环境
    return getSTGUrl(hostname);
  } else if (hostname.indexOf(DEV_IP) > -1) {
    // 开发环境
    return getDEVUrl(hostname);
  }
}

// 生产环境
function getPRDUrl(hostname) {
  if (hostname.indexOf(PRD_IP) > -1) {
    // ip访问
    return HTTP + PRD_IP + ':' + PRD_IP_PORT;
  } else if (hostname.indexOf(PRD_DOMAIN) > -1) {
    // 域名访问
    return HTTP + PRD_DOMAIN;
  }
}

// 测试环境
function getSTGUrl(hostname) {
  if (hostname.indexOf(STG_IP) > -1) {
    // ip访问
    return HTTP + STG_IP + ':' + STG_PORT;
  } else if (hostname.indexOf(STG_DOMAIN) > -1) {
    // 域名访问
    return HTTP + STG_DOMAIN + ':' + STG_DOMAIN_PORT;
  }
}

// 开发环境
function getDEVUrl(hostname) {
  if (hostname.indexOf(DEV_IP) > -1) {
    // ip访问
    return HTTP + DEV_IP + ':' + DEV_IP_PORT;
  } else {
    alert('开发环境的登录遇到了问题!');
    return HTTP + DEV_IP + ':' + DEV_IP_PORT;
  }
}

/********* 登录配置处理  ***********/
export function getLoginPage() {
  const local = getUrl();
  if (local && local.indexOf(DEV_IP) > -1) {
    autoLogin();
  } else {
    // history.replace("/Logo")
    window.location.href = local + '/tsvcloud/#/Logo';
  }
}
