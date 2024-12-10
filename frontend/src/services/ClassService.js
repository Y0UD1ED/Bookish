import $api from "../api/api";

export default class ClassService{
    static async myClasses(){
        return $api.get('/classes/my');
    }
    static async getClassById(id){
        return $api.get(`/classes/${id}`);
    }
    static async getClassProgressReadAll(id){
        return $api.get(`/classes/${id}/progress/read_all`);
    }
    static async getClassProgressReadNothing(id){
        return $api.get(`/classes/${id}/progress/read_nothing`);
    }
    static async getClassProgressReadMax(id){
        return $api.get(`/classes/${id}/progress/read_max`);
    }
    static async getClassProgressReadMin(id){
        return $api.get(`/classes/${id}/progress/read_min`);
    }
    static async getClassProgressReadAvg(id){
        return $api.get(`/classes/${id}/progress/read_avg`);
    }
    static async getClassStudents(id){
        return $api.get(`/classes/${id}/students`);
    }
    static async getClassBooks(id){
        return $api.get(`/classes/${id}/books`);
    }
    static async getClassBookProgressHaveRead(id,bookId){
        return $api.get(`/classes/${id}/books/${bookId}/progress/have_read`);
    }
    static async getClassBookProgressIsReading(id,bookId){
        return $api.get(`/classes/${id}/books/${bookId}/progress/is_reading`);
    }
    static async getClassBookProgressWantToRead(id,bookId){
        return $api.get(`/classes/${id}/books/${bookId}/progress/want_read`);
    }
    static async loginClass(code){
        return $api.post('/classes/login',code);
    }
}