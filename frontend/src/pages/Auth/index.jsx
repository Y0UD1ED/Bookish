
import FuncButton from "../../components/buttons/FuncButton";

import './styles.css'

const Auth=()=>{
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
                    
                    <FuncButton onClickFunc={1} btnText={"Войти"}/>
                    <a className="forget_pass" href="#">Забыли пароль? </a>
                </div>

            </div>
           
        </div>
    )
}

export default Auth;