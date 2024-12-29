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
import { th } from "date-fns/locale";

export default class Store{
    user={};
    role=null;
    isAuth=false;
    isWaiting=false;
    isLoading=false;
    isError=false;
    errorMessage;
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
    setIsError(error){
        this.isError=error;
    }
    
    setErrorMessage(error){
        this.errorMessage=error;
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
            this.setIsError(true)
            this.setErrorMessage(e.response ? e.response.data.message : e.message)
            console.log(e.response.data.message)
        }
    }

    async logout() {
        try {
            const response = await AuthService.logout();
            localStorage.removeItem('access_token');
            this.cookies.remove('refreshToken');
            this.setIsAuth(false)
        } catch (e) {
            this.setIsError(true)
            this.setErrorMessage(e.response ? e.response.data.message : e.message)
            console.log(e.response.data.message)
        }
    }

    // async checkAuth() {
    //     try {
    //         this.setIsLoading(true)
    //         const response = await axios.get(`${API_URL}/auth/refresh`, { withCredentials: true });
    //         console.log(response);
    //         localStorage.setItem('token', response.data.accessToken);
    //         this.setIsAuth(true);
    //         await this.getMyData()
            
    //     } catch (e) {
    //          
    //     }
    //     finally{
    //         this.setIsLoading(false)
    //     }
    // }


    async getMyDataForUpdate() {
        try {
            const response = await UserService.infoUpdateMe();
            console.log(response.data)
            return response.data
        } catch (e) {
            this.setIsError(true)
            this.setErrorMessage(e.response ? e.response.data.message : e.message)
            console.log(e.response.data.message)
        }
    }

    async updateMe(firstName,lastName,midleName,about,mail,currentPassword,newPasswrd,image,file) {
        try {
            const formData=new FormData()
            if(file!=null){
                image=""
            }
            const jsonData=JSON.stringify({"firstName":firstName,
                "lastName":lastName,
                "middleName":midleName,
                "about":about,
                "mail":mail,
                "password":currentPassword,
                "passwordNew":newPasswrd,
                "image":image})
            formData.append("image",file)
            formData.append("user",new Blob([
                jsonData
            ], {
                type: "application/json"
            }))
            const response = await UserService.updateMe(formData)
            console.log(response.data)
            return response.data
        } catch (e) {
            this.setIsError(true)
            this.setErrorMessage(e.response ? e.response.data.message : e.message)
            console.log(e.response.data.message)
        }
    }


    async getMyData(){
        try{
            const res=await UserService.me()
            this.setRole(res.data.role)
            localStorage.setItem("role",res.data.role)
            const {id,name,image,about,notificationCount}=res.data
            this.setUser({id,name,image,about,notificationCount})
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
            this.setIsError(true)
            this.setErrorMessage(e.response ? e.response.data.message : e.message)
            console.log(e.response.data.message)
        }
        
    }

    async getMyClasses() {
        try {
            const response = await ClassService.myClasses();
            console.log(response.data)
            return response.data
        } catch (e) {
            this.setIsError(true)
            this.setErrorMessage(e.response ? e.response.data.message : e.message)
            console.log(e.response.data.message)
        }
    }

    async getClassById(id) {
        try {
            const response = await ClassService.getClassById(id);
            console.log(response.data)
            return response.data
        } catch (e) {
            this.setIsError(true)
            this.setErrorMessage(e.response ? e.response.data.message : e.message)
            console.log(e.response.data.message)
        }
    }

    async logInClass(code) {
        try {
            const formData=new FormData()
            formData.append("code",code)
            console.log(code)
            const response = await ClassService.loginClass(formData);
            console.log(response.data)
            return response.data
        } catch (e) {
            this.setIsError(true)
            this.setErrorMessage(e.response ? e.response.data.message : e.message)
            console.log(e.response.data.message)
        }
    }

    async parseBooks(file) {
        try {
            const formData=new FormData()
            formData.append("file",file)
            const response = await BookService.parseBooks(formData)
            console.log(response.data)
            return response.data
        } catch (e) {
            this.setIsError(true)
            this.setErrorMessage(e.response ? e.response.data.message : e.message)
            console.log(e.response.data.message)
        }
    }

    async createClass(name,image,file) {
        try {
            const formData=new FormData()
            if(file!=null){
                image=""
            }
            const jsonData=JSON.stringify({"name":name,
                "image":image})
            formData.append("image",file)
            formData.append("newClass",new Blob([
                jsonData
            ], {
                type: "application/json"
            }))
            const response = await ClassService.createClass(formData)
            console.log(response.data)
            return response.data
        } catch (e) {
            console.log(e)
            this.setIsError(true)
            this.setErrorMessage(e.response ? e.response.data.message : e.message)
            console.log(e.response.data.message)
        }
    }

    async updateClass(id,name,image,file) {
        try {
            const formData=new FormData()
            if(file!=null){
                image=""
            }
            const jsonData=JSON.stringify({"name":name,
                "image":image})
            formData.append("image",file)
            formData.append("newClass",new Blob([
                jsonData
            ], {
                type: "application/json"
            }))
            const response = await ClassService.updateClass(id,formData)
            console.log(response.data)
            return response.data
        } catch (e) {
            console.log(e)
            this.setIsError(true)
            this.setErrorMessage(e.response ? e.response.data.message : e.message)
            console.log(e.response.data.message)
        }
    }

    async addBooksInClass(classId,books) {
        try {
            const response = await ClassService.addBooksInClass(classId,books)
            console.log(response.data)
            return response.data
        } catch (e) {
            this.setIsError(true)
            this.setErrorMessage(e.response ? e.response.data.message : e.message)
            console.log(e.response.data.message)
        }
    }

    async getClassMembersById(id) {
        try {
            const response = await ClassService.getClassStudents(id);
            console.log(response.data)
            return response.data
        } catch (e) {
            this.setIsError(true)
            this.setErrorMessage(e.response ? e.response.data.message : e.message)
            console.log(e.response.data.message)
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
            this.setIsError(true)
            this.setErrorMessage(e.response ? e.response.data.message : e.message)
            console.log(e.response.data.message)
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
            this.setIsError(true)
            this.setErrorMessage(e.response ? e.response.data.message : e.message)
            console.log(e.response.data.message)
        }
    }

    async getClassBooks(id){
        try{
            const response=await ClassService.getClassBooks(id);
            return response.data
        } catch (e) {
            this.setIsError(true)
            this.setErrorMessage(e.response ? e.response.data.message : e.message)
            console.log(e.response.data.message)
        }
    }

    async getMyShelfs() {
        try {
            const response = await ShelfService.myShelfs();
            console.log(response.data)
            return response.data
        } catch (e) {
            this.setIsError(true)
            this.setErrorMessage(e.response ? e.response.data.message : e.message)
            console.log(e.response.data.message)
        }
    }

    async getStudentShelfs(id) {
        try {
            const response = await ShelfService.studentShelfs(id);
            console.log(response.data)
            return response.data
        } catch (e) {
            this.setIsError(true)
            this.setErrorMessage(e.response ? e.response.data.message : e.message)
            console.log(e.response.data.message)
        }
    }

    async getSheflById(id) {
        try {
            const response = await ShelfService.getShelfById(id);
            console.log(response.data)
            return response.data
        } catch (e) {
            this.setIsError(true)
            this.setErrorMessage(e.response ? e.response.data.message : e.message)
            console.log(e.response.data.message)
        }
    }


    async getMyNotes(type) {
        try {
            const response = await NoteService.myNotes(type);
            console.log(response.data)
            return response.data
        } catch (e) {
            this.setIsError(true)
            this.setErrorMessage(e.response ? e.response.data.message : e.message)
            console.log(e.response.data.message)
        }
    }

    async getStudentNotes(id,type) {
        try {
            const response = await NoteService.studentNotes(id,type);
            console.log(response.data)
            return response.data
        } catch (e) {
            this.setIsError(true)
            this.setErrorMessage(e.response ? e.response.data.message : e.message)
            console.log(e.response.data.message)
        }
    }

    async getExcludedNotesInShelf(id) {
        try {
            const response = await ShelfService.getExcludedNotesInShelf(id);
            console.log(response.data)
            return response.data
        } catch (e) {
            this.setIsError(true)
            this.setErrorMessage(e.response ? e.response.data.message : e.message)
            console.log(e.response.data.message)
        }
    }

    async getNoteById(id) {
        try {
            const response = await NoteService.getNoteById(id);
            console.log(response.data)
            return response.data
        } catch (e) {
            this.setIsError(true)
            this.setErrorMessage(e.response ? e.response.data.message : e.message)
            console.log(e.response.data.message)
        }
    }

    async createNote(name,author,isHidden,image,file) {
        try {
            const formData=new FormData()
            if(file!=null){
                image=""
            }
            const jsonData=JSON.stringify({"name":name,
                "author":author,
                "isHidden":isHidden,
                "image":image})
            formData.append("image",file)
            formData.append("note",new Blob([
                jsonData
            ], {
                type: "application/json"
            }))
            const response = await NoteService.createNote(formData)
            console.log(response.data)
            return response.data
        } catch (e) {
            console.log(e)
            this.setIsError(true)
            this.setErrorMessage(e.response ? e.response.data.message : e.message)
            console.log(e.response.data.message)
        }
    }


    async updateNote(id,name,author,readingStatus,genre,startDate,endDate,heroes,plot,bookMessage,opinion,image,file) {
        try {
            const formData=new FormData()
            if(file!=null){
                image=""
            }
            if(startDate=="-"){
                startDate=null
            }
            if(endDate=="-"){
                endDate=null
            }
            const jsonData=JSON.stringify({"name":name,
                "author":author,
                "readingStatus":readingStatus,
                "genre":genre,
                "startDate":startDate,
                "endDate":endDate,
                "isHidden":false,
                "heroes":heroes,
                "plot":plot,
                "message":bookMessage,
                "opinion":opinion,
                "image":image})
            formData.append("image",file)
            formData.append("note",new Blob([
                jsonData
            ], {
                type: "application/json"
            }))
            const response = await NoteService.updateNote(id,formData)
            console.log(response.data)
            return response.data
        } catch (e) {
            this.setIsError(true)
            this.setErrorMessage(e.response ? e.response.data.message : e.message)
            console.log(this.errorMessage)
        }
    }

    async deleteShelfById(id) {
        try {
            const response = await ShelfService.deleteShelf(id);
            return
        } catch (e) {
            this.setIsError(true)
            this.setErrorMessage(e.response ? e.response.data.message : e.message)
            console.log(e.response.data.message)
        }
    }

    async deleteClassById(id) {
        try {
            const response = await ClassService.deleteClass(id);
            return
        } catch (e) {
            this.setIsError(true)
            this.setErrorMessage(e.response ? e.response.data.message : e.message)
            console.log(e.response.data.message)
        }
    }

    async logoutClassById(id) {
        try {
            const response = await ClassService.logoutClass(id);
            return
        } catch (e) {
            this.setIsError(true)
            this.setErrorMessage(e.response ? e.response.data.message : e.message)
            console.log(e.response.data.message)
        }
    }


    async createShelf(name,description,isHidden,image,file,books) {
        try {
            const formData=new FormData()
            if(file!=null){
                image=""
            }
            const jsonData=JSON.stringify({"name":name,
                "description":description,
                "isHidden":isHidden,
                "image":image,
                "books":books})
            console.log(books)
            formData.append("image",file)
            formData.append("shelf",new Blob([
                jsonData
            ], {
                type: "application/json"
            }))
            const response = await ShelfService.createShelf(formData)
            console.log(response.data)
            return response.data
        } catch (e) {
            this.setIsError(true)
            this.setErrorMessage(e.response ? e.response.data.message : e.message)
            console.log(e.response.data.message)
        }
    }

    async updateShelf(id,name,description,isHidden,image,file) {
        try {
            const formData=new FormData()
            if(file!=null){
                image=""
            }
            const jsonData=JSON.stringify({"name":name,
                "description":description,
                "hidden":isHidden,
                "image":image,
                })
            formData.append("image",file)
            formData.append("shelf",new Blob([
                jsonData
            ], {
                type: "application/json"
            }))
            const response = await ShelfService.updateShelf(id,formData)
            console.log(response.data)
            return response.data
        } catch (e) {
            this.setIsError(true)
            this.setErrorMessage(e.response ? e.response.data.message : e.message)
            console.log(e.response.data.message)
        }
    }



    async addBooksInShelf(id,books) {
        try {
            await ShelfService.addNotesInShelf(id,books);
            return 
        } catch (e) {
            this.setIsError(true)
            this.setErrorMessage(e.response ? e.response.data.message : e.message)
            console.log(e.response.data.message)
        }
    }

    async getStudentById(id) {
        try {
            const response = await UserService.getStudentById(id);
            console.log(response.data)
            return response.data
        } catch (e) {
            this.setIsError(true)
            this.setErrorMessage(e.response ? e.response.data.message : e.message)
            console.log(e.response.data.message)
        }
    }
}
