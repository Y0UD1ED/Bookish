import { useContext, useState } from "react";
import BlueButton from "./buttons/BlueButton";
import DarkBlueButton from "./buttons/DarkBlueButton";
import { useNavigate, useParams } from "react-router-dom";
import UploadBookItem from "./items/UploadBookItem";
import AddBookForUploadPopup from "./popups/AddBookForUploadPopup";
import { setWeek } from "date-fns";
import { Context } from "..";

const UploadBooks=({books,setBooks})=>{
    const [show,setShow]=useState(false)
    const [wait,setWait]=useState(false)
    const [popup,setPopup]=useState(false)
    const navigate=useNavigate()
    const params=useParams()
    console.log(params)
    const {store}=useContext(Context)
    const handleUpdateBook=(id,field,value)=>{
        setBooks((prevAdd) =>
            prevAdd.map((b) =>
              b.id === id ? { ...b, [field]: value } : b
            )
          );
    }

    const handleDeleteBook=(id)=>{
        setBooks((prevAdd) =>
            prevAdd.filter((b) =>b.id != id)
          );
    }

    const handleAddBook=(name,author,image)=>{
        const newBook={
            id:books.length,
            name:name,
            author:author,
            image: image,
        }
        setBooks([newBook,...books])
        console.log(books)
        setPopup(false)
    }

    const addBooksInClass=async()=>{
      try{
        setWait(true)
        await store.addBooksInClass(params.id,books)
      }catch(e){
        console.log(e)
      }finally{
        if(!store.isError){
            window.location.reload()
        }
        setWait(false)
      }
    }
    return(
        <div className="upload_books">
            <AddBookForUploadPopup isShow={popup} onClose={()=>setPopup(false)} onUpload={handleAddBook}/>
              <div className="list_title">
                <div className="list_title_row">
                    <div className="list_title_text">Заданные книги</div>
                    <div className="list_title_btns">
                       <BlueButton btnText={"Назад"} onClickFunc={()=>navigate(-1)}/>
                        <DarkBlueButton btnText={"Добавить книгу"} onClickFunc={()=>setPopup(true)}/>
                        <DarkBlueButton btnText={"Сохранить"} onClickFunc={()=>addBooksInClass()}/>
                    </div>
                </div>
                <div className="just_line"></div>
            </div>
            <div className="objects_list" style={{flexDirection:"column"}}>
                    {books.map(k=>
                        <UploadBookItem book={k} updateBook={handleUpdateBook} onDelete={()=>handleDeleteBook(k.id)}/>
                    )}
            </div>
        </div>
    )
}

export default UploadBooks;