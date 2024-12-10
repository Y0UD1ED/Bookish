import $api from "../api/api";

export default class UserService{
    static async me(){
        return $api.get('/users/me');
    }

    static async infoUpdateMe(){
        return $api.get('/users/me/update');
    }

    static async updateMe(firstName,lastName,middleName,about,mail,password,passwordNew){
        return $api.put('/users/me/update',{firstName,lastName,middleName,about,mail,password,passwordNew});
    }
}