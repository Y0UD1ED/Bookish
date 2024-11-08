import BookItem from "../items/BookItem";
import DarkBlueButton from "../buttons/DarkBlueButton";
import LogInClassItem from "../items/LogInClassItem";

const BooksList=()=>{
    return(
        <div className="books_list">
            <div className="list_title">
                <div className="list_title_row">
                    <div className="list_title_text">Мои книги</div>
                    <div className="list_title_btns">
                        <DarkBlueButton onClickFunc={1} btnText={"Показать все"}/>
                    </div>
                </div>
                <div className="just_line"></div>
            </div>
            <div className="objects_list">
                <BookItem/>
                <BookItem/>
                <BookItem/>
                <BookItem/>
                <LogInClassItem/>
            </div>
        </div>
    )
}

export default BooksList;