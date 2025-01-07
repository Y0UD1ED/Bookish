import $api from "../api/api";

export default class UserService{
    static async me(){
        return $api.get('/users/me');
    }

    static async infoUpdateMe(){
        return $api.get('/users/me/update');
    }

    static async updateMe(formData){
        return $api.put('/users/me/update',formData);
    }

    static async getStudentById(id){
        return $api.get(`/users/${id}`,id);
    }
}