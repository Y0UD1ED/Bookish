const BlueButton=({onClickFunc,btnText})=>{
    return(
        <div className="blue_button" onClick={()=>{onClickFunc()}}>
            {btnText}
        </div>
    )
}

export default BlueButton;