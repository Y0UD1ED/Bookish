import { useNavigate } from "react-router-dom"
import { PATHS } from "../../router"


const ClassItem=({oneClass})=>{
    const defImg="/defaultClassImage.png"
    const navigate=useNavigate()
    return(
        <div className="round_item" onClick={()=>navigate(PATHS.CLASS.replace(":id",oneClass.id))}>
            <div className="round_item_col">
                <div className="round_item_img">
                    <img src={defImg} alt="" />
                </div>
                <div className="round_item_name">{oneClass.name}</div>
            </div>
        </div>
    )
}

export default ClassItem;