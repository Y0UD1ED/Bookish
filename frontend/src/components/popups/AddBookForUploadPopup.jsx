import { useContext, useRef, useState } from "react";
import BackButton from "../buttons/BackButton";
import FuncButton from "../buttons/FuncButton";
import ImageModal from "../ImageModal";
import { Context } from "../..";
import Loading from "../Loading";
import ErrorPopup from "./ErrorPopup";
import { observer } from "mobx-react";

const AddBookForUploadPopup=({isShow,onClose,onUpload})=>{
    const [name,setName]=useState("")
    const [author,setAuthor]=useState("")
    const {store}=useContext(Context)

    const addBook=()=>{
        onUpload(name,author,"defaultBookImage.png")
        setName("")
        setAuthor("")
    }

    if(isShow){
        return(
            <div className="window" onClick={()=>onClose()}>
                <ErrorPopup isShow={store.isError} error={store.errorMessage} onClose={()=>store.setIsError(false)}/>
                <div className="default_popup" onClick={e=>e.stopPropagation()}>
                <div className="popup_title">Добавление книги</div>
                   <div className="popup_row">
                    <div className="popup_book_item_img_col">
                    <div className="popup_book_item_img">
                            <img src="/bookImage.svg" alt="" />
                    </div> 
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
        
                    </div>
                    
                   </div>
                    <div className="button_row">
                        <BackButton onClickFunc={()=>onClose()}/>
                        <FuncButton btnText={"Добавить"} onClickFunc={()=>addBook()}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default observer(AddBookForUploadPopup);