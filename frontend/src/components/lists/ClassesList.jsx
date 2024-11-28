import { useNavigate } from "react-router-dom";
import DarkBlueButton from "../buttons/DarkBlueButton";
import LogInClassItem from "../items/LogInClassItem";
import ClassItem from "../items/ClassItem";
import { useState } from "react";
import LogInClassPopup from "../popups/LogInClassPopup";

const ClassesList=()=>{
    const navigate=useNavigate()
    const [show,setShow]=useState(false)
    return(
        <div className="classes_list">
            <div className="list_title">
                <div className="list_title_row">
                    <div className="list_title_text">Мои классы</div>
                    <div className="list_title_btns">
                        <DarkBlueButton onClickFunc={()=>navigate("/classes")} btnText={"Показать все"}/>
                    </div>
                </div>
                <div className="just_line"></div>
            </div>
            <div className="objects_list">
                <ClassItem text={'10 класс "Хризантема"'}/>
                <ClassItem text={'10 класс "Хризантема"'}/>
                <ClassItem text={'10 класс "Хризантема"'}/>
                <ClassItem text={'10 класс "Хризантема"'}/>
                <LogInClassItem onClickFunc={()=>setShow(true)}/>
                <LogInClassPopup isShow={show} onClose={()=>setShow(false)}/>
            </div>
        </div>
    )
}

export default ClassesList;