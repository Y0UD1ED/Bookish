import { useContext, useEffect, useState } from "react";
import Footer from "../../components/Footer";
import ProgressBookList from "../../components/lists/ProgressBookList";
import Navbar from "../../components/Navbar";
import "./styles.css"
import { Context } from "../..";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import UploadBooks from "../../components/UploadBooks";

const BooksProgress=()=>{
    const {store}=useContext(Context)
    const param=useParams()
    const [books,setBooks]=useState([])
    const [uploadedBooks,setUploadedBooks]=useState([])
    const [wait,setWait]=useState(false)
    let bookArr=[{
        "id":1,
        "name":"book1",
        "author":"author1"
    },
    {   "id":2,
        "name":"book2",
        "author":"author2"
    }    
]


    useEffect(() => {
        const fetchData=async()=>{
            try{
                setWait(true)
                const res=await store.getClassBooks(param.id);
                setBooks(res)
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
        <div className="books_progress">
            <Navbar/>
            <div className="pagecontainer">
                
                {uploadedBooks.length==0&&<ProgressBookList books={books} onUpload={setUploadedBooks} />}
                {uploadedBooks.length>0&&<UploadBooks books={uploadedBooks} setBooks={setUploadedBooks}/>}
            </div>
            <Footer/>
        </div>
    )
}

export default BooksProgress;