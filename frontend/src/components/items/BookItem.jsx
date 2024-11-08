

const BookItem=()=>{
    return(
        <div className="book_item">
            <div className="book_item_col">
                <div className="book_item_img">
                    <img src="defaultItemImg.jpg" alt="" />
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