// idToken 中的信息并不重要，可以解析之后存储
import Cookie from "js-cookie";
import JWT from 'jwt-decode'

/**
 * 保存idToken的JWT解码后序列化的值
 * @param idToken
 */
export function setIdToken(idToken){
  let idTokenParsed = JWT(idToken);
  localStorage.setItem('idToken',JSON.stringify(idTokenParsed));
}

/**
 * 取出idToken，并JSON反序列化
 * @returns {*}
 */
export function getIdToken() {
  // 构造一个 默认值
  let idTokenDefault = {
    id: "", name: "", position: "", email: "", phone: "", officeUrl: "", officeName: "", officePhone: "", officeEmail: "", officeId: "", avatar: "", departmentId: "", departmentName: ""
  };
  let idToken = JSON.parse(localStorage.getItem('idToken'));
  return idToken === null ? idTokenDefault : idToken;
}

/**
 * 查看Cookie中是否有 isLogged 字段，以判断是否是登录状态
 * @returns {boolean}
 */
export function isLoggedCookie() {
  // 登录状态在 cookie 曲线救国
  console.log("isLoggedCookie: "+ Cookie.get('isLogged'));
  return Cookie.get('isLogged') !== undefined;
}

/**
 * 本地存储取值的封装，如果有则返回JSON解析后的值，没有就返回null
 * @param itemName
 * @returns {null|any} JSON解析后的值
 */
export function getItem(itemName) {
  let item = localStorage.getItem(itemName);
  if(item){
    return JSON.parse(item);
  }
  else{
    return null;
  }
}

/**
 * 本地存储设置值的封装，目的是节省序列化代码
 * @param itemName
 * @param dataObject 对象
 */
export function setItem(itemName,dataObject) {
  localStorage.setItem(itemName,JSON.stringify(dataObject));
}

/**
 * 本地存储的封装，目的是节省 localStorage 代码
 * @param itemName
 */
export function removeItem(itemName) {
  localStorage.removeItem(itemName);
}
