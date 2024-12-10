const LogInClassItem=({onClickFunc})=>{
    return(
        <div className="round_item" onClick={()=>{onClickFunc()}}>
            <div className="round_item_col">
                <div className="round_item_img">
                    <img src="/logInRoundItem.svg" alt="" />
                </div>
                <div className="round_item_name">{"Добавиться в класс"}</div>
            </div>
        </div>
    )
}

export default LogInClassItem;