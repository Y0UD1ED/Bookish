import { useContext, useEffect, useState } from "react";
import BackButton from "../buttons/BackButton";
import FuncButton from "../buttons/FuncButton";
import AddSomeBooksList from "../lists/AddSomeBooksList";
import AddSomeBookItem from "../items/AddSomeBookItem";
import { Context } from "../..";

const AddSomeBookInShelfPopup=({id,isShow,onClose})=>{
    const [wait,setWait]=useState(false)
    const [notes,setNotes]=useState([])
    let bookArr=[]
    const {store}=useContext(Context)
     useEffect(() => {
        const fetchData=async()=>{
            try{
                setWait(true)
                const res=await store.getExcludedNotesInShelf(id);
                setNotes(res)
            }catch(e){
                console.log(e)
            }finally{
                setWait(false)
            }
            
        }
        if(isShow){
            fetchData()
        }
        }, [isShow]);
    
    const addBooksInShelf=async()=>{
        try{
            setWait(true)
            await store.addBooksInShelf(id,bookArr)
        }catch(e){
            console.log(e)
        }finally{
            window.location.reload()
        }
    }

    const addBookInList=(i)=>{
        bookArr.push(i)
        console.log(bookArr)
    }

    const removeBookFromList=(i)=>{
        bookArr=bookArr.filter(num=>num!=i)
        console.log(bookArr)
    }

    if(isShow){
        return(
            <div className="window" onClick={()=>onClose()}>
                <div className="default_popup" onClick={e=>e.stopPropagation()}>
                <div className="popup_title" style={{paddingBottom:"30px"}}>Добавление книг</div>
                <div className="add_some_books_list">
                <AddSomeBooksList books={notes} addItemFunc={addBookInList} removeItemFunc={removeBookFromList}/>
        </div>
                    <div className="button_row"
                    style={{paddingTop:"20px"}}>
                        <BackButton onClickFunc={()=>onClose()}/>
                        <FuncButton btnText={"Добавить"} onClickFunc={()=>addBooksInShelf()}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddSomeBookInShelfPopup;