
const DeleteButton=({onClickFunc,btnText})=>{
    return(
        <div className="delete_button" onClick={()=>{onClickFunc()}}>
            {btnText}
        </div>
    )
}

export default DeleteButton;