import { useNavigate } from "react-router-dom"

const ShelfItem=({text})=>{
    const defImg="/defaultObjectImg.svg"
    const route="/shelfs/1"
    const navigate=useNavigate()
    return(
        <div className="round_item" onClick={()=>navigate(route)}>
            <div className="round_item_col">
                <div className="round_item_img">
                    <img src={defImg} alt="" />
                </div>
                <div className="round_item_name">{text}</div>
            </div>
        </div>
    )
}

export default ShelfItem;