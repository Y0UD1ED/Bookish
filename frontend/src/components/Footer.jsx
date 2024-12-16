import { Link } from "react-router-dom";
import { PATHS } from "../router";

const Footer=()=>{
    return(
        <div className="footer">
            <div className="pagecontainer">
                <div className="just_line"></div>
                <div className="footer_row">
                    <Link to={PATHS.CONDITIONS}>Условия и положения</Link>
                    <Link to={PATHS.CONTACTS}>Связаться</Link>
                    <Link to={PATHS.PRIVACYPOLICY}>Политика конфиденциальности</Link>
                </div>
            </div>
           
        </div>
    )
}

export default Footer;