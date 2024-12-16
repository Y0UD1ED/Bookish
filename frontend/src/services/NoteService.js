import $api from "../api/api";

export default class NoteService{
    static async myNotes(type){
        return $api.get(`/notes/my?type=${type}`);
    }
    static async getNoteById(id){
        return $api.get(`/notes/${id}`);
    }
    static async getNoteModerationResponse(id){
        return $api.get(`/notes/${id}/moderation`);
    }
    static async updateNote(id,formData){
        return $api.put(`/notes/${id}`,formData);
    }
    static async createNote(formData){
        return $api.post('/notes/create',formData);
    }
}