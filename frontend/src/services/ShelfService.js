import $api from "../api/api";

export default class ShelfService{
    static async myShelfs(){
        return $api.get('/shelfs/my');
    }
    static async getShelfById(id){
        return $api.get(`/shelfs/${id}`);
    }
    static async updateShelf(id,name,description){
        return $api.put(`/shelfs/${id}`,{name,description});
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
    static async createShelf(name,description,image,isHidden,books){
        return $api.post(`/shelfs/create`,{name,description,image,isHidden,books});
    }
}