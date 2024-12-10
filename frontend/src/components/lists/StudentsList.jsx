import DarkBlueButton from "../buttons/DarkBlueButton";
import StudentItem from "../items/StudentItem";

const StudentsList=({useBtns,students,onClickFunc})=>{
    return(
        <div className="students_list">
            <div className="list_title">
                <div className="list_title_row">
                    <div className="list_title_text">Ученики</div>
                    <div className="list_title_btns">
                        {useBtns&&(<DarkBlueButton onClickFunc={()=>onClickFunc()} btnText={"Показать все"}/>)}
                    </div>
                </div>
                <div className="just_line"></div>
            </div>
            <div className="objects_list">
               {students.map(k=>
                <StudentItem student={k} key={k.id}/>
               )}
            </div>
        </div>
    )
}

export default StudentsList;