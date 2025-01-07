import BackButton from "../buttons/BackButton";
import FuncButton from "../buttons/FuncButton";

const DeleteAccountPopup=({isShow,onClose})=>{
    if(isShow){
    return(
        <div className="window" onClick={()=>onClose()}>
            <div className="default_popup" onClick={e=>e.stopPropagation()}>
                <div className="popup_title">Удаление аккаунта</div>
                <div className="popup_title_label">
                    <span>Вы уверены, что хотите</span>
                    <span className="span_delete">&nbsp;удалить <br></br></span> 
                    <span>&nbsp;свой&nbsp;</span>
                    <span className="bold_delete">аккаунт&nbsp;</span>
                    <span>?</span></div>
                <div className="button_row">
                    <BackButton onClickFunc={()=>onClose()}/>
                    <FuncButton btnText={"Удалить"}/>
                </div>
            </div>
        </div>
    )
}
}

export default DeleteAccountPopup;