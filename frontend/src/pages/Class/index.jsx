import BlueButton from "../../components/buttons/BlueButton";
import DeleteButton from "../../components/buttons/DeleteButton";
import Footer from "../../components/Footer";
import ImportantBooksList from "../../components/lists/ImportantBooksList";
import Navbar from "../../components/Navbar";
import ProgressList from "../../components/lists/ProgressList";
import StudentsList from "../../components/lists/StudentsList";
import '../Class/styles.css'
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import LogoutFromClassPopup from "../../components/popups/LogoutFromClassPopup";
import { PATHS } from "../../router";
import { Context } from "../..";
import Loading from "../../components/Loading";

const Class=()=>{
    const { pathname } = useLocation();
    const param=useParams()
    const {store}=useContext(Context)
    const navigate=useNavigate()
    const [exit,setExit]=useState(false)
    const [wait,setWait]=useState(false)
    const [oneClass,setClass]=useState({"allRead":0,
        "avgRead":0,
        "books":[], 
        "code": "none",
        "id": 0,
        "image":"/defaultClassImage.png",
        "maxRead":0,
        "minRead": 0,
        "name": "none",
        "nothingRead":0,
        "studentCount":0,
        "students":[]})
    useEffect(() => {
        window.scrollTo(0,0);
        const fetchData=async()=>{
           try{
            setWait(true)
            const res=await store.getClassById(param.id);
            res.books=res.books.slice(0,5)
            res.students=res.students.slice(0,5)
            setClass(res)
           }catch(e){
            console.log(e)
           }finally{
            setWait(false)
           }
    }
    fetchData()
      }, [pathname]);
    
    if(wait){
        return <Loading/>
    }
    return(
        <div className="one_class">
            <Navbar/>
            <div className="pagecontainer">
            <div className="lists_row">
                <div className="object_container">
                    <div className="object_row">
                        <div className="object_info">
                            <div className="object_img">
                                <img src="/defaultObjectImg.svg" alt="" />
                            </div>
                            <div className="object_text">
                                <div className="object_name">{oneClass.name}</div>
                                <div className="object_about">{oneClass.studentCount} учеников</div>
                                <div className="object_copyboard">
                                    <div className="object_about">Код для добавления:</div>
                                    <div className="object_copy_code">
                                        {oneClass.code}
                                    </div>
                                    <div className="object_copy_img">
                                            <img src="/copy.svg" alt="" />
                                    </div>    
                                </div>
                                
                                <DeleteButton btnText={'Выйти из класса'} onClickFunc={()=>setExit(true)}/>
                            </div>
                        </div>
                        <div className="object_btns">
                            <div className="object_btns_col">
                                <BlueButton btnText={'Назад'} onClickFunc={()=>navigate(-1)}/>
                            </div>
                        </div>
                    </div>
                </div>
                <ProgressList all={oneClass.allRead} nothing={oneClass.nothingRead} avg={oneClass.avgRead} min={oneClass.minRead} max={oneClass.maxRead} classId={oneClass.id}/>
                <ImportantBooksList books={oneClass.books} onClickFunc={()=>navigate(PATHS.BOOKSPROGRESS.replace(":id",oneClass.id))}/>
                <StudentsList useBtns={true } students={oneClass.students} onClickFunc={()=>navigate(PATHS.STUDENTS.replace(":id",param.id))}/>
                <LogoutFromClassPopup isShow={exit} onClose={()=>setExit(false)}/>
            </div>
    
            </div>
            <Footer/>
        </div>
    )
}

export default Class;
