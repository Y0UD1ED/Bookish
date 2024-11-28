import { useLocation, useNavigate } from "react-router-dom";
import BlueButton from "../../components/buttons/BlueButton";
import Footer from "../../components/Footer"
import Navbar from "../../components/Navbar"
import "./styles.css"
import StudentsList from "../../components/lists/StudentsList";
import { useEffect } from "react";

const Progress=()=>{
    const progressStyle={
        background: 
                'radial-gradient(closest-side, white 69%, transparent 70% 100%), conic-gradient(#22D670 75%, #D9D9D9 0)'
    };
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0,0);
      }, [pathname]);
    const navigate=useNavigate()
    return(
        <div className="one_progress">
            <Navbar/>
            <div className="pagecontainer">
            <div className="list_title">
                <div className="list_title_row">
                    <div className="list_title_text">Прогресс класса</div>
                    <div className="list_title_btns">
                       <BlueButton btnText={"Назад"} onClickFunc={()=>navigate(-1)}/>
                    </div>
                </div>
                <div className="just_line"></div>
            </div>
            <div className="progress_big_item">
                <div className="progress_item_row">
                    <div className="progress_item_circle">
                        <div class="progress-bar_big" style={progressStyle}>75%</div>
                    </div>
                    <div className="progress_item_big_name">Прочли все книги</div>
                </div>
        </div>
        <StudentsList/>
            </div>
            <Footer/>
        </div>
    )
}

export default Progress;