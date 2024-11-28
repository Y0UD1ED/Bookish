import BlueButton from "../../components/buttons/BlueButton";
import DeleteButton from "../../components/buttons/DeleteButton";
import Footer from "../../components/Footer";
import ImportantBooksList from "../../components/lists/ImportantBooksList";
import Navbar from "../../components/Navbar";
import ProgressList from "../../components/lists/ProgressList";
import StudentsList from "../../components/lists/StudentsList";

import '../Class/styles.css'
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LogoutFromClassPopup from "../../components/popups/LogoutFromClassPopup";

const Class=()=>{
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0,0);
      }, [pathname]);
    const navigate=useNavigate()
    const [exit,setExit]=useState(false)
    return(
        <div className="one_class">
            <Navbar/>
            <div className="pagecontainer">
            <div className="lists_row">
                <div className="object_container">
                    <div className="object_row">
                        <div className="object_info">
                            <div className="object_img">
                                <img src="/defaultObjectImg.svg" alt="" />
                            </div>
                            <div className="object_text">
                                <div className="object_name">Название класса</div>
                                <div className="object_about">10 учеников</div>
                                <div className="object_copyboard">
                                    <div className="object_about">Код для добавления:</div>
                                    <div className="object_copy_code">
                                        1234
                                    </div>
                                    <div className="object_copy_img">
                                            <img src="/copy.svg" alt="" />
                                    </div>    
                                </div>
                                
                                <DeleteButton btnText={'Выйти из класса'} onClickFunc={()=>setExit(true)}/>
                            </div>
                        </div>
                        <div className="object_btns">
                            <div className="object_btns_col">
                                <BlueButton btnText={'Назад'} onClickFunc={()=>navigate(-1)}/>
                            </div>
                        </div>
                    </div>
                </div>
                <ProgressList/>
                <ImportantBooksList/>
                <StudentsList useBtns={true}/>
                <LogoutFromClassPopup isShow={exit} onClose={()=>setExit(false)}/>
            </div>
    
            </div>
            <Footer/>
        </div>
    )
}

export default Class;
