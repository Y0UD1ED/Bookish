import { useState } from "react";
import BackButton from "../buttons/BackButton";
import FuncButton from "../buttons/FuncButton";
import FuncButtonWithHint from "../buttons/FuncButtonWithHint";

const AddClassPopup=({isShow,onClose})=>{
    const [name,setName]=useState("")
    if(isShow){
        return(
            <div className="window" onClick={()=>onClose()}>
                <div className="default_popup" onClick={e=>e.stopPropagation()}>
                <div className="popup_title">Создание класса</div>
                   <div className="popup_row" style={{alignItems:"center"}}>
                   <div className="popup_round_item_img" >
                        <img src="userAvatar.jpg" alt="" />
                    </div>
                    <div className="popup_inputs_col">
                        <input 
                            type="text"  
                            placeholder="Название класса"
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                        />
                    </div>
                   </div>
                    <div className="button_row">
                        <BackButton onClickFunc={()=>onClose()}/>
                        <FuncButton btnText={"Создать"} onClickFunc={()=>console.log(name)}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddClassPopup;