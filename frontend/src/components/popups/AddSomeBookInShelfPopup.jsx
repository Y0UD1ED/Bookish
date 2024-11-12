import { useState } from "react";
import BackButton from "../buttons/BackButton";
import FuncButton from "../buttons/FuncButton";
import AddSomeBooksList from "../lists/AddSomeBooksList";
import AddSomeBookItem from "../items/AddSomeBookItem";

const AddSomeBookInShelfPopup=({isShow,onClose})=>{
    let bookArr=[]

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
                <div className="add_some_books_list_row" style={{maxHeight:"400px"}}>
                    <AddSomeBookItem id={1} addItem={addBookInList} removeItem={removeBookFromList}/>
                    <AddSomeBookItem id={2} addItem={addBookInList} removeItem={removeBookFromList}/>
                    <AddSomeBookItem id={3} addItem={addBookInList} removeItem={removeBookFromList}/>
                    <AddSomeBookItem id={4} addItem={addBookInList} removeItem={removeBookFromList}/>
                    <AddSomeBookItem id={5} addItem={addBookInList} removeItem={removeBookFromList}/>
                    <AddSomeBookItem id={6} addItem={addBookInList} removeItem={removeBookFromList}/>
                    <AddSomeBookItem id={7} addItem={addBookInList} removeItem={removeBookFromList}/>
                    <AddSomeBookItem id={8} addItem={addBookInList} removeItem={removeBookFromList}/>
                    <AddSomeBookItem id={9} addItem={addBookInList} removeItem={removeBookFromList}/>
                    <AddSomeBookItem id={10} addItem={addBookInList} removeItem={removeBookFromList}/>
                </div>
        </div>
                    <div className="button_row"
                    style={{paddingTop:"20px"}}>
                        <BackButton onClickFunc={()=>onClose()}/>
                        <FuncButton btnText={"Создать"}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddSomeBookInShelfPopup;