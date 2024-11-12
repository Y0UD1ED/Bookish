import { useState } from "react";
import BackButton from "../buttons/BackButton";
import FuncButton from "../buttons/FuncButton";

const GiveModerationDecisionPopup=({isShow,onClose})=>{
    const [radio,setRadio]=useState(0)
    const [comment,setComment]=useState("")
    if(isShow){
    return(
        <div className="window" onClick={()=>onClose()}>
            <div className="default_popup" onClick={e=>e.stopPropagation()}>
            <div className="popup_title">Дать решение</div>
            <div className="popup_content">
                <div className="popup_content_col">
                    <div className="popup_content_decision">
                        <div className="decision_text">Есть нарушение авторских прав?</div>
                        <div className="decision_radio_btns">
                        <div className="decision_radio_wrapper">
                            <div className="decision_radio" 
                            style={{cursor:"pointer",background:radio==-1?"#335696":"#D9D9D9"}}
                            onClick={()=>setRadio(-1)}></div>
                            <div className="decision_radio_label">Да</div>
                        </div>
                        <div className="decision_radio_wrapper">
                            <div className="decision_radio" style={{cursor:"pointer",background:radio==1?"#335696":"#D9D9D9"}}
                             onClick={()=>setRadio(1)}></div>
                            <div className="decision_radio_label">Нет</div>
                        </div>
                        </div>
                    </div>
                    <div className="decision_comment">
                        <textarea 
                        className="moderator_input_text" 
                        placeholder="Комментарий"
                        value={comment}
                        onChange={(e)=>setComment(e.target.value)}></textarea>    
                    </div>
                </div>
            </div>
                <div className="button_row">
                    <BackButton onClickFunc={()=>onClose()}/>
                    <FuncButton btnText={"Отправить"} onClickFunc={()=>console.log(comment)}/>
                </div>
            </div>
        </div>
    )
}
}

export default GiveModerationDecisionPopup;