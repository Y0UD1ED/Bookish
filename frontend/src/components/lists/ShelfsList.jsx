import { useLocation, useNavigate } from "react-router-dom";
import DarkBlueButton from "../buttons/DarkBlueButton";
import ShelfItem from "../items/ShelfItem";
import AddShelfItem from "../items/AddShelfItem";
import { useState } from "react";
import CreateShelfPopup from "../popups/CreateShelfPopup";

const ShelfsList=({shelfs, onClickFunc,useAdd})=>{
    const navigate=useNavigate()
    const location=useLocation()
    const [show,setShow]=useState(false)
    return(
        <div className="shelfs_list">
            <div className="list_title">
                <div className="list_title_row">
                    <div className="list_title_text">Мои полки</div>
                    <div className="list_title_btns">
                        <DarkBlueButton onClickFunc={()=>onClickFunc()} btnText={"Показать все"}/>
                    </div>
                </div>
                <div className="just_line"></div>
            </div>
            <div className="objects_list">
                {shelfs.map(k=>
                    <ShelfItem shelf={k} key={k.id}/>
                )}
                {useAdd&&<AddShelfItem onClickFunc={()=>setShow(true)}/>}
                <CreateShelfPopup isShow={show} onClose={()=>setShow(false)}/>
            </div>
        </div>
    )
}

export default ShelfsList;