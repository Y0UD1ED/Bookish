import { useLocation, useNavigate } from "react-router-dom";
import BlueButton from "../../components/buttons/BlueButton";
import DarkBlueButton from "../../components/buttons/DarkBlueButton";
import Footer from "../../components/Footer";
import LogInClassItem from "../../components/items/LogInClassItem";
import ClassItem from "../../components/items/ClassItem";
import Navbar from "../../components/Navbar";
import LogInClassPopup from "../../components/popups/LogInClassPopup";
import { useContext, useEffect, useState } from "react";
import { PATHS } from "../../router";
import { Context } from "../..";
import Loading from "../../components/Loading";
import AddClassItem from "../../components/items/AddClassItem";
import AddClassPopup from "../../components/popups/AddClassPopup";

const Classes=()=>{
    const navigate=useNavigate()
    const {store}=useContext(Context)
    const location=useLocation()
    const role=localStorage.getItem("role")
    const [classes,setClasses]=useState([])
    const [wait,setWait]=useState(false)
    const [show,setShow]=useState(false)
    useEffect(() => {
        const fetchData=async()=>{
            try{
                setWait(true)
                if(location.pathname==PATHS.MYCLASSES){
                    const res=await store.getMyClasses();
                    setClasses(res)
                }
            }catch(e){
                console.log(e)
            }finally{
                setWait(false)
            }
    }
    fetchData()
      },[]);
    
    if(wait){
        return <Loading/>
    }
    return(
        <div className="classes">
            <Navbar/>
            <div className="pagecontainer">
                <div className="classes_list">
                        <div className="list_title">
                        <div className="list_title_row">
                            <div className="list_title_text">Мои классы</div>
                            <div className="list_title_btns">
                                <BlueButton onClickFunc={()=>navigate(-1)} btnText={"Назад"}/>
                                <DarkBlueButton onClickFunc={()=>setShow(true)} btnText={role=="student"&&"Войти в класс"||"Создать класс"}/>
                            </div>
                        </div>
                        <div className="just_line"></div>
                        </div>
                    <div className="objects_list">
                        {classes.map(k=>
                            <ClassItem oneClass={k} key={k.id}/>
                        )}
                        {role=="student"&&<LogInClassItem onClickFunc={()=>setShow(true)}/>}
                        {role=="student"&&<LogInClassPopup isShow={show} onClose={()=>setShow(false)}/>}
                        {role=="teacher"&&<AddClassItem onClickFunc={()=>setShow(true)}/>}
                        {role=="teacher"&&<AddClassPopup isShow={show} onClose={()=>setShow(false)}/>}
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Classes;