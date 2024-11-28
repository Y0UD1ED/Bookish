import DarkBlueButton from "../buttons/DarkBlueButton";
import StudentItem from "../items/StudentItem";

const StudentsList=({useBtns})=>{
    return(
        <div className="students_list">
            <div className="list_title">
                <div className="list_title_row">
                    <div className="list_title_text">Ученики</div>
                    <div className="list_title_btns">
                        {useBtns&&(<DarkBlueButton onClickFunc={1} btnText={"Показать все"}/>)}
                    </div>
                </div>
                <div className="just_line"></div>
            </div>
            <div className="objects_list">
                <StudentItem text={"Фамилия Имя"}/>
                <StudentItem text={"Фамилия Имя"}/>
                <StudentItem text={"Фамилия Имя"}/>
                <StudentItem text={"Фамилия Имя"}/>
            </div>
        </div>
    )
}

export default StudentsList;