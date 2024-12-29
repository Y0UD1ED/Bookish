import { useNavigate, useParams } from "react-router-dom"
import ProgressBookItem from "../items/ProgressBookItem"
import BlueButton from "../buttons/BlueButton"
import DarkBlueButton from "../buttons/DarkBlueButton"
import { useState } from "react"
import UploadBooListPopup from "../popups/UploadBookListPopup"

const ProgressBookList=({books,onUpload})=>{
    const classId=useParams()
    const role=localStorage.getItem("role")
    const [show,setShow]=useState(false)
    const navigate=useNavigate()
    return(
        <div className="progress_book_list">
             <div className="list_title">
                <div className="list_title_row">
                    <div className="list_title_text">Заданные книги</div>
                    <div className="list_title_btns">
                       <BlueButton btnText={"Назад"} onClickFunc={()=>navigate(-1)}/>
                        {role&&<DarkBlueButton btnText={"Добавить книгу"} onClickFunc={()=>setShow(true)}/>}
                    </div>
                </div>
                <div className="just_line"></div>
            </div>
            <div className="progress_book_list_col">
                {books.map(k=>
                    <ProgressBookItem book={k} key={k.id} classId={classId.id}/>
                )}
            </div>
            {role=="teacher"&&<UploadBooListPopup isShow={show} onClose={()=>setShow(false)} onUpload={onUpload}/>}
        </div>
    )
}

export default ProgressBookList