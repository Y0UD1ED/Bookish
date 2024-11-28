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
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda omnis incidunt quaerat dicta voluptate repudiandae quisquam repellendus totam, sequi, quis distinctio voluptatibus dolores cumque mollitia nam blanditiis minima nesciunt velit?
            </div>
        </div>
    )
}

export default TextItem