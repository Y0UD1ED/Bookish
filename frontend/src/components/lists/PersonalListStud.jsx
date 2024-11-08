import BigImportantBooksList from "../lists/BigImportantBooksList";
import Footer from "../Footer";
import Navbar from "../Navbar";

const PersonalListStud=()=>{
    return(
        <div className="personal_classes_stud">
            <Navbar/>
            <div className="pagecontainer">
                <BigImportantBooksList/>
            </div>
            <Footer/>
        </div>
    )
}
export default PersonalListStud;