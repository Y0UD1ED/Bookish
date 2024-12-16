import { observer } from "mobx-react";
import {useRef } from "react";

const EditTextItem=({title,text,onTextChange})=>{
    const textareaRef = useRef(null);

    const onTextChangeFunc = (value) => {
        onTextChange(value)
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'; // Сбрасываем высоту
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Устанавливаем высоту в зависимости от содержимого
        }
    };
    return(
        <div className="edit_text_item">
              <div className="list_title">
                <div className="list_title_row">
                    <div className="list_title_text">{title}</div>
                </div>
                <div className="just_line"></div>
            </div>
            <textarea className="edit_text_item_txt"
                ref={textareaRef}
                onChange={(e)=>onTextChangeFunc(e.target.value)}
                value={text}
                />
        </div>
    )
}

export default observer(EditTextItem)