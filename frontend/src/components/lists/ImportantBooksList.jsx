import BookItem from "../items/BookItem";
import DarkBlueButton from "../buttons/DarkBlueButton";
import { useLocation, useNavigate } from "react-router-dom";

const ImportantBooksList=({books, onClickFunc})=>{
    const navigate=useNavigate()
    if(books==undefined){
        books=[]
    }
    const location=useLocation()
    return(
        <div className="books_list">
            <div className="list_title">
                <div className="list_title_row">
                    <div className="list_title_text">Заданные книги</div>
                    <div className="list_title_btns">
                        <DarkBlueButton onClickFunc={()=>onClickFunc()} btnText={"Показать все"}/>
                    </div>
                </div>
                <div className="just_line"></div>
            </div>
            <div className="objects_list">
                {books.map(k=>
                    <BookItem book={k} key={k.id}/>
                )}
            </div>
        </div>
    )
}

export default ImportantBooksList;