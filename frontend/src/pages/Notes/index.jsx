import { useLocation, useNavigate, useParams } from "react-router-dom";
import BlueButton from "../../components/buttons/BlueButton";
import DarkBlueButton from "../../components/buttons/DarkBlueButton";
import Footer from "../../components/Footer";
import BookItem from "../../components/items/BookItem";
import Navbar from "../../components/Navbar";
import AddBookItem from "../../components/items/AddBookItem";
import AddPersonalBookPopup from "../../components/popups/AddPersonalBookPopup";
import { useContext, useEffect, useState } from "react";
import { Context } from "../..";
import { PATHS } from "../../router";
import Loading from "../../components/Loading";

const Notes=()=>{
    const navigate=useNavigate()
    const {store}=useContext(Context)
    const param=useParams()
    const location=useLocation()
    const [show,setShow]=useState(false)
    const [owner,setOwner]=useState(false)
    const [books,setBooks]=useState([])
    const [wait,setWait]=useState(false)
    useEffect(() => {
        const fetchData=async()=>{
            try{
                setWait(true)
                if(location.pathname==PATHS.MYNOTES){
                    setOwner(true)
                    const res=await store.getMyNotes("personal");
                    setBooks(res)
                }else{
                    const res=await store.getStudentNotes(param.id,"personal");
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
        <div className="notes">
            <Navbar/>
            <div className="pagecontainer">
            <div className="books_list">
                    <div className="list_title">
                        <div className="list_title_row">
                            <div className="list_title_text">Мои книги</div>
                            <div className="list_title_btns">
                                <BlueButton onClickFunc={()=>navigate(-1)} btnText={"Назад"}/>
                                {owner&&<DarkBlueButton onClickFunc={1} btnText={"Добавить"}/>}
                            </div>
                        </div>
                        <div className="just_line"></div>
                    </div>
                    <div className="objects_list">
                        {books.map(k=>
                            <BookItem book={k} key={k.id}/>
                        )}
                        {owner&&<AddBookItem onClickFunc={()=>setShow(true)}/>}
                        <AddPersonalBookPopup isShow={show} onClose={()=>setShow(false)}/>
                    </div>
                    </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Notes;