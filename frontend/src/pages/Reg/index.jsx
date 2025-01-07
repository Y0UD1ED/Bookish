import { useContext, useState } from "react";
import './styles.css'
import FuncButton from "../../components/buttons/FuncButton";
import { Context } from "../..";
import Loading from "../../components/Loading";
import { PATHS } from "../../router";
import { useNavigate } from "react-router-dom";

const Reg=()=>{

    const [firstName,setFirstName]=useState("")
    const [lastName,setLastName]=useState("")
    const [mail,setMail]=useState("")
    const [role,setRole]=useState("student")
    const [password,setPassword]=useState("")
    const [passwordRepeat,setPasswordRepeat]=useState("")
    const [wait,setWait]=useState(false)

    const navigate=useNavigate()

    const {store}=useContext(Context)

     const registartion=async()=>{
            try{
                store.setIsError(false)
                setWait(true)
                const datas=await store.registration(firstName,lastName,mail,role,password,passwordRepeat)
                if(!store.isError){
                    navigate(PATHS.AUTH)
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
            <div className="regContainer">
                <div className="logo">
                <img src="WhiteLogo.svg" alt="" />
                </div>
                <div className="reg_form">
                    <div className="regtitle">Создание аккаунта</div>
                    <input 
                        type="text"
                        className="last_name"
                        value={lastName}
                        onChange={(e)=>setLastName(e.target.value)} 
                        placeholder="Фамилия" />
                    <input
                        type="text" 
                        className="first_name"
                        value={firstName}
                        onChange={(e)=>setFirstName(e.target.value)} 
                        placeholder="Имя"/>
                    <input 
                        type="text" 
                        className="mail"
                        value={mail}
                        onChange={(e)=>setMail(e.target.value)}  
                        placeholder="Почта" />
                    <input 
                        type="password"
                        className="password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}  
                        placeholder="Пароль"/>
                    <input 
                        type="password" 
                        className="mail"
                        value={passwordRepeat}
                        onChange={(e)=>setPasswordRepeat(e.target.value)} 
                        placeholder="Повторите пароль" />
                    <div className="input_wrapper">
                        <div className="radio_wrapper">
                            <input 
                                id="radio-2" 
                                type="radio" 
                                name="radio" 
                                value="student" 
                                checked={role=="student"?true:false}
                                onChange={(e)=>setRole(e.target.value)}/>
                            <label for="radio-2">Ученик</label>
                        </div>
                        <div className="radio_wrapper">
                            <input 
                                id="radio-1" 
                                type="radio" 
                                name="radio" 
                                value="teacher" 
                                checked={role=="teacher"?true:false}
                                onChange={(e)=>setRole(e.target.value)}/>
                            <label for="radio-1">Учитель</label>
                        </div>
                        
                    </div>
                    <div className="checkbox_wrapper">
                    <input type="checkbox" class="custom-checkbox" id="happy" name="happy" value="yes"/>
                    <div className="checkbox_label">
                        <label for="happy">Я принимаю&nbsp;</label>
                        <a href="">условия соглашения</a>
                    </div>
                    
                    </div>
                    <div className='errors' style={{display:store.isError===false?'none':'block'}}>{store.errorMessage}</div>
                    <FuncButton onClickFunc={()=>registartion()} btnText={'Зарегестрироваться'}/>
                </div>

            </div>
           
        </div>
    )
}

export default Reg;