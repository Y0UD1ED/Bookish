import DarkBlueButton from "../buttons/DarkBlueButton";
import ProgressItem from "../items/ProgressItem";

const ProgressList=()=>{
    return(
        <div className="progress_list">
            <div className="progress_list_title">
                <div className="list_title_row">
                    <div className="list_title_text">Прогресс класса</div>
                    <div className="list_title_btns">
                        <DarkBlueButton onClickFunc={1} btnText={"Показать все"}/>
                    </div>
                </div>
                <div className="just_line"></div>
            </div>
            <div className="objects_list">
            <ProgressItem progressText={"Прочитали все книги"}/>
            <ProgressItem progressText={"Не прочли ни одной книги"}/>
            <ProgressItem progressText={"Средний процент прочитанных книг"}/>
            <ProgressItem progressText={"Макс. процент прочитанных книг"}/>
            <ProgressItem progressText={"Мин. процент прочитанных книг"}/>
            </div>
        </div>
    )
}

export default ProgressList;