import { useNavigate } from "react-router-dom"
import DarkBlueButton from "../buttons/DarkBlueButton"
import ProgressBookItem from "../items/ProgressBookItem"
import BlueButton from "../buttons/BlueButton"

const ProgressBookList=()=>{
    const navigate=useNavigate()
    return(
        <div className="progress_book_list">
             <div className="list_title">
                <div className="list_title_row">
                    <div className="list_title_text">Заданные книги</div>
                    <div className="list_title_btns">
                       <BlueButton btnText={"Назад"} onClickFunc={()=>navigate(-1)}/>
                    </div>
                </div>
                <div className="just_line"></div>
            </div>
            <div className="progress_book_list_col">
                <ProgressBookItem/>
                <ProgressBookItem/>
                <ProgressBookItem/>
                <ProgressBookItem/>
            </div>
        </div>
    )
}

export default ProgressBookList