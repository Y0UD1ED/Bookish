const EditTextItem=({title,text})=>{
    return(
        <div className="edit_text_item">
              <div className="list_title">
                <div className="list_title_row">
                    <div className="list_title_text">{title}</div>
                </div>
                <div className="just_line"></div>
            </div>
            <textarea className="edit_text_item_txt">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda omnis incidunt quaerat dicta voluptate repudiandae quisquam repellendus totam, sequi, quis distinctio voluptatibus dolores cumque mollitia nam blanditiis minima nesciunt velit?
            </textarea>
        </div>
    )
}

export default EditTextItem