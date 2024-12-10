import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer"
import Navbar from "../../components/Navbar"
import "./styles.css"
import { useContext, useEffect, useState } from "react";
import DefaultNote from "../../components/DefaultNote";
import EditNote from "../../components/EditNote";
import { Context } from "../..";
import Loading from "../../components/Loading";

const Note=()=>{
    const { pathname } = useLocation();
    const {store}=useContext(Context)
    const [edit,setEdit]=useState(false)
    const [note,setNote]=useState()
    const [wait,setWait]=useState(false)
    useEffect(() => {
        window.scrollTo(0,0);
        const fetchData=async()=>{
            try{
                setWait(true)
                const res=await store.getNoteById(pathname.split("/").pop());
                setNote(res)
            }catch(e){
                console.log(e)
            }finally{
                setWait(false)
            }
        
    }
    fetchData()
      }, [pathname]);

      const showNote=()=>{
        if(!edit){
            return <DefaultNote note={note} onClickFunc={()=>setEdit(true)}/>
        }
        else{
            return<EditNote note={note} onClose={()=>setEdit(false)} onSave={()=>setEdit(false)}/>
        }
      }
      if(wait){
        return <Loading/>
      }
    return(
        <div className="note">
            <Navbar/>
            <div className="pagecontainer">
                {showNote()}
            </div>
            <Footer/>
        </div>
    )
}

export default Note;