import { useNavigate } from "react-router-dom"
import { PATHS } from "../../router"

const ShelfItem=({shelf})=>{
    const defImg="/defaultObjectImg.svg"
    const navigate=useNavigate()
    return(
        <div className="round_item" onClick={()=>navigate(PATHS.SHELF.replace(":id",shelf.id))}>
            <div className="round_item_col">
                <div className="round_item_img">
                    <img src={defImg} alt="" />
                </div>
                <div className="round_item_name">{shelf.name}</div>
            </div>
        </div>
    )
}

export default ShelfItem;