import BackButton from "../buttons/BackButton";
import FuncButton from "../buttons/FuncButton";

const LogoutFromClassPopup=({isShow,onClose})=>{
    if(isShow){
    return(
        <div className="window" onClick={()=>onClose()}>
            <div className="default_popup" onClick={e=>e.stopPropagation()}>
                <div className="popup_title">Выход из класса</div>
                <div className="popup_title_label">
                    <span>Вы уверены, что хотите</span>
                    <span className="span_delete">&nbsp;выйти<br></br></span> 
                    <span>&nbsp;из класса&nbsp;</span>
                    <span className="bold_delete">Название класса&nbsp;</span>
                    <span>?</span></div>
                <div className="button_row">
                    <BackButton onClickFunc={()=>onClose()}/>
                    <FuncButton btnText={"Выйти"}/>
                </div>
            </div>
        </div>
    )
}
}

export default LogoutFromClassPopup;