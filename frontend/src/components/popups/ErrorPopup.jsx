import BackButton from "../buttons/BackButton";

const ErrorPopup=({isShow,onClose,error})=>{
    if(isShow){
    return(
        <div className="window" onClick={()=>onClose()}>
            <div className="default_popup" onClick={e=>e.stopPropagation()}>
                <div className="popup_title">Ошибка</div>
                <div className="popup_title_label">
                    {error}
                </div>
                <div className="button_row">
                    <BackButton onClickFunc={()=>onClose()}/>
                </div>
            </div>
        </div>
    )
}
}

export default ErrorPopup;