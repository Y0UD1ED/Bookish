import { useLocation, useNavigate } from "react-router-dom";
import BlueButton from "../../components/buttons/BlueButton";
import DarkBlueButton from "../../components/buttons/DarkBlueButton";
import Footer from "../../components/Footer";
import BookItem from "../../components/items/BookItem";
import Navbar from "../../components/Navbar";
import { useContext, useEffect, useState } from "react";
import UploadBooListPopup from "../../components/popups/UploadBookListPopup";
import { Context } from "../..";
import { PATHS } from "../../router";
import Loading from "../../components/Loading";

const Books=()=>{
    const navigate=useNavigate()
    const {store}=useContext(Context)
    const location=useLocation()
    const [show,setShow]=useState(false)
    const [wait,setWait]=useState(false)
    const [books,setBooks]=useState([])
    useEffect(() => {
        const fetchData=async()=>{
            try{
                setWait(true)
                if(location.pathname==PATHS.MYBOOKS){
                    const res=await store.getMyBooks();
                    setBooks(res)
                }
        }catch(e){
            console.log(e)
        }finally{
            setWait(false)
        }

    }
    fetchData()
      },[]);

    if(wait){
        return <Loading/>
    }
    return(
        <div className="books">
            <Navbar/>
            <div className="pagecontainer">
                <div className="books_list">
                    <div className="list_title">
                        <div className="list_title_row">
                            <div className="list_title_text">Заданные книги</div>
                            <div className="list_title_btns">
                                <BlueButton onClickFunc={()=>navigate(-1)} btnText={"Назад"}/>
                                <DarkBlueButton onClickFunc={()=>setShow(true)} btnText={"Добавить"}/>
                            </div>
                        </div>
                        <div className="just_line"></div>
                    </div>
                    <div className="objects_list">
                        {books.map(k=>
                        <BookItem book={k} key={k.id}/>
                        )}
                        <UploadBooListPopup isShow={show} onClose={()=>setShow(false)}/>
                    </div>
                    </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Books;