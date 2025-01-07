import { useNavigate } from "react-router-dom";
import BlueButton from "./buttons/BlueButton";
import DarkBlueButton from "./buttons/DarkBlueButton";
import DeleteButton from "./buttons/DeleteButton";
import TextItem from "./items/TextItem";
import DeletePersonalBookPopup from "./popups/DeletePersonalBookPopup";
import ModerationDecisionPopup from "./popups/ModerationDecisionPopup";
import { useState } from "react";
import { API_URL } from "../api/api";

const DefaultNote=({note,onClickFunc})=>{
    const navigate=useNavigate()
    const [show,setShow]=useState(false)
    const [del,setDel]=useState(false)
    note=note==undefined?{name:"null"}:note
  
    return(
        <div className="default_note">
            <div className="list_title">
                        <div className="list_title_row">
                            <div className="list_title_text">Читательский дневник</div>
                            <div className="list_title_btns">
                                <DeleteButton btnText={"Удалить"} onClickFunc={()=>setDel(true)}/>
                                <BlueButton onClickFunc={()=>navigate(-1)} btnText={"Назад"}/>
                                <DarkBlueButton onClickFunc={()=>onClickFunc()} btnText={"Изменить"}/>
                            </div>
                        </div>
                        <div className="just_line"></div>
                </div>
                <div className="note_info">
                    <div className="note_info_raw">
                        <div className="note_info_img">
                            <img src={API_URL+"/images/"+note.image||"/bookImage.svg"} alt="" />
                        </div>
                        <div className="note_info_text">
                            <div className="note_info_text_raw">
                                <div className="note_info_name">{note.name}</div>
                                <div className="note_info_author">{note.author}</div>
                            </div>
                            <div className="note_info_property">{"Статус: "+note.readingStatus}</div>
                            <div className="note_info_property">{"Жанр: "+note.genre}</div>
                            <div className="note_info_property">{"Дата начала чтения: "+note.startDate}</div>
                            <div className="note_info_property">{"Дата окончания чтения: "+note.endDate}</div>
                            {!note.moderationPassed&&<div className="note_info_warning">
                                <div className="note_info_warning_raw">
                                <div className="note_info_warning_img" onClick={()=>setShow(true)}>
                                    <img src="/warning.svg" alt="" />
                                </div>
                                <div className="note_info_warning_txt">
                                    не прошло модерацию
                                </div>
                                <div className="note_info_warning_hint_img">
                                    <img src="/hint.svg" alt="" />
                                </div>
                                </div>
                                
                            </div>}
                        </div>
                    </div>
                </div>
                <TextItem title={"Главные герои"} text={note.heroes}/>
                <TextItem title={"Сюжет"} text={note.plot}/>
                <TextItem title={"Основная мысль"} text={note.message}/>
                <TextItem title={"Мнение"} text={note.opinion}/>
                <ModerationDecisionPopup isShow={show} onClose={()=>setShow(false)}/>
                <DeletePersonalBookPopup isShow={del} onClose={()=>setDel(false)}/>
        </div>
    )
}

export default DefaultNote;