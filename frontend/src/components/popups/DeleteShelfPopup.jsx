import { useContext, useState } from "react";
import BackButton from "../buttons/BackButton";
import FuncButton from "../buttons/FuncButton";
import { Context } from "../..";
import Loading from "../Loading";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../router";

const DeleteShelfPopup=({shelf,isShow,onClose})=>{
    const [wait,setWait]=useState(false)
    const {store}=useContext(Context)
    const navigate=useNavigate()
    const deleteShelf=async()=>{
        try{
            setWait(true)
            await store.deleteShelfById(shelf.id)
        }catch(e){
            console.log(e)
        }finally{
            if(!store.isError){
                navigate(PATHS.MYSHELFS)
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
                <div className="popup_title">Удаление полки</div>
                <div className="popup_title_label">
                    <span>Вы уверены, что хотите</span>
                    <span className="span_delete">&nbsp;удалить <br></br></span> 
                    <span>&nbsp;полку&nbsp;</span>
                    <span className="bold_delete">{shelf.name}&nbsp;</span>
                    <span>?</span></div>
                <div className="button_row">
                    <BackButton onClickFunc={()=>onClose()}/>
                    <FuncButton btnText={"Удалить"} onClickFunc={()=>deleteShelf()}/>
                </div>
            </div>
        </div>
    )
}
}

export default DeleteShelfPopup;