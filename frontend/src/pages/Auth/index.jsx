
import { Link, Navigate, useNavigate } from "react-router-dom";
import FuncButton from "../../components/buttons/FuncButton";

import './styles.css'
import { PATHS } from "../../router";

const Auth=()=>{
    const navgate=useNavigate()


    return(
        <div className="backLayout">
            <div className="authContainer">
                <div className="logo">
                <img src="WhiteLogo.svg" alt="" />
                </div>
                <div className="auth_form">
                    <div className="title">Вход</div>
                    <input type="text" className="mail" placeholder="Почта" />
                    <input type="password" className="password" placeholder="Пароль"/>
                    
                    <FuncButton onClickFunc={()=>navgate(PATHS.PERSONAL_ACCOUNT)} btnText={"Войти"}/>
                    <Link to={PATHS.PASSWORD_RECOVERY} className="forget_pass">Забыли пароль? </Link>
                </div>

            </div>
           
        </div>
    )
}

export default Auth;