import { useLocation, useNavigate } from "react-router-dom";
import { PATHS } from "../../router";


const BookItem=({book})=>{
    const navigate=useNavigate()
    const location=useLocation().pathname
    return(
        <div className="book_item" onClick={()=>{!location.includes("classes")?navigate(PATHS.NOTE.replace(":id",book.id)):console.log()}}>
            <div className="book_item_col">
                <div className="book_item_img">
                    <img src="/bookImage.svg" alt="" />
                </div>
                <div className="book_item_name">
                    <p>{book.name}</p>
                <div className="book_item_author">{book.author}</div>
                </div>
            </div>
        </div>
    )
}

export default BookItem;