import { useContext, useEffect, useState } from "react";
import Footer from "../../components/Footer";
import ProgressBookList from "../../components/lists/ProgressBookList";
import Navbar from "../../components/Navbar";
import "./styles.css"
import { Context } from "../..";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading";

const BooksProgress=()=>{
    const {store}=useContext(Context)
    const param=useParams()
    const [books,setBooks]=useState([])
    const [wait,setWait]=useState(false)
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
                <ProgressBookList books={books} />
            </div>
            <Footer/>
        </div>
    )
}

export default BooksProgress;