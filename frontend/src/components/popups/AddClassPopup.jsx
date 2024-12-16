import { useRef, useState } from "react";
import BackButton from "../buttons/BackButton";
import FuncButton from "../buttons/FuncButton";
import FuncButtonWithHint from "../buttons/FuncButtonWithHint";
import RoundImageModal from "../RoundImageModal";

const AddClassPopup=({isShow,onClose})=>{
    const [name,setName]=useState("")
    
          const [src, setSrc] = useState(null);
          
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
                <div className="popup_title">Создание класса</div>
                   <div className="popup_row" style={{paddingTop:"10px"}}>
                   <div className="popup_round_item_img">
                        <RoundImageModal
                                    modalOpen={modalOpen}
                                    src={src}
                                    setPreview={setPreview}
                                    setModalOpen={setModalOpen}
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
                    <div className="popup_inputs_col" style={{paddingTop:"20px"}}>
                        <input 
                            type="text"  
                            placeholder="Название класса"
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                        />
                    </div>
                   </div>
                    <div className="button_row">
                        <BackButton onClickFunc={()=>onClose()}/>
                        <FuncButton btnText={"Создать"} onClickFunc={()=>console.log(name)}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddClassPopup;