import { useContext, useRef, useState } from "react";
import BackButton from "../buttons/BackButton";
import FuncButton from "../buttons/FuncButton";
import RoundImageModal from "../RoundImageModal";
import { API_URL } from "../../api/api";
import Loading from "../Loading";
import { Context } from "../..";
import ErrorPopup from "./ErrorPopup";
import { observer } from "mobx-react";

const EditShelfPopup=({shelf,isShow,onClose})=>{
    const [name,setName]=useState(shelf.name||"")
    const [description,setDescription]=useState(shelf.description||"")
    const [hide,setHide]=useState(shelf.hidden||false)
    const [file,setFile]=useState(null)
    const [src, setSrc] = useState(null);
    const [wait, setWait] = useState(false);
    const {store}=useContext(Context)

        // preview
        const [preview, setPreview] = useState(API_URL+"/images/"+shelf.image||null);

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
    
    const updateShelf=async()=>{
        try{
            setWait(true)
            await store.updateShelf(shelf.id,name,description,hide,shelf.image,file)
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
                <ErrorPopup isShow={store.isError} onClose={()=>store.setIsError(false)} error={store.errorMessage}/>
                <div className="default_popup" onClick={e=>e.stopPropagation()}>
                <div className="popup_title">Редактировать полку</div>
                   <div className="popup_row">
                   <div className="popup_round_item_img">
                        <RoundImageModal
                                    modalOpen={modalOpen}
                                    src={src}
                                    setPreview={setPreview}
                                    setModalOpen={setModalOpen}
                                    setFile={setFile}
                                />
                                <img src={
                                        preview ||
                                        "/userAvatar.jpg"
                                    } alt="" />
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
                    <div className="popup_inputs_col_shelf">
                        <input 
                        type="text"  
                        placeholder="Название полки" 
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        className="popup_long_input"/>
                        <input 
                        type="text"  
                        placeholder="Описание полки"
                        value={description}
                        onChange={(e)=>setDescription(e.target.value)}
                        className="popup_long_input"/>
                        <div className="checkbox_wrapper">
                            <input 
                            type="checkbox"
                            checked={hide}
                            onChange={()=>{setHide(!hide)}}/>
                            <div className="checkbox_label">
                            <label>Скрыть ото всех</label>
                            </div>
                        </div>
                    </div>
                   </div>
                    <div className="button_row">
                        <BackButton onClickFunc={()=>onClose()}/>
                        <FuncButton btnText={"Сохранить"} onClickFunc={()=>updateShelf()}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default observer(EditShelfPopup);