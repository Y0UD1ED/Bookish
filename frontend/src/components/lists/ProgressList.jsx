import { useNavigate } from "react-router-dom";
import ProgressItem from "../items/ProgressItem";
import { PATHS } from "../../router";

const ProgressList=({all,nothing,avg,max,min,classId})=>{
    const navigate=useNavigate()
    return(
        <div className="progress_list">
            <div className="progress_list_title">
                <div className="list_title_row">
                    <div className="list_title_text">Прогресс класса</div>
                </div>
                <div className="just_line"></div>
            </div>
            <div className="objects_list">
            <ProgressItem progressText={"Прочитали все книги"} progressValue={all} onClickFunc={()=>navigate(PATHS.PROGRESS.replace(":id",classId)+"?type=all")}/>
            <ProgressItem progressText={"Не прочли ни одной книги"} progressValue={nothing} onClickFunc={()=>navigate(PATHS.PROGRESS.replace(":id",classId)+"?type=nothing")}/>
            <ProgressItem progressText={"Средний процент прочитанных книг"} progressValue={avg} onClickFunc={()=>navigate(PATHS.PROGRESS.replace(":id",classId)+"?type=avg")}/>
            <ProgressItem progressText={"Макс. процент прочитанных книг"} progressValue={max} onClickFunc={()=>navigate(PATHS.PROGRESS.replace(":id",classId)+"?type=max")}/>
            <ProgressItem progressText={"Мин. процент прочитанных книг"} progressValue={min} onClickFunc={()=>navigate(PATHS.PROGRESS.replace(":id",classId)+"?type=min")}/>
            </div>
        </div>
    )
}

export default ProgressList;