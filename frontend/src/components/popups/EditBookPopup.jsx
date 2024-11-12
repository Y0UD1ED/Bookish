import { useState } from "react";
import BackButton from "../buttons/BackButton";
import FuncButton from "../buttons/FuncButton";


const EditBookPopup=({isShow,onClose})=>{
    const [name,setName]=useState("")
    const [author,setAuthor]=useState("")
    if(isShow){
        return(
            <div className="window" onClick={()=>onClose()}>
                <div className="default_popup" onClick={e=>e.stopPropagation()}>
                <div className="popup_title">Изменение книги</div>
                   <div className="popup_row">
                    <div className="popup_book_item_img">
                        <img src="bookImage.svg" alt="" />
                    </div>
                    <div className="popup_inputs_col">
                        <input 
                        type="text"  
                        placeholder="Название книги"
                        value={name}
                        onChange={(e)=>setName(e.target.value)} 
                        className="popup_long_input"/>
                        <input 
                        type="text"  
                        placeholder="Автор"  
                        value={author}
                        onChange={(e)=>setAuthor(e.target.value)}
                        className="popup_long_input"/>
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

export default EditBookPopup;