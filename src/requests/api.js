/**
 * 历史遗留，不算好的封装，新的封装采用了模块化的思想
 * 在这里把模块中的 API 挂上去
 */
import {get,post} from './http'
import axiosInstance from './http'
import home from "./modules/home";
import cases from "./modules/cases";
import suggestion from './modules/suggestion';
import office from "./modules/office";
import role from "./modules/role";
import report from "./modules/report";

// 历史遗留
export const apiIsLogged = () => get('/isLogged');
export const apiLogin = (officeId, email, password) => post('/login',{officeId: officeId, email: email, password: password});
export const apiInit = () => get('/init');

// 新的模块化方式
axiosInstance['home'] = home;
axiosInstance['cases'] = cases;
axiosInstance['suggestion'] = suggestion;
axiosInstance['office'] = office;
axiosInstance['role'] = role;
axiosInstance['report'] = report;

export default axiosInstance;

