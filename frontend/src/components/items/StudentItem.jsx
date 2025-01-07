import { useNavigate } from "react-router-dom"
import { API_URL } from "../../api/api"
import { PATHS } from "../../router"


const StudentItem=({student})=>{
    const navigate=useNavigate()
    return(
        <div className="round_item" onClick={()=>navigate(PATHS.USER.replace(":id",student.id))}>
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