import {useNavigate } from "react-router-dom";
import DarkBlueButton from "../buttons/DarkBlueButton";
import LogInClassItem from "../items/LogInClassItem";
import ClassItem from "../items/ClassItem";
import { useContext, useState } from "react";
import LogInClassPopup from "../popups/LogInClassPopup";
import { Context } from "../..";
import AddClassItem from "../items/AddClassItem";
import AddClassPopup from "../popups/AddClassPopup";

const ClassesList=({classes,onClickFunc,type="student"})=>{
    const navigate=useNavigate()
    const {store}=useContext(Context)
    const isNeedBtn=classes.length<5?true:false
    const [show,setShow]=useState(false)
    return(
        <div className="classes_list">
            <div className="list_title">
                <div className="list_title_row">
                    <div className="list_title_text">Мои классы</div>
                    <div className="list_title_btns">
                        <DarkBlueButton onClickFunc={()=>onClickFunc()} btnText={"Показать все"}/>
                    </div>
                </div>
                <div className="just_line"></div>
            </div>
            <div className="objects_list">
                {classes.map(k=>
                    <ClassItem oneClass={k} key={k.id}/>
                )}
                {isNeedBtn&&type=="student"&&<LogInClassItem onClickFunc={()=>setShow(true)}/>}
                {isNeedBtn&&type=="teacher"&&<AddClassItem onClickFunc={()=>setShow(true)}/>}
                {type=="teacher"&&<AddClassPopup isShow={show} onClose={()=>setShow(false)}/>}
                {type=="student"&&<LogInClassPopup isShow={show} onClose={()=>setShow(false)}/>}
            </div>
        </div>
    )
}

export default ClassesList;