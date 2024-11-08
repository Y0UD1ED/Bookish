
import BackButton from "./buttons/BackButton";
import FuncButton from "./buttons/FuncButton";



const PassRecoveryCode=({onClickFunc})=>{
    return(
        <div className="pass_recovery_code">
            <div className="recovery_form">
                <div className="title">Восстановление пароля</div>
                <input type="text" className="mail" placeholder="Почта" />
                <input type="password" className="password" placeholder="Новый пароль" />
                <input type="password" className="repeat_password" placeholder="Ещё раз" />
                <div className="button_row">
                    <BackButton/>
                    <FuncButton onClickFunc={onClickFunc} btnText={"Далее"}/>
                </div>
            </div>
        </div>
    )
}

export default PassRecoveryCode;