/**
 * 历史遗留，不算好的封装，新的封装采用了模块化的思想
 * 在这里把模块中的 API 挂上去
 */
import {get,post} from './http'
import axiosInstance from './http'
import cases from "./modules/cases";
import home from "./modules/home";
import office from "./modules/office";
import report from "./modules/report";
import suggestion from './modules/suggestion';
import user from "./modules/user";

// 历史遗留
export const apiIsLogged = () => get('/isLogged');
export const apiLogin = (officeId, email, password) => post('/login',{officeId: officeId, email: email, password: password});
export const apiInit = () => get('/init');

// 新的模块化方式
axiosInstance['home'] = home;
axiosInstance['cases'] = cases;
axiosInstance['suggestion'] = suggestion;
axiosInstance['office'] = office;
axiosInstance['report'] = report;
axiosInstance['user'] = user;

export default axiosInstance;

