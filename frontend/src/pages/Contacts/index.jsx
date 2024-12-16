import { useLocation } from "react-router-dom";
import Footer from "../../components/Footer"
import Navbar from "../../components/Navbar"
import { useEffect } from "react";

const Contacts=()=>{
    const {pathname}=useLocation()
    useEffect(() => {
            window.scrollTo(0,0);
          }, [pathname]);
    return(
        <div className="contacts">
            <Navbar/>
            <div className="pagecontainer">
                <div className="conditions_text">
                    <div className="condition_title">Контакты</div>
                    <div className="condition_subtitle">Номер телефона: +88005553535</div>
                    <div className="condition_subtitle">Почта: почта</div>
                    <p>Кравцов Артем Игоревич</p>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Contacts