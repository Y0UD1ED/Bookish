import DarkBlueButton from "../buttons/DarkBlueButton";
import RoundItem from "../items/RoundItem";

const StudentsList=()=>{
    return(
        <div className="students_list">
            <div className="list_title">
                <div className="list_title_row">
                    <div className="list_title_text">Ученики</div>
                    <div className="list_title_btns">
                        <DarkBlueButton onClickFunc={1} btnText={"Показать все"}/>
                    </div>
                </div>
                <div className="just_line"></div>
            </div>
            <div className="objects_list">
                <RoundItem/>
                <RoundItem/>
                <RoundItem/>
                <RoundItem/>
            </div>
        </div>
    )
}

export default StudentsList;