import { useState } from "react";

const AddSomeBookItem=({id,addItem,removeItem})=>{
    const colors=["white","#E3EDFF"]
    const [color,setColor]=useState(colors[0])
    const [choose,setChoose]=useState(colors[0])
    const bookHandler=()=>{
        if(choose==colors[0]){
            addItem(id)
        }
        else{
            removeItem(id)
        }
        const newColor=choose==colors[0]?colors[1]:colors[0]
        setColor(newColor)
        setChoose(newColor)
    }
    return(
        <div className="add_some_book_item" 
        onClick={bookHandler} 
        onMouseEnter={()=>setColor(colors[1])}
        onMouseLeave={()=>setColor(choose)}
        style={{background:color}}
        >
            <div className="add_some_book_item_row">
                <div className="add_some_book_item_img">
                    <img src="bookImage.svg" alt="" />
                </div>
                <div className="add_some_book_item_info">
                    <div className="add_some_book_item_name">Название книги</div>
                    <div className="add_some_book_item_author">Автор</div>
                </div>
            </div>
        </div>
    )
}

export default AddSomeBookItem;