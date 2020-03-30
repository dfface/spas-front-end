// idToken 中的信息并不重要，可以解析之后存储
import Cookie from "js-cookie";
import JWT from 'jwt-decode'

export function setIdToken(idToken){
  let idTokenParsed = JWT(idToken);
  localStorage.setItem('idToken',JSON.stringify(idTokenParsed));
}

export function getIdToken() {
  // 构造一个 默认值
  let idTokenDefault = {
    id: "", name: "", position: "", email: "", phone: "", officeUrl: "", officeName: "", officePhone: "", officeEmail: "", officeId: "", avatar: "", departmentId: "", departmentName: ""
  };
  let idToken = JSON.parse(localStorage.getItem('idToken'));
  return idToken === null ? idTokenDefault : idToken;
}

export function isLoggedCookie() {
  // 登录状态在 cookie 曲线救国
  console.log("isLoggedCookie: "+ Cookie.get('isLogged'));
  return Cookie.get('isLogged') !== undefined;
}
