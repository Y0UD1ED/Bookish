import Footer from "../../components/Footer";
import ProgressBookList from "../../components/lists/ProgressBookList";
import Navbar from "../../components/Navbar";
import "./styles.css"

const BooksProgress=()=>{
    return(
        <div className="books_progress">
            <Navbar/>
            <div className="pagecontainer">
                <ProgressBookList/>
            </div>
            <Footer/>
        </div>
    )
}

export default BooksProgress;