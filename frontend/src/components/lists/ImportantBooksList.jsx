import BookItem from "../items/BookItem";
import DarkBlueButton from "../buttons/DarkBlueButton";
import LogInClassItem from "../items/LogInClassItem";
import { useNavigate } from "react-router-dom";


const ImportantBooksList=()=>{
    const navigate=useNavigate()
    return(
        <div className="books_list">
            <div className="list_title">
                <div className="list_title_row">
                    <div className="list_title_text">Заданные книги</div>
                    <div className="list_title_btns">
                        <DarkBlueButton onClickFunc={()=>navigate("/books")} btnText={"Показать все"}/>
                    </div>
                </div>
                <div className="just_line"></div>
            </div>
            <div className="objects_list">
                <BookItem/>
                <BookItem/>
                <BookItem/>
                <BookItem/>
            </div>
        </div>
    )
}

export default ImportantBooksList;