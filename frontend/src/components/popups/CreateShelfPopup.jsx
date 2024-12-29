import { useContext, useEffect, useRef, useState } from "react";
import BackButton from "../buttons/BackButton";
import FuncButton from "../buttons/FuncButton";
import AddSomeBooksList from "../lists/AddSomeBooksList";
import RoundImageModal from "../RoundImageModal";
import { Context } from "../..";
import Loading from "../Loading";
import ErrorPopup from "./ErrorPopup";
import { observer } from "mobx-react";

const CreateShelfPopup=({isShow,onClose})=>{
    const [name,setName]=useState("")
    const [description,setDescription]=useState("")
    const [hide,setHide]=useState(false)
    const [wait,setWait]=useState(false)
    const [file,setFile]=useState(null)
    const [notes,setNotes]=useState([])
    const {store}=useContext(Context)
    const [bookArr,setBookArr]=useState([])

     useEffect(() => {
        const fetchData=async()=>{
            try{
                setWait(true)
                const res=await store.getMyNotes("all");
                setNotes(res)
            }catch(e){
                console.log(e)
            }finally{
                setWait(false)
            }
            
        }
        if(isShow){
            fetchData()
        }
        setBookArr([])
    }, [isShow]);

          const createShelf=async()=>{
            try{
                setWait(true)
                await store.createShelf(name,description,hide,"",file,bookArr)
            }catch(e){
                console.log(e)
            }finally{
                if(!store.isError){
                    window.location.reload()
                }
                setWait(false)
                setBookArr([])
            }
          }

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

    const addBookInList=(i)=>{
        setBookArr([...bookArr, i]);
        console.log(bookArr)
    }

    const removeBookFromList=(i)=>{
        setBookArr(l => l.filter(item => item !==i));
        console.log(bookArr)
    }

    if(wait){
        return <Loading/>
    }
   
    if(isShow){
        return(
            <div className="window" onClick={()=>onClose()}>
                <ErrorPopup error={store.errorMessage} isShow={store.isError} onClose={()=>store.setIsError(false)}/>
                <div className="default_popup" onClick={e=>e.stopPropagation()}>
                <div className="popup_title">Создать полку</div>
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
                        className="popup_create_shelf_long_input"/>
                        <input 
                        type="text"  
                        placeholder="Описание полки"
                        value={description}
                        onChange={(e)=>setDescription(e.target.value)}  
                        className="popup_create_shelf_long_input"/>
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
                   <AddSomeBooksList books={notes} addItemFunc={addBookInList} removeItemFunc={removeBookFromList}/>
                    <div className="button_row" style={{paddingTop:"20px"}}>
                        <BackButton onClickFunc={()=>onClose()}/>
                        <FuncButton btnText={"Создать"} onClickFunc={()=>createShelf()}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default observer(CreateShelfPopup);