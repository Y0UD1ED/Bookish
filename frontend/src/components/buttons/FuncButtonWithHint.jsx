const FuncButtonWithHint=({onClickFunc,btnText})=>{
    return(
        <div className="func_hint_btn" onClick={()=>onClickFunc()}><p>{btnText}</p>
        <div className="hint_img">
            <img src="hint.svg" alt="" />
        </div>
        </div>
    )
}

export default FuncButtonWithHint;