import './styles.css'

const Main=()=>{
    return(
        <div className="backLayout">
            <div className="mainContainer">
                <div className="mainLogo">
                <div className="logo">
                <img src="WhiteLogo.svg" alt="" />
            </div>
                <div className="slogan">Чтение с умом - статистика в помощь</div>
                </div>
            
            <div className="buttons">
                <p className="login_btn">
                    <a href="" className="">Войти</a>
                </p>
                <p className="reg_btn">
                    <a href="" className="">Регистрация</a>
                </p>
            </div>
            </div>
           
        </div>
    )
}

export default Main;