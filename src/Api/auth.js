import { httpService } from "./httpService";

const middelPoint = "auth/";

const isToken = () => {
    return httpService.get(`${middelPoint}istoken/`);
}

const isAdmin = () => {
    return httpService.get(`${middelPoint}isadmin/`);
}

const login = (_email, _password) => {
    return httpService.post(`${middelPoint}login/`,{email:_email,password:_password});
}
const register = (_email, _full_name, _password, _confirm) => {
    return httpService.post(`${middelPoint}register/`,{email:_email, full_name:_full_name ,password:_password,confirmPassword:_confirm});
}

export{isToken,isAdmin,login,register}