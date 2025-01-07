import $api from "../api/api";

export default class BookService{
    static async myBooks(){
        return $api.get('/books/my');
    }
    static async parseBooks(formData){
        return $api.post('/books/list/parse',formData);
    }
}