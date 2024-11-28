import { useNavigate } from "react-router-dom";
import BlueButton from "./buttons/BlueButton";
import DarkBlueButton from "./buttons/DarkBlueButton";
import DeleteButton from "./buttons/DeleteButton";
import TextItem from "./items/TextItem";
import DeletePersonalBookPopup from "./popups/DeletePersonalBookPopup";
import ModerationDecisionPopup from "./popups/ModerationDecisionPopup";
import { useState } from "react";
import EditTextItem from "./items/EditTextItem";

const EditNote=({onSave,onClose})=>{
    const navigate=useNavigate()
    const [show,setShow]=useState(false)
    const [del,setDel]=useState(false)
    return(
        <div className="edit_note">
            <div className="list_title">
                        <div className="list_title_row">
                            <div className="list_title_text">Читательский дневник</div>
                            <div className="list_title_btns">
                                <BlueButton onClickFunc={()=>onClose()} btnText={"Назад"}/>
                                <DarkBlueButton onClickFunc={()=>onSave()} btnText={"Сохранить"}/>
                            </div>
                        </div>
                        <div className="just_line"></div>
                </div>
                <div className="note_info">
                    <div className="note_info_raw">
                        <div className="note_info_img">
                            <img src="/bookImage.svg" alt="" />
                        </div>
                        <div className="note_info_text">
                            <div className="note_info_text_raw">
                                <input type="text" placeholder="Название книги"/>
                                <input type="text" placeholder="Автор" />
                            </div>
                            <label className="note_info_property">Статус:
                                <select name="" id="">
                                    <option value="gfg1">GfG1</option>
                                    <option value="gfg2">GfG2</option>
                                    <option value="gfg3">GfG3</option>
                                    <option value="gfg4">GfG4</option>
                                </select>
                            </label>
                            <label className="note_info_property">Жанр:
                                <select name="" id="">
                                    <option value="gfg1">GfG1</option>
                                    <option value="gfg2">GfG2</option>
                                    <option value="gfg3">GfG3</option>
                                    <option value="gfg4">GfG4</option>
                                </select>
                            </label>
                            <label className="note_info_property">Дата начала чтения:
                                <input type="date" name="" id="" />
                            </label>
                            <label className="note_info_property">Дата окончания чтения:
                               <input type="date" name="" id="" />
                            </label>
                        </div>
                    </div>
                </div>
                <EditTextItem title={"Главные герои"}/>
                <EditTextItem title={"Сюжет"}/>
                <EditTextItem title={"Основная мысль"}/>
                <EditTextItem title={"Мнение"}/>
                <ModerationDecisionPopup isShow={show} onClose={()=>setShow(false)}/>
                <DeletePersonalBookPopup isShow={del} onClose={()=>setDel(false)}/>
        </div>
    )
}

export default EditNote;