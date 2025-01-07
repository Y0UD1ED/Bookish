import { useContext, useRef, useState } from "react";
import { Context } from "../..";
import Loading from "../Loading";

const FuncButtonWithHint=({onClickFunc,btnText})=>{
    const [wait, setWait] = useState(false);
    const {store}=useContext(Context)
    const handleImgChange =async(e) => {
        try{
            if(e.target.files[0]){
                setWait(true)
                const res=await store.parseBooks(e.target.files[0])
                onClickFunc(res)
            }
        }catch(e){
            console.log(e)
        }finally{
            setWait(false)
        }
        
    };

    if(wait){
        return <Loading/>
    }

    return(
        <div className="func_hint_btn">               
                            <label class="input-file-hint">
                                <input
                                    type="file"
                                    className="file"
                                    accept="application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword"
                                    onChange={handleImgChange}
                                />		
                                <span>{btnText}</span>
 	                        </label>
        <div className="hint_img">
            <img src="/hint.svg" alt="" />
        </div>
        </div>
    )
}

export default FuncButtonWithHint;