import { Link, Navigate, useNavigate } from "react-router-dom";
import FuncButton from "../../components/buttons/FuncButton";
import './styles.css'
import { PATHS } from "../../router";
import { useContext, useState } from "react";
import { Context } from "../..";
import Loading from "../../components/Loading";

const Auth=()=>{
    const [mail,setMail]=useState("")
    const [password,setPassword]=useState("")
    const [wait,setWait]=useState(false)
    const navgate=useNavigate()
    const {store}=useContext(Context)
    
    const login=async()=>{
        try{
            setWait(true)
            const datas=await store.login(mail,password)
            if(datas==true){
                navgate(PATHS.PERSONAL_ACCOUNT)
            }
        }catch(e){
            console.log(e)
        }finally{
            setWait(false)
        }
    }

    if(wait){
        return <Loading/>
    }

    return(
        <div className="backLayout">
            <div className="authContainer">
                <div className="logo">
                <img src="WhiteLogo.svg" alt="" />
                </div>
                <div className="auth_form">
                    <div className="title">Вход</div>
                    <input 
                        type="text" 
                        className="mail" 
                        placeholder="Почта"
                        value={mail}
                        onChange={(e)=>setMail(e.target.value)} />
                    <input 
                        type="password" 
                        className="password" 
                        placeholder="Пароль"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}/>
                    <div className='errors' style={{display:store.isError===false?'none':'block'}}>{store.errorMessage}</div>
                    <FuncButton onClickFunc={()=>login()} btnText={"Войти"}/>
                    <Link to={PATHS.PASSWORD_RECOVERY} className="forget_pass">Забыли пароль? </Link>
                </div>
               
            </div>
           
        </div>
    )
}

export default Auth;