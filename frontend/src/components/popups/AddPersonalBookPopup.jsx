import { useContext, useRef, useState } from "react";
import BackButton from "../buttons/BackButton";
import FuncButton from "../buttons/FuncButton";
import ImageModal from "../ImageModal";
import { Context } from "../..";
import Loading from "../Loading";
import ErrorPopup from "./ErrorPopup";
import { observer } from "mobx-react";

const AddPersonalBookPopup=({isShow,onClose})=>{
    const [name,setName]=useState("")
    const [author,setAuthor]=useState("")
    const [hide,setHide]=useState(false)
    const [wait,setWait]=useState(false)
    const [src, setSrc] = useState(null);
    const [file,setFile]=useState(null);
    const {store}=useContext(Context)
    const [show,setShow]=useState(false)
  
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

    const createNote=async()=>{
        try{
            setWait(true)
            let image="defaultImage"
            if(file!=null){
                image=""
            }
            await store.createNote(name,author,hide,image,file)
        }catch(e){
            console.log(e)
        }finally{
            if(!store.isError){
                window.location.reload()
            }
            setWait(false)
        }
    }

    if(wait){
        return <Loading/>
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
                        <FuncButton btnText={"Создать"} onClickFunc={()=>createNote()}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default observer(AddPersonalBookPopup);