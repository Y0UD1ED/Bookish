import { useNavigate } from "react-router-dom";
import BlueButton from "../../components/buttons/BlueButton";
import DarkBlueButton from "../../components/buttons/DarkBlueButton";
import Footer from "../../components/Footer";
import LogInClassItem from "../../components/items/LogInClassItem";
import ClassItem from "../../components/items/ClassItem";
import Navbar from "../../components/Navbar";
import LogInClassPopup from "../../components/popups/LogInClassPopup";
import { useState } from "react";

const Classes=()=>{
    const navigate=useNavigate()
    const [show,setShow]=useState(false)
    return(
        <div className="classes">
            <Navbar/>
            <div className="pagecontainer">
                <div className="classes_list">
                        <div className="list_title">
                        <div className="list_title_row">
                            <div className="list_title_text">Мои классы</div>
                            <div className="list_title_btns">
                                <BlueButton onClickFunc={()=>navigate(-1)} btnText={"Назад"}/>
                                <DarkBlueButton onClickFunc={1} btnText={"Войти в класс"}/>
                            </div>
                        </div>
                        <div className="just_line"></div>
                        </div>
                    <div className="objects_list">
                        <ClassItem text={'10 класс "Хриантема"'}/>
                        <ClassItem text={'10 класс "Хриантема"'}/>
                        <ClassItem text={'10 класс "Хриантема"'}/>
                        <ClassItem text={'10 класс "Хриантема"'}/>
                        <LogInClassItem onClickFunc={()=>setShow(true)}/>
                        <LogInClassPopup isShow={show} onClose={()=>setShow(false)}/>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Classes;