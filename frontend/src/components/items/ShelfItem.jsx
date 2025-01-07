import { useNavigate } from "react-router-dom"
import { PATHS } from "../../router"
import { API_URL } from "../../api/api"

const ShelfItem=({shelf})=>{
    const navigate=useNavigate()
    return(
        <div className="round_item" onClick={()=>navigate(PATHS.SHELF.replace(":id",shelf.id))}>
            <div className="round_item_col">
                <div className="round_item_img">
                    <img src={API_URL+"/images/"+shelf.image||"/defaultShelfImage.png"} alt="" />
                </div>
                <div className="round_item_name">{shelf.name}</div>
            </div>
        </div>
    )
}

export default ShelfItem;