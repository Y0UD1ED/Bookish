import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar"
import BlueButton from "../../components/buttons/BlueButton"
import DarkBlueButton from "../../components/buttons/DarkBlueButton"
import DeleteButton from "../../components/buttons/DeleteButton";
import './styles.css'
import AddSomeBookInShelfPopup from "../../components/popups/AddSomeBookInShelfPopup";
import { useLocation, useNavigate } from "react-router-dom";
import { PATHS } from "../../router";


const EditAccount=()=>{
    const [isShowDelete,setShowDelete]=useState(false)
    const navigate=useNavigate()
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0,0);
      }, [pathname]);
    return(
        <div className="edit_account">
             <Navbar/>
             <AddSomeBookInShelfPopup isShow={isShowDelete} onClose={()=>setShowDelete(false)}/>
            <div className="pagecontainer">
                <div className="edit_account_wrapper">
               
                <div className="edit_account_col">
                    <div className="edit_account_inputs">
                        <div className="edit_account_input_row">
                                 <div className="edit_account_img">
                            <img src="defaultObjectImg.svg" alt="" />
                            <p>Изменить фото</p>
                        </div>
                        <div className="edit_account_inputs_col">
                        <div className="edit_account_input_item">
                                <label for="radio-2">Фамилия:</label>
                                <input id="last_name" placeholder="Фамилия"/>
                            </div>
                            <div className="edit_account_input_item">
                                <label for="radio-2">Имя:</label>
                                <input id="last_name" placeholder="Имя"/>
                            </div>
                            <div className="edit_account_input_item">
                                <label for="radio-2">Отчество:</label>
                                <input id="last_name" placeholder="Отчество"/>
                            </div>
                            <div className="edit_account_input_item">
                                <label for="radio-2">О себе:</label>
                                <input id="last_name" type="text" placeholder="О себе"/>
                            </div>
                            <div className="edit_account_input_item">
                                <label for="radio-2">Почта:</label>
                                <input id="last_name" placeholder="Почта"/>
                            </div>
                            <div className="edit_account_input_item">
                                <label for="radio-2">Текущий пароль:</label>
                                <input id="last_name" placeholder="Текущий пароль"/>
                            </div>
                            <div className="edit_account_input_item">
                                <label for="radio-2">Новый пароль:</label>
                                <input id="last_name" placeholder="Новый пароль"/>
                            </div>
                        </div>
                            
                        </div>
                    </div>
                    <div className="edit_account_btns">
                        <div className="edit_account_btns_row">
                        <DarkBlueButton btnText={"Отмена"} onClickFunc={()=>navigate(PATHS.PERSONAL_ACCOUNT)}/>
                        <BlueButton btnText={"Сохранить изменения"} onClickFunc={()=>window.location.reload()}/>
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

export default EditAccount;