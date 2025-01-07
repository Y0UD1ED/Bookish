import { useContext, useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar"
import PersonalAccountStud from "../../components/PersonalAccountStud";
import './styles.css'
import { Context } from "../..";
import { observer } from "mobx-react";
import PersonalAccountTeacher from "../../components/PersonalAccountTeacher";
import Loading from "../../components/Loading";

const PersonalAccount=()=>{
    const {store}=useContext(Context)
    const [data,setData]=useState({myClasses:[],myImportantBooks:[],myPersonalBooks:[],myShelfs:[]})
    const [wait,setWait]=useState(false)
    useEffect(() => {
        const fetchData=async()=>{
            try{
                setWait(true)
                const res=await store.getMyData();
                setData(res)
            }catch(e){
                console.log(e)
            }
            finally{
                setWait(false)
            }
           
       }
       fetchData();
      }, []);

      const showAccount=()=>{
        if(wait){
            return <Loading/>;
        }
        if(store.role=="student"){
            return  <PersonalAccountStud data={data}/>
        }
        else if(store.role=="teacher"){
            return  <PersonalAccountTeacher data={data}/>
        }
        return  <PersonalAccountStud data={data}/>
    }
    
    return(
        <div className="personal_account">
            <Navbar/>
            <div className="pagecontainer">
                {showAccount()}
            </div>
            <Footer/>
        </div>
    )
}

export default observer(PersonalAccount)