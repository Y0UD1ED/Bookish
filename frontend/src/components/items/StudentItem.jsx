import { useNavigate } from "react-router-dom"
import { API_URL } from "../../api/api"


const StudentItem=({student})=>{
    const defImg="/defaultClassImage.png"
    const route="/classes/1"
    const navigate=useNavigate()
    return(
        <div className="round_item" onClick={()=>navigate(route)}>
            <div className="round_item_col">
                <div className="round_item_img">
                    <img src={API_URL+"/images/"+student.image||"/defaultClassImage.png"} alt="" />
                </div>
                <div className="round_item_name">{student.name}</div>
            </div>
        </div>
    )
}

export default StudentItem;