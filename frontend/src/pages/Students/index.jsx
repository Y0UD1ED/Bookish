import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import BlueButton from "../../components/buttons/BlueButton";
import ClassMemberItem from "../../components/items/ClassMemberItem";
import "./styles.css"
import { Context } from "../..";
import { useContext, useEffect, useState } from "react";
import Loading from "../../components/Loading";

const Students=()=>{
    const navigate=useNavigate()
    const param=useParams()
    const {store}=useContext(Context)
    const [students,setStudents]=useState([])
    const [wait,setWait]=useState(false)
    useEffect(() => {
        const fetchData=async()=>{
            try{
                setWait(true)
                const res=await store.getClassMembersById(param.id);
                setStudents(res)
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
        <div className="students">
            <Navbar/>
            <div className="pagecontainer">
            <div className="student_list">
                        <div className="list_title">
                        <div className="list_title_row">
                            <div className="list_title_text">Ученики</div>
                            <div className="list_title_btns">
                                <BlueButton onClickFunc={()=>navigate(-1)} btnText={"Назад"}/>
                            </div>
                        </div>
                        <div className="just_line"></div>
                        </div>
                    <div className="member_list">
                       {students.map(k=>
                        <ClassMemberItem student={k} key={k.id}/>
                       )}
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Students;