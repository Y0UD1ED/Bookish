import { useNavigate } from "react-router-dom";
import ProgressItem from "./ProgressItem";
import { PATHS } from "../../router";

const ProgressBookItem=({book,classId})=>{
    const navigate=useNavigate()
    return(
        <div className="progress_book_item">
            <div className="progress_book_item_row">
                <div className="progress_book_item_img">
                    <img src="/bookImage.svg" alt="" />
                </div>
                <div className="progress_book_item_info">
                    <div className="progress_book_item_info_row">
                        <div className="progress_book_item_info_name">{book.name}</div>
                        <div className="progress_book_item_info_author">{book.author}</div>
                    </div>
                    <div className="progress_book_item_list">
                    <ProgressItem progressText={"Учеников прочли"} progressValue={book.haveRead} onClickFunc={()=>navigate(PATHS.PROGRESS.replace(":id",classId)+"?type=have_read&book="+book.id)}/>
                    <ProgressItem progressText={"Учеников начали читать"} progressValue={book.isReading} onClickFunc={()=>navigate(PATHS.PROGRESS.replace(":id",classId)+"?type=is_reading&book="+book.id)}/>
                    <ProgressItem progressText={"Учеников планируют читать"} progressValue={book.wantToRead} onClickFunc={()=>navigate(PATHS.PROGRESS.replace(":id",classId)+"?type=want_to_read&book="+book.id)}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProgressBookItem;