/**
 * 历史遗留，不算好的封装，新的封装采用了模块化的思想
 * 在这里把模块中的 API 挂上去
 */
import {get,post} from './http'
import axiosInstance from './http'
import home from "./modules/home";

export const apiIsLogged = () => get('/isLogged');
export const apiLogin = (email, password) => post('/login',{"email": email, "password": password});
export const apiInit = () => get('/init');

axiosInstance['home'] = home;

export default axiosInstance;

