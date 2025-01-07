import { useLocation, useNavigate, useParams } from "react-router-dom"
import Navbar from "../../components/Navbar"
import BlueButton from "../../components/buttons/BlueButton"
import DarkBlueButton from "../../components/buttons/DarkBlueButton"
import ShelfItem from "../../components/items/ShelfItem"
import Footer from "../../components/Footer"
import AddShelfItem from "../../components/items/AddShelfItem"
import { useContext, useEffect, useState } from "react"
import CreateShelfPopup from "../../components/popups/CreateShelfPopup"
import { Context } from "../.."
import { PATHS } from "../../router"
import Loading from "../../components/Loading"

const Shelfs=()=>{
    const navigate=useNavigate()
    const {store}=useContext(Context)
    const param =useParams()
    const location=useLocation()
    const [show,setShow]=useState(false)
    const [owner,setOwner]=useState(false)
    const [shelfs,setShelfs]=useState([])
    const [wait,setWait]=useState(false)
    useEffect(() => {
        const fetchData=async()=>{
            try{
                setWait(true)
                if(location.pathname==PATHS.MYSHELFS){
                    setOwner(true)
                    const res=await store.getMyShelfs();
                    setShelfs(res)
                }else{
                    const res=await store.getStudentShelfs(param.id);
                    setShelfs(res)
                }
        }catch(e){
            console.log(e)
        }finally{
            setWait(false)
        }
    }
    fetchData()
      },[]);

    if(wait){
        return <Loading/>
    }
    return(
        <div className="classes">
            <Navbar/>
            <div className="pagecontainer">
                <div className="classes_list">
                        <div className="list_title">
                        <div className="list_title_row">
                            <div className="list_title_text">Мои полки</div>
                            <div className="list_title_btns">
                                <BlueButton onClickFunc={()=>navigate(-1)} btnText={"Назад"}/>
                                {owner&&<DarkBlueButton onClickFunc={1} btnText={"Добавить"}/>}
                            </div>
                        </div>
                        <div className="just_line"></div>
                        </div>
                    <div className="objects_list">
                       {shelfs.map(k=>
                        <ShelfItem shelf={k} key={k.id}/>
                       )}
                        {owner&&<AddShelfItem onClickFunc={()=>setShow(true)}/>}
                        <CreateShelfPopup isShow={show} onClose={()=>setShow(false)}/> 
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Shelfs;