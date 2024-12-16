import { useState } from "react";
import { API_URL } from "../../api/api";

const AddSomeBookItem=({book,addItem,removeItem})=>{
    const colors=["white","#E3EDFF"]
    const [color,setColor]=useState(colors[0])
    const [choose,setChoose]=useState(colors[0])
    const bookHandler=()=>{
        if(choose==colors[0]){
            addItem(book.id)
        }
        else{
            removeItem(book.id)
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
                    <img src={API_URL+"/images/"+book.image||"/bookImage.svg"} alt="" />
                </div>
                <div className="add_some_book_item_info">
                    <div className="add_some_book_item_name">{book.name}</div>
                    <div className="add_some_book_item_author">{book.author}</div>
                </div>
            </div>
        </div>
    )
}

export default AddSomeBookItem;