import { useNavigate } from "react-router-dom"
import Navbar from "../../components/Navbar"
import BlueButton from "../../components/buttons/BlueButton"
import DarkBlueButton from "../../components/buttons/DarkBlueButton"
import ShelfItem from "../../components/items/ShelfItem"
import LogInClassItem from "../../components/items/LogInClassItem"
import Footer from "../../components/Footer"
import AddShelfItem from "../../components/items/AddShelfItem"
import { useState } from "react"
import CreateShelfPopup from "../../components/popups/CreateShelfPopup"

const Shelfs=()=>{
    const navigate=useNavigate()
    const [show,setShow]=useState(false)
    return(
        <div className="classes">
            <Navbar/>
            <div className="pagecontainer">
                <div className="classes_list">
                        <div className="list_title">
                        <div className="list_title_row">
                            <div className="list_title_text">Мои полки</div>
                            <div className="list_title_btns">
                                <BlueButton onClickFunc={()=>navigate(-1)} btnText={"Назад"}/>
                                <DarkBlueButton onClickFunc={1} btnText={"Добавить"}/>
                            </div>
                        </div>
                        <div className="just_line"></div>
                        </div>
                    <div className="objects_list">
                        <ShelfItem text={"Лето 2023"}/>
                        <ShelfItem text={"Лето 2023"}/>
                        <ShelfItem text={"Лето 2023"}/>
                        <ShelfItem text={"Лето 2023"}/>
                        <AddShelfItem onClickFunc={()=>setShow(true)}/>
                        <CreateShelfPopup isShow={show} onClose={()=>setShow(false)}/>  
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Shelfs;