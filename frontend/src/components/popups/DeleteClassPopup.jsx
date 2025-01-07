import { useContext, useState } from "react";
import BackButton from "../buttons/BackButton";
import FuncButton from "../buttons/FuncButton";
import { Context } from "../..";
import Loading from "../Loading";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../router";

const DeleteClassPopup=({isShow,onClose,oneClass})=>{
    const [wait,setWait]=useState(false)
    const {store}=useContext(Context)
    const navigate=useNavigate()
    const deleteClass=async()=>{
        try{
            setWait(true)
            await store.deleteClassById(oneClass.id)
        }catch(e){
            console.log(e)
        }finally{
            if(!store.isError){
                navigate(PATHS.MYCLASSES)
            }
            setWait(false)
        }
    }

    if(wait){
        return <Loading/>
    }

    if(isShow){
    return(
        <div className="window" onClick={()=>onClose()}>
            <div className="default_popup" onClick={e=>e.stopPropagation()}>
                <div className="popup_title">Удаление класса</div>
                <div className="popup_title_label">
                    <span>Вы уверены, что хотите</span>
                    <span className="span_delete">&nbsp;удалить <br></br></span> 
                    <span>&nbsp;класс&nbsp;</span>
                    <span className="bold_delete">{oneClass.name}&nbsp;</span>
                    <span>?</span></div>
                <div className="button_row">
                    <BackButton onClickFunc={()=>onClose()}/>
                    <FuncButton btnText={"Удалить"} onClickFunc={()=>deleteClass()}/>
                </div>
            </div>
        </div>
    )
}
}

export default DeleteClassPopup;