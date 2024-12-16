import $api from "../api/api";

export default class ShelfService{
    static async myShelfs(){
        return $api.get('/shelfs/my');
    }
    static async getShelfById(id){
        return $api.get(`/shelfs/${id}`);
    }
    static async updateShelf(id,formData){
        return $api.put(`/shelfs/${id}`,formData);
    }
    static async deleteShelf(id){
        return $api.delete(`/shelfs/${id}`);
    }
    static async getExcludedNotesInShelf(id){
        return $api.get(`/shelfs/${id}/notes/excluded`);
    }
    static async addNotesInShelf(id,notes){
        return $api.put(`/shelfs/${id}/notes`,notes);
    }
    static async deleteNotesInShelf(id){
        return $api.delete(`/shelfs/${id}/notes`);
    }
    static async createShelf(formData){
        return $api.post(`/shelfs/create`,formData);
    }
}