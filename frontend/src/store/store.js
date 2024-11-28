import { makeAutoObservable } from "mobx";

export default class Store{
    user={};
    isAuth=false;
    isWaiting=false;

    constructor() {
        makeAutoObservable(this);
    }

    setUser(user){
        this.user=user;
    }

    setIsAuth(auth){
        this.isAuth=auth
    }
    setIsWaiting(waiting){
        this.isWaiting=waiting;
    }

    async login(email,password) {
        try {
            const response = await AuthService.login(email, password);
            console.log(response)
           // localStorage.setItem('token', response.data.accessToken);
        } catch (e) {
            console.log(e)
        }
    }
}
