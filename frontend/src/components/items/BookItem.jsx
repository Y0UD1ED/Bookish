import { useNavigate } from "react-router-dom";


const BookItem=()=>{
    const navigate=useNavigate()
    return(
        <div className="book_item" onClick={()=>navigate("/notes/1")}>
            <div className="book_item_col">
                <div className="book_item_img">
                    <img src="/bookImage.svg" alt="" />
                </div>
                <div className="book_item_name">
                    <p>Название книги</p>
                <div className="book_item_author">Автор</div>
                </div>
            </div>
        </div>
    )
}

export default BookItem;