const AddBookItem=({onClickFunc})=>{
    return(
        <div className="book_item" onClick={()=>{onClickFunc()}}>
            <div className="book_item_col">
                <div className="book_item_img">
                    <img src="/addBookItem.svg" alt="" />
                </div>
                <div className="book_item_name">
                    <p>Добавить книгу</p>
                </div>
            </div>
        </div>
    )
}

export default AddBookItem;