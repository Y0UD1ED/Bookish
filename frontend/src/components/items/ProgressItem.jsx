import { useState } from "react";
import { Link } from "react-router-dom";
import { PATHS } from "../../router";


const ProgressItem=({progressText})=>{
    const [isHover,setIsHover]=useState(false)
    const progressStyle={
        background: 
                isHover?'radial-gradient(closest-side, #E3EDFF 69%, transparent 70% 100%), conic-gradient(#22D670 75%, #D9D9D9 0)':
                'radial-gradient(closest-side, white 69%, transparent 70% 100%), conic-gradient(#22D670 75%, #D9D9D9 0)'
    };
    return(
        <div className="progress_item" onMouseEnter={()=>setIsHover(true)} onMouseLeave={()=>setIsHover(false)}>
            <Link to={PATHS.PROGRESS}>
                <div className="progress_item_col">
                    <div className="progress_item_circle">
                        <div class="progress-bar" style={progressStyle}>75%</div>
                    </div>
                    <div className="progress_item_name">{progressText}</div>
                </div>
            </Link>
        </div>
    )
}

export default ProgressItem;