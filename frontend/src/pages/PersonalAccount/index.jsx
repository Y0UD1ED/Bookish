import { useContext } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar"
import PersonalAccountStud from "../../components/PersonalAccountStud";
import './styles.css'
import { Context } from "../..";

const PersonalAccount=()=>{
    const { store } = useContext(Context);

    return(
        <div className="personal_account" onClick={()=>console.log(store.login("tryMail","password"))}>
            <Navbar/>
            <div className="pagecontainer">
             <PersonalAccountStud/>
            </div>
            <Footer/>
        </div>
    )
}

export default PersonalAccount;