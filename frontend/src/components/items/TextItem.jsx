const TextItem=({title,text})=>{
    return(
        <div className="text_item">
              <div className="list_title">
                <div className="list_title_row">
                    <div className="list_title_text">{title}</div>
                </div>
                <div className="just_line"></div>
            </div>
            <div className="text_item_txt">
                {text}    
            </div>
        </div>
    )
}

export default TextItem