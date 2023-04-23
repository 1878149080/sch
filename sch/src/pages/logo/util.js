// import {message} from "antd";

/**
 * @author 获取用户名/密码/验证码
 * */
export function getFormValue(captcha) {
  let name = document.getElementById('userName').value;
  let pwd = document.getElementById('userPwd').value;
  let code = document.getElementById('code').value;
  return {
    name,
    pwd,
    code,
  };
}

/**
 * @author 校验用户名/密码，是否为空；验证码校验是否通过
 * */
export function getIsValue(prams) {
  const { name = '', pwd = '', code = '' } = getFormValue();
  const { restButtonState, captchaText } = prams;
  let isLogo = true;
  // 判断账户
  if (!name) {
    restButtonState('用户名未填写！');
    isLogo = false;
  }
  // 判断密码
  if (!pwd) {
    restButtonState('密码未填写！');
    isLogo = false;
  }
  // 校验验证码是否通过
  if (code.length < 4 || captchaText !== code) {
    restButtonState('验证码错误！');
    isLogo = false;
  }
  return {
    isLogo,
    name,
    pwd,
  };
}
