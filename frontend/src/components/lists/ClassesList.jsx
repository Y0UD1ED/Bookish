import DarkBlueButton from "../buttons/DarkBlueButton";
import LogInClassItem from "../items/LogInClassItem";
import RoundItem from "../items/RoundItem";

const ClassesList=()=>{
    return(
        <div className="classes_list">
            <div className="list_title">
                <div className="list_title_row">
                    <div className="list_title_text">Мои классы</div>
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
                <LogInClassItem/>
            </div>
        </div>
    )
}

export default ClassesList;