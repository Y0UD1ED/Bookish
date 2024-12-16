import { useNavigate } from "react-router-dom";
import BlueButton from "./buttons/BlueButton";
import DarkBlueButton from "./buttons/DarkBlueButton";
import DeleteButton from "./buttons/DeleteButton";
import TextItem from "./items/TextItem";
import DeletePersonalBookPopup from "./popups/DeletePersonalBookPopup";
import ModerationDecisionPopup from "./popups/ModerationDecisionPopup";
import { useContext, useRef, useState } from "react";
import EditTextItem from "./items/EditTextItem";
import { format } from 'date-fns'
import ImageModal from "./ImageModal";
import { observer } from "mobx-react";
import { Context } from "..";
import { API_URL } from "../api/api";
import ErrorPopup from "./popups/ErrorPopup";

const EditNote=({note,onClose})=>{
    const navigate=useNavigate()
    const statusOptions=[
        {value: "планирую читать",text:"планирую читать"},
        {value: "читаю",text:"читаю"},
        {value: "прочитал",text:"прочитал"},
    ]
    const [name,setName]=useState(note.name||"")
    const [author,setAuthor]=useState(note.author||"")
    const [image,setImage]=useState(note.image||"")
    const [readingStatus,setReadingStatus]=useState(statusOptions.find(o=>o.value==note.readingStatus).value||statusOptions[0].value)
    const [genre,setGenre]=useState(note.genre||"")
    const [heroes,setHeroes]=useState(note.heroes||"")
    const [plot,setPlot]=useState(note.plot||"")
    const [bookMessage,setBookMessage]=useState(note.message||"")
    const [opinion,setOpinion]=useState(note.opinion||"")
    const [startDate,setStartDate]=useState(convertDateFormat(note.startDate)||"-")
    const [endDate,setEndDate]=useState(convertDateFormat(note.endDate)||"-")
    const [show,setShow]=useState(false)
    const [del,setDel]=useState(false)
    const [file,setFile]=useState(null)
    const [wait,setWait]=useState(false)
    const {store}=useContext(Context)

    function convertDateFormat(dateString) {
        // Разбиваем строку на части
        const parts = dateString.split('.');
        // Проверяем, что у нас есть три части (день, месяц, год)
        if (parts.length === 3) {
            const day = parts[0];
            const month = parts[1];
            const year = parts[2];
            // Формируем новую строку в формате "yyyy-MM-dd"
            return `${year}-${month}-${day}`;
        }
        // Если формат неверный, возвращаем null или выбрасываем ошибку
        return null;
    }

    const handleChange = event => {
        console.log(new Date(startDate))
        console.log(format(startDate,"dd.MM.yyyy"))
        setReadingStatus(event.target.value)
      };

    const [src, setSrc] = useState(null);
          
            // preview
            const [preview, setPreview] = useState(API_URL+"/images/"+note.image||null);
          
            // modal state
            const [modalOpen, setModalOpen] = useState(false);
          
            // ref to control input element
            const inputRef = useRef(null);
          
            // handle Click
            const handleInputClick = (e) => {
              e.preventDefault();
              inputRef.current.click();
            };
            // handle Change
            const handleImgChange = (e) => {
                if(e.target.files[0]){
                    setSrc(URL.createObjectURL(e.target.files[0]));
                    setModalOpen(true);
                }
            };
    
    const updateNote=async()=>{
        try{
            setWait(true)
            console.log(heroes)
            await store.updateNote(note.id,name,author,readingStatus,genre,startDate,endDate,heroes,plot,bookMessage,opinion,image,file)
        }catch(e){
            console.log(e)
        }finally{
            if(!store.isError){
                window.location.reload()
            }
            setWait(false)
        }
    }            


    return(
        <div className="edit_note">
            <ErrorPopup isShow={store.isError} onClose={()=>store.setIsError(false)} error={store.errorMessage}/>
            <div className="list_title">
                        <div className="list_title_row">
                            <div className="list_title_text">Читательский дневник</div>
                            <div className="list_title_btns">
                                <BlueButton onClickFunc={()=>onClose()} btnText={"Назад"}/>
                                <DarkBlueButton onClickFunc={()=>updateNote()} btnText={"Сохранить"}/>
                            </div>
                        </div>
                        <div className="just_line"></div>
                </div>
                <div className="note_info">
                    <div className="note_info_raw">
                        <div className="note_info_img">
                            <ImageModal
                                    modalOpen={modalOpen}
                                    src={src}
                                    setPreview={setPreview}
                                    setModalOpen={setModalOpen}
                                    setFile={setFile}
                                />
                            <img src={
                                    preview ||
                                    "/bookImage.svg"
                                } alt="" />
                            <div className="image_cropper">
                        <a href="/" onClick={handleInputClick}>
                            </a>
                            <label class="input-file">
                                <input
                                    type="file"
                                    className="file"
                                    accept="image/*"
                                    ref={inputRef}
                                    onChange={handleImgChange}
                                />		
                                <span  style={{padding:"10px 50px"}}>Изменить фото</span>
 	                        </label>
                        </div>
                        </div>
                        <div className="note_info_text">
                            <div className="note_info_text_raw">
                                <input type="text"
                                    onChange={(e)=>setName(e.target.value)}
                                    value={name}
                                    placeholder="Название книги"/>
                                <input type="text"
                                    onChange={(e)=>setAuthor(e.target.value)}
                                    value={author}
                                    placeholder="Автор" />
                            </div>
                            <label className="note_info_property">Статус:
                            <select value={readingStatus} onChange={handleChange} className="note_info_property_selector">
                                {statusOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.text}
                                </option>
                                ))}
                            </select>
                            </label>
                            <label className="note_info_property">Жанр:
                                <input
                                    onChange={(e)=>setGenre(e.target.value)}
                                    value={genre}
                                    placeholder="Жанр"/>
                            </label>
                            <label className="note_info_property">Дата начала чтения:
                                <input type="date"
                                    onChange={(e)=>setStartDate(e.target.value)}
                                    value={startDate}
                                 />
                            </label>
                            <label className="note_info_property">Дата окончания чтения:
                               <input type="date"
                                    onChange={(e)=>setEndDate(e.target.value)}
                                    value={endDate}
                                />
                            </label>
                        </div>
                    </div>
                </div>
                <EditTextItem title={"Главные герои"} text={heroes} onTextChange={setHeroes}/>
                <EditTextItem title={"Сюжет"} text={plot} onTextChange={setPlot}/>
                <EditTextItem title={"Основная мысль"} text={bookMessage} onTextChange={setBookMessage}/>
                <EditTextItem title={"Мнение"} text={opinion} onTextChange={setOpinion}/>
                <ModerationDecisionPopup isShow={show} onClose={()=>setShow(false)}/>
                <DeletePersonalBookPopup isShow={del} onClose={()=>setDel(false)} note={note}/>
        </div>
    )
}

export default observer(EditNote);