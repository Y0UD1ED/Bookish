

const FuncButton=({onClickFunc,btnText})=>{
    
    return(
        <p className="func_btn" onClick={()=>onClickFunc()}>{btnText}</p>
    )
}

export default FuncButton;