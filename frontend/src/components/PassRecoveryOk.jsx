import FuncButton from "./buttons/FuncButton";



const PassRecoveryOk=({onClickFunc})=>{
    return(
        <div className="pass_recovery_ok">
            <div className="recovery_form">
                <div className="title">Восстановление пароля</div>
                <p className="title_label">Пароль был успешно изменен!</p>
                    <FuncButton onClickFunc={onClickFunc} btnText={"Ок"}/>
            </div>
        </div>
    )
}

export default PassRecoveryOk;