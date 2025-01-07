import { useState } from "react"
import DeleteButton from "../buttons/DeleteButton"
import BlueButton from "../buttons/BlueButton"

const UploadBookItem=({book,updateBook,onDelete})=>{
    return(
        <div className="upload_book_item">
            <div className="upload_book_item_row">
                <div className="upload_book_item_img">
                    <img src="/bookImage.svg" alt="" />
                </div>
                <div className="upload_book_item_info">
                    <div className="upload_book_item_info_col">
                        <input type="text" 
                            placeholder="Название книги"
                            value={book.name}
                            onChange={(e)=>updateBook(book.id,"name",e.target.value)}
                             />
                        <input type="text" 
                            placeholder="Автор"
                            value={book.author}
                            onChange={(e)=>updateBook(book.id,"author",e.target.value)} />
                        <DeleteButton btnText={"Удалить"} onClickFunc={()=>onDelete()}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UploadBookItem