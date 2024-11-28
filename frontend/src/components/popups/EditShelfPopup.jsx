import { useState } from "react";
import BackButton from "../buttons/BackButton";
import FuncButton from "../buttons/FuncButton";

const EditShelfPopup=({isShow,onClose})=>{
    const [name,setName]=useState("")
    const [description,setDescription]=useState("")
    const [hide,setHide]=useState(false)
    if(isShow){
        return(
            <div className="window" onClick={()=>onClose()}>
                <div className="default_popup" onClick={e=>e.stopPropagation()}>
                <div className="popup_title">Редактировать полку</div>
                   <div className="popup_row">
                    <div className="popup_round_item_img">
                        <img src="/userAvatar.jpg" alt="" />
                    </div>
                    <div className="popup_inputs_col">
                        <input 
                        type="text"  
                        placeholder="Название полки" 
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        className="popup_long_input"/>
                        <input 
                        type="text"  
                        placeholder="Описание полки"
                        value={description}
                        onChange={(e)=>setDescription(e.target.value)}
                        className="popup_long_input"/>
                        <div className="checkbox_wrapper">
                            <input 
                            type="checkbox"
                            checked={hide}
                            onChange={()=>setHide(!hide)}/>
                            <div className="checkbox_label">
                            <label>Скрыть ото всех</label>
                            </div>
                        </div>
                    </div>
                   </div>
                    <div className="button_row">
                        <BackButton onClickFunc={()=>onClose()}/>
                        <FuncButton btnText={"Сохранить"}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default EditShelfPopup;