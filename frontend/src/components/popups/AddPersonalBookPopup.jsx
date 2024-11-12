import { useState } from "react";
import BackButton from "../buttons/BackButton";
import FuncButton from "../buttons/FuncButton";

const AddPersonalBookPopup=({isShow,onClose})=>{
    const [name,setName]=useState("")
    const [author,setAuthor]=useState("")
    const [hide,setHide]=useState(false)
    if(isShow){
        return(
            <div className="window" onClick={()=>onClose()}>
                <div className="default_popup" onClick={e=>e.stopPropagation()}>
                <div className="popup_title">Добавление книги</div>
                   <div className="popup_row">
                    <div className="popup_book_item_img">
                        <img src="bookImage.svg" alt="" />
                    </div>
                    <div className="popup_inputs_col">
                        <input 
                            type="text"  
                            placeholder="Название книги"
                            value={name}
                            onChange={(e)=>setName(e.target.value)}/>
                        <input 
                            type="text"  
                            placeholder="Автор"
                            value={author}
                            onChange={(e)=>setAuthor(e.target.value)}/>
                        <div className="checkbox_wrapper">
                            <input 
                            type="checkbox" 
                            checked={hide}
                            onChange={()=>setHide(!hide)}
                           />
                            <div className="checkbox_label">
                            <label>Скрыть ото всех</label>
                            </div>
                        </div>
                    </div>
                   </div>
                    <div className="button_row">
                        <BackButton onClickFunc={()=>onClose()}/>
                        <FuncButton btnText={"Создать"} onClickFunc={()=>console.log(hide)}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddPersonalBookPopup;