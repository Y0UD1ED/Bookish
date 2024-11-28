import { useLocation, useNavigate } from "react-router-dom";
import BlueButton from "../../components/buttons/BlueButton";
import DeleteButton from "../../components/buttons/DeleteButton";
import Footer from "../../components/Footer";
import BooksList from "../../components/lists/BooksList";
import Navbar from "../../components/Navbar"
import { useEffect, useState } from "react";
import AddSomeBookInShelfPopup from "../../components/popups/AddSomeBookInShelfPopup";
import EditShelfPopup from "../../components/popups/EditShelfPopup";
import DeleteShelfPopup from "../../components/popups/DeleteShelfPopup";

const Shelf=()=>{
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0,0);
      }, [pathname]);
    const navigate=useNavigate()
    const [show,setShow]=useState(false)
    const [edit,setEdit]=useState(false)
    const [del,setDel]=useState(false)
    return(
        <div className="one_shelf">
            <Navbar/>
            <div className="pagecontainer">
            <div className="lists_row">
                <div className="object_container">
                    <div className="object_row">
                        <div className="object_info">
                            <div className="object_img">
                                <img src="/defaultObjectImg.svg" alt="" />
                            </div>
                            <div className="object_text">
                                <div className="object_name">Название полки</div>
                                <div className="object_about">Описание полки</div>
                                <DeleteButton btnText={'Удалить полку'} onClickFunc={()=>setDel(true)}/>
                            </div>
                        </div>
                        <div className="object_btns">
                            <div className="object_btns_row">
                                <BlueButton btnText={'Редактировать полку'} onClickFunc={()=>setEdit(true)}/>
                                <BlueButton btnText={'Назад'} onClickFunc={()=>navigate(-1)}/>
                            </div>
                        </div>
                    </div>
                </div>
                <BooksList btnText={"Добавить книги"} btnFunc={()=>setShow(true)}/>
                <AddSomeBookInShelfPopup isShow={show} onClose={()=>setShow(false)}/>
            </div>
            <EditShelfPopup isShow={edit} onClose={()=>setEdit(false)}/>
            <DeleteShelfPopup isShow={del} onClose={()=>setDel(false)}/>
            </div>
            <Footer/>
        </div>
    )
}

export default Shelf;