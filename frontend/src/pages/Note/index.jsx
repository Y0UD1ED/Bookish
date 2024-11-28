import { useLocation, useNavigate } from "react-router-dom";
import BlueButton from "../../components/buttons/BlueButton";
import DarkBlueButton from "../../components/buttons/DarkBlueButton";
import DeleteButton from "../../components/buttons/DeleteButton";
import Footer from "../../components/Footer"
import TextItem from "../../components/items/TextItem";
import Navbar from "../../components/Navbar"
import "./styles.css"
import ModerationDecisionPopup from "../../components/popups/ModerationDecisionPopup";
import { useEffect, useState } from "react";
import DeletePersonalBookPopup from "../../components/popups/DeletePersonalBookPopup";
import DefaultNote from "../../components/DefaultNote";
import EditNote from "../../components/EditNote";

const Note=()=>{
    const [edit,setEdit]=useState(false)
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0,0);
      }, [pathname]);

      const showNote=()=>{
        if(!edit){
            return <DefaultNote onClickFunc={()=>setEdit(true)}/>
        }
        else{
            return<EditNote onClose={()=>setEdit(false)} onSave={()=>setEdit(false)}/>
        }
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