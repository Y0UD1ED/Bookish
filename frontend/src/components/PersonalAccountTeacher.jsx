import { useLocation, useNavigate } from "react-router-dom"
import { PATHS } from "../router"
import BlueButton from "./buttons/BlueButton"
import DeleteButton from "./buttons/DeleteButton"
import ClassesList from "./lists/ClassesList"
import { useContext, useEffect, useState } from "react"
import { Context } from ".."
import { observer } from "mobx-react"

const PersonalAccountTeacher=({data})=>{
    const { store } = useContext(Context);
    const navigate=useNavigate()
    const [classes,setClasses]=useState([])
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0,0);
        setClasses(data.myClasses)
      }, [pathname]);

    return(
        <div className="personal_account_stud">
            <div className="lists_row">
                <div className="object_container">
                    <div className="object_row">
                        <div className="object_info">
                            <div className="object_img">
                                <img src="defaultObjectImg.svg" alt="" />
                            </div>
                            <div className="object_text">
                                <div className="object_name">{store.user.name}</div>
                                <div className="object_about">{store.user.about||"О себе"}</div>
                            </div>
                        </div>
                        <div className="object_btns">
                            <div className="object_btns_col">
                                <BlueButton btnText={'Редактировать профиль'} onClickFunc={()=>navigate(PATHS.EDIT_ACCOUNT)}/>
                                    <div className="delete_wrapper">
                                    <DeleteButton btnText={'Выйти'} onClickFunc={()=>navigate(PATHS.MAIN)}/>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ClassesList classes={classes} onClickFunc={()=>navigate(PATHS.MYCLASSES)}/>
            </div>
           
        </div>
    )
}

export default observer(PersonalAccountTeacher)