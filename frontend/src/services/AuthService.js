import $api from "../api/api";

export default class AuthService{
    static async login(mail,password){
        return $api.post('/auth/login',{mail,password});
    }
    static async reg(firstName,lastName,mail,role,password,passwordRepeat){
        return $api.post('/auth/reg',{firstName,lastName,mail,role,password,passwordRepeat});
    }
    static async logout(){
        return $api.post('/auth/logout');
    }
}