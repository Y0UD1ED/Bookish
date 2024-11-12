import { useState } from "react";
import BackButton from "../buttons/BackButton";
import FuncButton from "../buttons/FuncButton";
import AddSomeBooksList from "../lists/AddSomeBooksList";

const CreateShelfPopup=({isShow,onClose})=>{
    const [name,setName]=useState("")
    const [description,setDescription]=useState("")
    const [hide,setHide]=useState(false)
    let bookArr=[]

    const addBookInList=(i)=>{
        bookArr.push(i)
        console.log(bookArr)
    }

    const removeBookFromList=(i)=>{
        bookArr=bookArr.filter(num=>num!=i)
        console.log(bookArr)
    }

    if(isShow){
        return(
            <div className="window" onClick={()=>onClose()}>
                <div className="default_popup" onClick={e=>e.stopPropagation()}>
                <div className="popup_title">Редактировать полку</div>
                   <div className="popup_row">
                    <div className="popup_round_item_img">
                        <img src="userAvatar.jpg" alt="" />
                    </div>
                    <div className="popup_inputs_col">
                        <input 
                        type="text"  
                        placeholder="Название полки" 
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        className="popup_create_shelf_long_input"/>
                        <input 
                        type="text"  
                        placeholder="Описание полки"
                        value={description}
                        onChange={(e)=>setDescription(e.target.value)}  
                        className="popup_create_shelf_long_input"/>
                        <div className="checkbox_wrapper">
                            <input 
                            type="checkbox" 
                            checked={hide}
                            onChange={()=>setHide(!hide)}
                            />
                            <div className="checkbox_label">
                            <label>Скрыть ото всех</label>
                            </div>
                        </div>
                    </div>
                   </div>
                   <AddSomeBooksList addItemFunc={addBookInList} removeItemFunc={removeBookFromList}/>
                    <div className="button_row" style={{paddingTop:"20px"}}>
                        <BackButton onClickFunc={()=>onClose()}/>
                        <FuncButton btnText={"Создать"}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateShelfPopup;