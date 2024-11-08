const DarkBlueButton=({onClickFunc,btnText})=>{
    return(
        <div className="darkblue_button" onClick={()=>onClickFunc()}>
            {btnText}     
        </div>
    )
}

export default DarkBlueButton;