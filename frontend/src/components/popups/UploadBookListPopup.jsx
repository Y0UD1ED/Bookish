import FuncButtonWithHint from "../buttons/FuncButtonWithHint";
import BackButton from "../buttons/BackButton";
import FuncButton from "../buttons/FuncButton";
import { useRef, useState } from "react";
import ImageModal from "../ImageModal";

const UploadBooListPopup=({isShow,onClose,onUpload})=>{
    const [name,setName]=useState("")
    const [author,setAuthor]=useState("")
    const [src, setSrc] = useState(null);
    const [file,setFile]=useState(null)

     // preview
        const [preview, setPreview] = useState(null);
      
        // modal state
        const [modalOpen, setModalOpen] = useState(false);
      
        // ref to control input element
        const inputRef = useRef(null);
      
        // handle Click
        const handleInputClick = (e) => {
          e.preventDefault();
          inputRef.current.click();
        };
        // handle Change
        const handleImgChange = (e) => {
            if(e.target.files[0]){
                setSrc(URL.createObjectURL(e.target.files[0]));
                setModalOpen(true);
            }
        };
    

    if(isShow){
        return(
            <div className="window" onClick={()=>onClose()}>
                <div className="default_popup" onClick={e=>e.stopPropagation()}>
                <div className="popup_title">Добавление книги</div>
                   <div className="popup_row">
                   <div className="popup_book_item_img_col">
                    <div className="popup_book_item_img">
                            <ImageModal
                                modalOpen={modalOpen}
                                src={src}
                                setPreview={setPreview}
                                setModalOpen={setModalOpen}
                                setFile={setFile}
                            />
                            <img src={
                                    preview ||
                                    "/bookImage.svg"
                                } alt="" />
                    </div> 
                    <div className="image_cropper">
                        <a href="/" onClick={handleInputClick}>
                            </a>
                            
                            <label class="input-file">
                                <input
                                    type="file"
                                    className="file"
                                    accept="image/*"
                                    ref={inputRef}
                                    onChange={handleImgChange}
                                />		
                                <span>Изменить фото</span>
 	                        </label>
                        </div>
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
                        <FuncButton btnText={"Добавить"}/>
                        <FuncButtonWithHint btnText={"Загрузить список"} onClickFunc={onUpload}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default UploadBooListPopup;