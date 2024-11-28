import { useNavigate } from "react-router-dom";
import DarkBlueButton from "../buttons/DarkBlueButton";
import LogInClassItem from "../items/LogInClassItem";
import ShelfItem from "../items/ShelfItem";
import AddShelfItem from "../items/AddShelfItem";
import { useState } from "react";
import CreateShelfPopup from "../popups/CreateShelfPopup";

const ShelfsList=()=>{
    const navigate=useNavigate()
    const [show,setShow]=useState(false)
    return(
        <div className="shelfs_list">
            <div className="list_title">
                <div className="list_title_row">
                    <div className="list_title_text">Мои полки</div>
                    <div className="list_title_btns">
                        <DarkBlueButton onClickFunc={()=>navigate("/shelfs")} btnText={"Показать все"}/>
                    </div>
                </div>
                <div className="just_line"></div>
            </div>
            <div className="objects_list">
                <ShelfItem text={"Лето 2023"}/>
                <ShelfItem text={"Детективы"}/>
                <ShelfItem text={"Страшилки"}/>
                <ShelfItem text={"Классическая литература"}/>
                <AddShelfItem onClickFunc={()=>setShow(true)}/>
                <CreateShelfPopup isShow={show} onClose={()=>setShow(false)}/>
            </div>
        </div>
    )
}

export default ShelfsList;