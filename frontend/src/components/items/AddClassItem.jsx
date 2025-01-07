const AddClassItem=({onClickFunc})=>{
    return(
        <div className="round_item" onClick={()=>{onClickFunc()}}>
            <div className="round_item_col">
                <div className="round_item_img">
                    <img src="/addRoundItem.svg" alt="" />
                </div>
                <div className="round_item_name">{"Добавить класс"}</div>
            </div>
        </div>
    )
}

export default AddClassItem;