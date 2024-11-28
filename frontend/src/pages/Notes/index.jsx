import { useNavigate } from "react-router-dom";
import BlueButton from "../../components/buttons/BlueButton";
import DarkBlueButton from "../../components/buttons/DarkBlueButton";
import Footer from "../../components/Footer";
import BookItem from "../../components/items/BookItem";
import LogInClassItem from "../../components/items/LogInClassItem";
import Navbar from "../../components/Navbar";
import AddShelfItem from "../../components/items/AddShelfItem";
import AddBookItem from "../../components/items/AddBookItem";
import AddPersonalBookPopup from "../../components/popups/AddPersonalBookPopup";
import { useState } from "react";

const Notes=()=>{
    const navigate=useNavigate()
    const [show,setShow]=useState(false)
    return(
        <div className="notes">
            <Navbar/>
            <div className="pagecontainer">
            <div className="books_list">
                    <div className="list_title">
                        <div className="list_title_row">
                            <div className="list_title_text">Мои книги</div>
                            <div className="list_title_btns">
                                <BlueButton onClickFunc={()=>navigate(-1)} btnText={"Назад"}/>
                                <DarkBlueButton onClickFunc={1} btnText={"Добавить"}/>
                            </div>
                        </div>
                        <div className="just_line"></div>
                    </div>
                    <div className="objects_list">
                        <BookItem/>
                        <BookItem/>
                        <BookItem/>
                        <BookItem/>
                        <AddBookItem onClickFunc={()=>setShow(true)}/>
                        <AddPersonalBookPopup isShow={show} onClose={()=>setShow(false)}/>
                    </div>
                    </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Notes;