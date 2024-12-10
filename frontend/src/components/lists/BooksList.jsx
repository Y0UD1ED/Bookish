import BookItem from "../items/BookItem";
import DarkBlueButton from "../buttons/DarkBlueButton";
import { useLocation, useNavigate } from "react-router-dom";
import AddBookItem from "../items/AddBookItem";
import { useState } from "react";
import AddPersonalBookPopup from "../popups/AddPersonalBookPopup";

const BooksList=({useAdd,btnText,btnFunc,books,useDBbtn=true})=>{
    const navigate=useNavigate()
    const location=useLocation()
    const [show,setShow]=useState(false)
    const isNeedBtn=books!=undefined&&books.length<5&&useAdd?true:false
    return(
        <div className="books_list">
            <div className="list_title">
                <div className="list_title_row">
                    <div className="list_title_text">Мои книги</div>
                    <div className="list_title_btns">
                        {useDBbtn&&<DarkBlueButton onClickFunc={()=>btnFunc()} btnText={btnText}/>}
                    </div>
                </div>
                <div className="just_line"></div>
            </div>
            <div className="objects_list">
                {books.map(k=>
                    <BookItem book={k} key={k.id}/>
                )}
                {isNeedBtn &&(<AddBookItem onClickFunc={()=>setShow(true)}/>)}
                <AddPersonalBookPopup isShow={show} onClose={()=>setShow(false)}/>
            </div>
        </div>
    )
}

export default BooksList;