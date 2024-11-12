import { useState } from "react";
import BackButton from "../buttons/BackButton";
import FuncButton from "../buttons/FuncButton";

const LogInClassPopup=({isShow,onClose})=>{
    const [code,setCode]=useState("")
    if(isShow){
    return(
        <div className="window" onClick={()=>onClose()}>
            <div className="default_popup" onClick={e=>e.stopPropagation()}>
            <div className="popup_title">Добавление в класс</div>
                <div className="popup_subtitle">Введите код, чтобы присоединиться к классу. Код можно получить от учителя.</div>
                <div className="popup_input_wrapper">
                    <input 
                    type="text" 
                    placeholder="Код"
                    value={code}
                    onChange={(e)=>setCode(e.target.value)} />
                </div>
                <div className="button_row">
                    <BackButton onClickFunc={()=>onClose()}/>
                    <FuncButton btnText={"Войти"}/>
                </div>
            </div>
        </div>
    )
}
}

export default LogInClassPopup;