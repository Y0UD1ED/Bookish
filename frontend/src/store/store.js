import { makeAutoObservable,toJS } from "mobx";
import AuthService from "../services/AuthService";
import UserService from "../services/UserService";
import ClassService from "../services/ClassService";
import BookService from "../services/BookService";
import NoteService from "../services/NoteService";
import ShelfService from "../services/ShelfService";
import axios from 'axios'
import { API_URL } from "../api/api";
import Cookies from 'universal-cookie';

export default class Store{
    user={};
    role=null;
    isAuth=false;
    isWaiting=false;
    isLoading=false;
    cookies = new Cookies();
    constructor() {
        makeAutoObservable(this);
    }

    setUser(user){
        this.user=user;
    }

    setRole(role){
        this.role=role;
    }

    setIsAuth(auth){
        this.isAuth=auth
    }
    setIsWaiting(waiting){
        this.isWaiting=waiting;
    }
    setIsLoading(loading){
        this.isLoading=loading;
    }

    async login(mail,password) {
        try {
            const response = await AuthService.login(mail,password);
            console.log(response)
            localStorage.setItem('access_token', response.data.accessToken);
            this.cookies.set('refreshToken', response.data.refreshToken, { path: '/' });
            console.log(localStorage.getItem('token'))
            this.setIsAuth(true)
            return this.isAuth;
        } catch (e) {
            console.log(e)
        }
    }

    async checkAuth() {
        try {
            this.setIsLoading(true)
            const response = await axios.get(`${API_URL}/auth/refresh`, { withCredentials: true });
            console.log(response);
            localStorage.setItem('token', response.data.accessToken);
            this.setIsAuth(true);
            await this.getMyData()
            
        } catch (e) {
            console.log(e);
        }
        finally{
            this.setIsLoading(false)
        }
    }

    async getMyData(){
        try{
            
            const res=await UserService.me()
            this.setRole(res.data.role)
            const {id,name,about,notificationCount}=res.data
            this.setUser({id,name,about,notificationCount})
            localStorage.setItem("user_id",this.user.id)
            console.log(res)
            if(this.role=="student"){
                const {myClasses,myImportantBooks,myPersonalBooks,myShelfs}=res.data;
                return {myClasses,myImportantBooks,myPersonalBooks,myShelfs}
            }
            else if(this.role=="teacher"){
                const {myClasses}=res.data;
                return {myClasses}
            }
            return;
        }catch(e){
            console.log(e)
        }
        
    }

    async getMyClasses() {
        try {
            const response = await ClassService.myClasses();
            console.log(response.data)
            return response.data
        } catch (e) {
            console.log(e)
        }
    }

    async getClassById(id) {
        try {
            const response = await ClassService.getClassById(id);
            console.log(response.data)
            return response.data
        } catch (e) {
            console.log(e)
        }
    }

    async getClassMembersById(id) {
        try {
            const response = await ClassService.getClassStudents(id);
            console.log(response.data)
            return response.data
        } catch (e) {
            console.log(e)
        }
    }

    async getClassProgress(id,type) {
        try {
            let res;
            switch(type){
                case "all": res=await ClassService.getClassProgressReadAll(id);
                break;
                case "nothing":res=await ClassService.getClassProgressReadNothing(id);
                break;
                case "avg":res=await ClassService.getClassProgressReadAvg(id);
                break;
                case "min":res =await ClassService.getClassProgressReadMin(id);
                break;
                case "max":res=await ClassService.getClassProgressReadMax(id);
                break;
                default: break;
            }
            return res.data
           
        } catch (e) {
            console.log(e)
        }
    }
    async getBookProgress(id,type,bookId) {
        try {
            let res;
            switch(type){
                case "have_read": res=await ClassService.getClassBookProgressHaveRead(id,bookId);
                break;
                case "is_reading":res=await ClassService.getClassBookProgressIsReading(id,bookId);
                break;
                case "want_to_read":res=await ClassService.getClassBookProgressWantToRead(id,bookId);
                break;
                default: break;
            }
            return res.data
           
        } catch (e) {
            console.log(e)
        }
    }

    async getClassBooks(id){
        try{
            const response=await ClassService.getClassBooks(id);
            return response.data
        } catch (e) {
            console.log(e)
        }
    }

    async getMyShelfs() {
        try {
            const response = await ShelfService.myShelfs();
            console.log(response.data)
            return response.data
        } catch (e) {
            console.log(e)
        }
    }
    async getSheflById(id) {
        try {
            const response = await ShelfService.getShelfById(id);
            console.log(response.data)
            return response.data
        } catch (e) {
            console.log(e)
        }
    }

    async getMyBooks() {
        try {
            const response = await BookService.myBooks();
            console.log(response.data)
            return response.data
        } catch (e) {
            console.log(e)
        }
    }

    async getMyNotes() {
        try {
            const response = await NoteService.myNotes();
            console.log(response.data)
            return response.data
        } catch (e) {
            console.log(e)
        }
    }
    async getNoteById(id) {
        try {
            const response = await NoteService.getNoteById(id);
            console.log(response.data)
            return response.data
        } catch (e) {
            console.log(e)
        }
    }
}
