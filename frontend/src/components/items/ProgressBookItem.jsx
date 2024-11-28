import ProgressItem from "./ProgressItem";

const ProgressBookItem=()=>{
    return(
        <div className="progress_book_item">
            <div className="progress_book_item_row">
                <div className="progress_book_item_img">
                    <img src="/bookImage.svg" alt="" />
                </div>
                <div className="progress_book_item_info">
                    <div className="progress_book_item_info_row">
                        <div className="progress_book_item_info_name">Название книги</div>
                        <div className="progress_book_item_info_author">Автор</div>
                    </div>
                    <div className="progress_book_item_list">
                    <ProgressItem progressText={"Учеников прочли"}/>
                    <ProgressItem progressText={"Учеников начали читать"}/>
                    <ProgressItem progressText={"Учеников планируют читать"}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProgressBookItem;