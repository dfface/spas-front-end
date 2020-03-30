import {get,post} from './http'
export const apiIsLogged = () => get('/isLogged');
export const apiLogin = (email, password) => post('/login',{"email": email, "password": password});
