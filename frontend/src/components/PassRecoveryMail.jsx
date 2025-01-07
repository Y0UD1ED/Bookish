import FuncButton from "./buttons/FuncButton";


const PassRecoveryMail=({onClickFunc})=>{
    return(
        <div className="pass_recovery_mail">
            <div className="recovery_form">
                <div className="title_with_sub">Восстановление пароля</div>
                <div className="subtittle">
                    <p className=""> Введите Вашу почту, и мы отправим код для восстановления пароля</p>
                </div>
                <input type="text" className="mail" placeholder="Почта" />
                <FuncButton onClickFunc={onClickFunc} btnText={"Далее"}/>
            </div>
        </div>
    )
}

export default PassRecoveryMail;