import { useContext, useState } from "react";
import BackButton from "../buttons/BackButton";
import FuncButton from "../buttons/FuncButton";
import { Context } from "../..";

const LogInClassPopup=({isShow,onClose})=>{
    const [code,setCode]=useState("")
    const [wait,setWait]=useState(false)
    const {store}=useContext(Context)

    const logInClass=async()=>{
        try{
            setWait(true)
            await store.logInClass(code)
        }catch(e){
            console.log(e)
        }finally{
            if(!store.isError){
                window.location.reload()
            }
            setWait(false)
        }
    }

    if(isShow){
    return(
        <div className="window" onClick={()=>onClose()}>
            <div className="default_popup" onClick={e=>e.stopPropagation()}>
            <div className="popup_title">Добавление в класс</div>
                <div className="popup_subtitle">Введите код, чтобы присоединиться к классу. Код можно получить от учителя.</div>
                <div className="popup_input_wrapper">
                    <input 
                    type="text" 
                    placeholder="Код"
                    value={code}
                    onChange={(e)=>setCode(e.target.value)} />
                </div>
                <div className="button_row">
                    <BackButton onClickFunc={()=>onClose()}/>
                    <FuncButton btnText={"Войти"} onClickFunc={()=>logInClass()}/>
                </div>
            </div>
        </div>
    )
}
}

export default LogInClassPopup;