// idToken 中的信息并不重要，可以解析之后存储
import Cookie from "js-cookie";
import JWT from 'jwt-decode'

export function setIdToken(idToken){
  let idTokenParsed = JWT(idToken);
  localStorage.setItem('idToken',JSON.stringify(idTokenParsed));
}

export function getIdToken() {
  return JSON.parse(localStorage.gettem('idToken'));
}

export function isLogged() {
  // 登录状态在 cookie 曲线救国
  return Cookie.get('isLogged') !== undefined;
}
