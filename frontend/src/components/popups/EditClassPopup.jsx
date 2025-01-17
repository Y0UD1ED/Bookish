import { useContext, useRef, useState } from "react";
import BackButton from "../buttons/BackButton";
import FuncButton from "../buttons/FuncButton";
import RoundImageModal from "../RoundImageModal";
import Loading from "../Loading";
import { Context } from "../..";
import { API_URL } from "../../api/api";

const EditClassPopup=({oneClass,isShow,onClose})=>{
    const [name,setName]=useState(oneClass.name)
    const [file,setFile]=useState(null)
    const [wait,setWait]=useState(false)
    const {store}=useContext(Context)

    const updateClass=async()=>{
        try{
            setWait(true)
            let image="defaultImage"
            if(file!=null){
                image=""
            }
            await store.updateClass(oneClass.id,name,image,file)
        }catch(e){
            console.log(e)
        }finally{
            if(!store.isError){
                window.location.reload()
            }
            setWait(false)
        }
    }
    
          const [src, setSrc] = useState(null);
          
            // preview
            const [preview, setPreview] = useState(API_URL+"/images/"+oneClass.image||null);
          
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

    if(wait){
        return<Loading/>
    }
    
    if(isShow){
        return(
            <div className="window" onClick={()=>onClose()}>
                <div className="default_popup" onClick={e=>e.stopPropagation()}>
                <div className="popup_title">Редактировать класс</div>
                   <div className="popup_row" style={{paddingTop:"10px"}}>
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
                    <div className="popup_inputs_col" style={{paddingTop:"20px"}}>
                        <input 
                        type="text"  
                        placeholder="Название класса"
                        value={name}
                        onChange={(e)=>setName(e.target.value)}/>
                    </div>
                   </div>
                    <div className="button_row">
                        <BackButton onClickFunc={()=>onClose()}/>
                        <FuncButton btnText={"Сохранить"} onClickFunc={()=>updateClass()} />
                    </div>
                </div>
            </div>
        )
    }
}

export default EditClassPopup;