import $api from "../api/api";

export default class BookService{
    static async myBooks(){
        return $api.get('/books/my');
    }
}