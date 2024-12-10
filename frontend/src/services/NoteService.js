import $api from "../api/api";

export default class NoteService{
    static async myNotes(){
        return $api.get('/notes/my');
    }
    static async getNoteById(id){
        return $api.get(`/notes/${id}`);
    }
    static async getNoteModerationResponse(id){
        return $api.get(`/notes/${id}/moderation`);
    }
    static async updateNote(id,name,author,image,readingStatus,genre,startDate,endDate,heroes,plot,message,opinion,isHidden){
        return $api.put(`/notes/${id}/`,{name,author,image,readingStatus,genre,startDate,endDate,heroes,plot,message,opinion,isHidden});
    }
    static async createNote(name,author,isHidden,image){
        return $api.post('/notes/create',{name,author,isHidden,image});
    }
}