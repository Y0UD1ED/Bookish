import BackButton from "../buttons/BackButton";
import FuncButton from "../buttons/FuncButton";

const ModerationDecisionPopup=({isShow,onClose})=>{
    if(isShow){
    return(
        <div className="window" onClick={()=>onClose()}>
            <div className="default_popup" onClick={e=>e.stopPropagation()}>
            <div className="popup_title">Решение модератора</div>
            <div className="popup_content">
                <div className="popup_content_col">
                    <div className="popup_content_decision">
                        <div className="decision_text">Есть нарушение авторских прав?</div>
                        <div className="decision_radio_btns">
                        <div className="decision_radio_wrapper">
                            <div className="decision_radio"></div>
                            <div className="decision_radio_label">Да</div>
                        </div>
                        <div className="decision_radio_wrapper">
                            <div className="decision_radio"></div>
                            <div className="decision_radio_label">Нет</div>
                        </div>
                        </div>
                    </div>
                    <div className="decision_comment"><div className="decision_comment_text">Комментарий Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora nemo eos dolor, reiciendis at et officia temporibus veniam, repellendus quam dolore quaerat natus dolores optio tenetur fugiat impedit rem rerum.</div></div>
                </div>
            </div>
                <div className="button_row">
                    <BackButton onClickFunc={()=>onClose()}/>
                </div>
            </div>
        </div>
    )
}
}

export default ModerationDecisionPopup;