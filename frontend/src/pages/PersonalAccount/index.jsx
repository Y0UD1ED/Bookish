import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar"
import PersonalAccountStud from "../../components/PersonalAccountStud";
import './styles.css'

const PersonalAccount=()=>{
    return(
        <div className="personal_account">
            <Navbar/>
            <div className="pagecontainer">
             <PersonalAccountStud/>
            </div>
            <Footer/>
        </div>
    )
}

export default PersonalAccount;