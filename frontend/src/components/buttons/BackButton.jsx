const BackButton=({onClickFunc})=>{
    return(
        <p className="back_btn" onClick={()=>onClickFunc()}>Назад</p>
    )
}

export default BackButton;