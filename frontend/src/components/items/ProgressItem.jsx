import { useState } from "react";
import { Link } from "react-router-dom";
import { PATHS } from "../../router";


const ProgressItem=({progressText,progressValue,onClickFunc})=>{
    const [isHover,setIsHover]=useState(false)
    let color="#22D670"
    if(progressValue<25){
        color="#D62222"
    }
    else if(progressValue<75){
        color="#FFB33A"
    }
    const progressStyle={
        background: 
                isHover?`radial-gradient(closest-side, #E3EDFF 69%, transparent 70% 100%), conic-gradient(${color} ${progressValue}%, #D9D9D9 0)`:
                `radial-gradient(closest-side, white 69%, transparent 70% 100%), conic-gradient(${color} ${progressValue}%, #D9D9D9 0)`
    };
    return(
        <div className="progress_item" onMouseEnter={()=>setIsHover(true)} onMouseLeave={()=>setIsHover(false)}>
                <div className="progress_item_col" onClick={()=>onClickFunc()}>
                    <div className="progress_item_circle">
                        <div class="progress-bar" style={progressStyle}>{progressValue} %</div>
                    </div>
                    <div className="progress_item_name">{progressText}</div>
                </div>
        </div>
    )
}

export default ProgressItem;