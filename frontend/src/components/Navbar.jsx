import { Link } from "react-router-dom"
import { PATHS } from "../router"

const Navbar=()=>{
    return(
        <div className="navbar">
        <nav className="menu">
            <div className="container">
                <div className="menu_logo"><Link to={PATHS.MAIN}><img src="/WhiteLogo.svg" alt=""></img></Link></div>
                <div className="menu_logo_short"><Link to={PATHS.MAIN}><img src="/shortLogo.svg" alt=""></img></Link></div>
                <ul className="menu_top">
                    <li><Link to={PATHS.PERSONAL_ACCOUNT}>Мой профиль</Link></li>     
                    <li>
                        <div className="notif_icon">
                        <img src="/notificatiom_icon.png" alt="" />
                        </div>
                    </li>
                </ul>
            </div>
           
            
        </nav>
</div>
    )
   
}

export default Navbar