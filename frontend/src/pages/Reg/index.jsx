import { useState } from "react";
import './styles.css'
import FuncButton from "../../components/buttons/FuncButton";

const Reg=()=>{

    const [user,setUser]=useState(0);

    const userFunc=()=>{
        setUser(user+1);
    }

    return(
        <div className="backLayout">
            <div className="regContainer">
                <div className="logo">
                <img src="WhiteLogo.svg" alt="" />
                </div>
                <div className="reg_form">
                    <div className="regtitle">Создание аккаунта</div>
                    <input type="text" className="last_name" placeholder="Фамилия" />
                    <input type="text" className="first_name" placeholder="Имя"/>
                    <input type="text" className="mail" placeholder="Почта" />
                    <input type="password" className="password" placeholder="Пароль"/>
                    <input type="password" className="mail" placeholder="Повторите пароль" />
                    <div className="input_wrapper">
                        <div className="radio_wrapper">
                            <input id="radio-2" type="radio" name="radio" value="2" checked/>
                            <label for="radio-2">Ученик</label>
                        </div>
                        <div className="radio_wrapper">
                            <input id="radio-1" type="radio" name="radio" value="1" checked/>
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
                    <FuncButton onClickFunc={userFunc} btnText={'Зарегестрироваться'}/>
                </div>

            </div>
           
        </div>
    )
}

export default Reg;