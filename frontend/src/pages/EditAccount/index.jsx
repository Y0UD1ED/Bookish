import { useContext, useEffect, useRef, useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar"
import BlueButton from "../../components/buttons/BlueButton"
import DarkBlueButton from "../../components/buttons/DarkBlueButton"
import DeleteButton from "../../components/buttons/DeleteButton";
import './styles.css'
import AddSomeBookInShelfPopup from "../../components/popups/AddSomeBookInShelfPopup";
import { useLocation, useNavigate } from "react-router-dom";
import { PATHS } from "../../router";
import { Context } from "../..";
import Loading from "../../components/Loading";
import { API_URL } from "../../api/api";
import RoundImageModal from "../../components/RoundImageModal";
import ErrorPopup from "../../components/popups/ErrorPopup";
import { observer } from "mobx-react";


const EditAccount=()=>{
    const [isShowDelete,setShowDelete]=useState(false)
    const navigate=useNavigate()
    const { pathname } = useLocation();
    const [wait,setWait]=useState(true)
    const {store}=useContext(Context)
    const [firstName,setFirstName]=useState("")
    const [lastName,setLastName]=useState("")
    const [middleName,setMiddleName]=useState("")
    const [about,setAbout]=useState("")
    const [mail,setMail]=useState("")
    const [image,setImage]=useState("")
    const [currentPassword,setCurrentPassword]=useState("")
    const [newPassword,setNewPassword]=useState("")
    const [file,setFile]=useState(null)
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

    useEffect(() => {
        window.scrollTo(0,0);
        const fetchData=async()=>{
            try{
                setWait(true)
                const res=await store.getMyDataForUpdate();
                setFirstName(res.firstName)
                setMiddleName(res.middleName)
                setLastName(res.lastName)
                setAbout(res.about)
                setMail(res.mail)
                setImage(res.image)
            }catch(e){
                console.log(e)
            }finally{
                setWait(false)
             
            }
     }
     fetchData()
      }, [pathname]);

    const updateMe=async()=>{
        try{
            setWait(true)
            await store.updateMe(firstName,lastName,middleName,about,mail,currentPassword,newPassword,image,file)
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
    return(
        <div className="edit_account">
                <Navbar/>
                <AddSomeBookInShelfPopup isShow={isShowDelete} onClose={()=>setShowDelete(false)}/>
                <ErrorPopup isShow={store.isError} onClose={()=>store.setIsError(false)} error={store.errorMessage}/>
            <div className="pagecontainer">
                <div className="edit_account_wrapper">
               
                <div className="edit_account_col">
                    <div className="edit_account_inputs">
                        <div className="edit_account_input_row">
                                 <div className="edit_account_img">
                                 <RoundImageModal
                                    modalOpen={modalOpen}
                                    src={src}
                                    setPreview={setPreview}
                                    setModalOpen={setModalOpen}
                                    setFile={setFile}
                                />
                            <img src={preview||API_URL+"/images/"+image||"/defaultObjectImg.svg"} alt="" />
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
                        <div className="edit_account_inputs_col">
                        <div className="edit_account_input_item">
                                <label for="radio-2">Фамилия:</label>
                                <input id="last_name"
                                    onChange={(e)=>setLastName(e.target.value)}
                                    value={lastName}
                                    placeholder="Фамилия"/>
                            </div>
                            <div className="edit_account_input_item">
                                <label for="radio-2">Имя:</label>
                                <input id="last_name"
                                    onChange={(e)=>setFirstName(e.target.value)}
                                    value={firstName}
                                    placeholder="Имя"/>
                            </div>
                            <div className="edit_account_input_item">
                                <label for="radio-2">Отчество:</label>
                                <input id="last_name"
                                    onChange={(e)=>setMiddleName(e.target.value)}
                                    value={middleName}
                                    placeholder="Отчество"/>
                            </div>
                            <div className="edit_account_input_item">
                                <label for="radio-2">О себе:</label>
                                <input id="last_name" type="text"
                                    onChange={(e)=>setAbout(e.target.value)}
                                    value={about}
                                    placeholder="О себе"/>
                            </div>
                            <div className="edit_account_input_item">
                                <label for="radio-2">Почта:</label>
                                <input id="last_name"
                                    onChange={(e)=>setMail(e.target.value)}
                                    value={mail}
                                    placeholder=""Почта/>
                            </div>
                            <div className="edit_account_input_item">
                                <label for="radio-2">Текущий пароль:</label>
                                <input id="last_name"
                                    onChange={(e)=>setCurrentPassword(e.target.value)}
                                    value={currentPassword}
                                    placeholder="Текущий пароль"/>
                            </div>
                            <div className="edit_account_input_item">
                                <label for="radio-2">Новый пароль:</label>
                                <input id="last_name"
                                    onChange={(e)=>setNewPassword(e.target.value)}
                                    value={newPassword}
                                    placeholder="Новый пароль"/>
                            </div>
                        </div>
                            
                        </div>
                    </div>
                    <div className="edit_account_btns">
                        <div className="edit_account_btns_row">
                        <DarkBlueButton btnText={"Отмена"} onClickFunc={()=>navigate(PATHS.PERSONAL_ACCOUNT)}/>
                        <BlueButton btnText={"Сохранить изменения"} onClickFunc={()=>updateMe()}/>
                        </div>
                        <DeleteButton btnText={"Удалить аккаунт"} onClickFunc={()=>setShowDelete(true)}/>
                    </div>
                </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default observer(EditAccount);