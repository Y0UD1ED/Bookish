import { Link } from 'react-router-dom';
import './styles.css'
import { PATHS } from '../../router';

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
                <Link to={PATHS.AUTH} href="" className="">
                    <p className="login_btn">
                        Войти
                    </p>    
                </Link>
                <Link to={PATHS.REG} className="">
                    <p className="reg_btn">
                        Регистрация
                    </p>
                </Link>
            </div>
            </div>
           
        </div>
    )
}

export default Main;