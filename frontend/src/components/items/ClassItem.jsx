import { useNavigate } from "react-router-dom"
import { PATHS } from "../../router"
import { API_URL } from "../../api/api"


const ClassItem=({oneClass})=>{
    const navigate=useNavigate()
    return(
        <div className="round_item" onClick={()=>navigate(PATHS.CLASS.replace(":id",oneClass.id))}>
            <div className="round_item_col">
                <div className="round_item_img">
                    <img src={API_URL+"/images/"+oneClass.image||"/defaultClassImage.png"} alt="" />
                </div>
                <div className="round_item_name">{oneClass.name}</div>
            </div>
        </div>
    )
}

export default ClassItem;