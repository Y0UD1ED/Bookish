import { useLocation, useNavigate, useParams } from "react-router-dom"
import Footer from "../../components/Footer"
import Navbar from "../../components/Navbar"
import BlueButton from "../../components/buttons/BlueButton"
import ClassesList from "../../components/lists/ClassesList"
import ShelfsList from "../../components/lists/ShelfsList"
import BooksList from "../../components/lists/BooksList"
import ImportantBooksList from "../../components/lists/ImportantBooksList"
import { API_URL } from "../../api/api"
import { PATHS } from "../../router"
import { useContext, useEffect, useState } from "react"
import Loading from "../../components/Loading"
import { Context } from "../.."

const User=()=>{
    const navigate=useNavigate()
    const param=useParams()
    const {pathname}=useLocation()
    const [user,setUser]=useState({"name":"none","image":"none","shelfs":[],"personalBooks":[],"importantBooks":[]})
    const [wait,setWait]=useState(false)
    const {store}=useContext(Context)
    useEffect(() => {
            window.scrollTo(0,0);
            const fetchData=async()=>{
               try{
                setWait(true)
                const res=await store.getStudentById(param.id);
                setUser(res)
               }catch(e){
                console.log(e)
               }finally{
                setWait(false)
               }
        }
        fetchData()
          }, [pathname]);

    if(wait){
        return <Loading/>
    }
        
    return(
        <div className="user">
            <Navbar/>
            <div className="pagecontainer">
            <div className="lists_row">
                <div className="object_container">
                    <div className="object_row">
                        <div className="object_info">
                            <div className="object_img">
                                <img src={API_URL+"/images/"+user.image||"defaultObjectImg.svg"} alt="" />
                            </div>
                            <div className="object_text">
                                <div className="object_name">{user.name}</div>
                                <div className="object_about">{user.about||"О себе"}</div>
                            </div>
                        </div>
                        <div className="object_btns">
                            <div className="object_btns_col">
                                <BlueButton btnText={'Назад'} onClickFunc={()=>navigate(-1)}/>
                            </div>
                        </div>
                    </div>
                </div>
                <ShelfsList shelfs={user.shelfs} onClickFunc={()=>navigate(PATHS.USERSHELFS.replace(":id",param.id))}/>
                <BooksList useAdd={false} btnText={"Показать все"} btnFunc={()=>navigate(PATHS.USERNOTES.replace(":id",param.id))} books={user.personalBooks}/>
                <ImportantBooksList books={user.importantBooks} onClickFunc={()=>navigate(PATHS.USERBOOKS.replace(":id",param.id))}/>
            </div>
           
            </div>
            <Footer/>
        </div>
    )
}

export default User