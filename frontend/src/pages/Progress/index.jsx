import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import BlueButton from "../../components/buttons/BlueButton";
import Footer from "../../components/Footer"
import Navbar from "../../components/Navbar"
import "./styles.css"
import StudentsList from "../../components/lists/StudentsList";
import { useContext, useEffect, useState } from "react";
import { Context } from "../..";
import Loading from "../../components/Loading";

const Progress=()=>{
    const { pathname } = useLocation();
    const param=useParams()
    const query=new URLSearchParams(window.location.search)
    const {store}=useContext(Context)
    const navigate=useNavigate()
    const [wait,setWait]=useState(false)
    const [progress,setProgress]=useState({"progress":0,"students":[]})
    const [title,setTitle]=useState("")
    let color="#22D670"
    if(progress.progress<25){
        color="#D62222"
    }
    else if(progress.progress<75){
        color="#FFB33A"
    }
    const progressStyle={
        background: 
                `radial-gradient(closest-side, white 69%, transparent 70% 100%), conic-gradient(${color} ${progress.progress}%, #D9D9D9 0)`
    };
   
    useEffect(() => {
        window.scrollTo(0,0);
        const fetchData=async()=>{
            try{
                setWait(true)
                console.log(param)
                switch(query.get("type")){
                    case "all": setTitle("Прочли все книги");
                    break;
                    case "nothing":setTitle("Прочли ни одной книги");
                    break;
                    case "avg":setTitle("Среднее количество книг");
                    break;
                    case "min":setTitle("Минимальное количество прочитанных книг");
                    break;
                    case "max":setTitle("Максимальное количество прочитанных книг");
                    break;
                    case "have_read":setTitle("Прочли книгу")
                    break
                    case "is_reading":setTitle("Читают книгу");
                    break;
                    case "want_to_read":setTitle("Планируют прочитать")
                    break;
                    default: break;
                }
                console.log(query.get("type"))
                if(query.has("book")){
                    const res=await store.getBookProgress(param.id,query.get("type"),query.get("book"))
                    setProgress(res)
                    return;
                }
                const res=await store.getClassProgress(param.id,query.get("type"));
                setProgress(res)
        }catch(e){
            console.log(e)
        }finally{
            setWait(false)
        }
           
            //console.log(shelf)
    }
    fetchData()
      }, [pathname]);
    
    if(wait){
        return <Loading/>
    }
    return(
        <div className="one_progress">
            <Navbar/>
            <div className="pagecontainer">
            <div className="list_title">
                <div className="list_title_row">
                    <div className="list_title_text">Прогресс класса</div>
                    <div className="list_title_btns">
                       <BlueButton btnText={"Назад"} onClickFunc={()=>navigate(-1)}/>
                    </div>
                </div>
                <div className="just_line"></div>
            </div>
            <div className="progress_big_item">
                <div className="progress_item_row">
                    <div className="progress_item_circle">
                        <div class="progress-bar_big" style={progressStyle}>{progress.progress}%</div>
                    </div>
                    <div className="progress_item_big_name">{title}</div>
                </div>
        </div>
        {query.get("type")!="avg"&&<StudentsList students={progress.students}/>}
            </div>
            <Footer/>
        </div>
    )
}

export default Progress;