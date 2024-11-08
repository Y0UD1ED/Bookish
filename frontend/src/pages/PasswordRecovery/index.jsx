import { useState } from "react";
import PassRecoveryMail from "../../components/PassRecoveryMail";
import './styles.css'
import PassRecoveryCode from "../../components/PassRecoveryCode";
import PassRecoveryOk from "../../components/PassRecoveryOk";

const PasswordRecovery=()=>{

    const [mail,setMail]=useState("")
    const [step,setStep]=useState(0)

    const increaseStep=()=>{
        setStep(step+1);
    }

    const decreaseStep=()=>{
        setStep(step-1);
    }

    const showStepComponent=()=>{
        switch(step){
            case 0:
                return <PassRecoveryMail onClickFunc={increaseStep}/>
            case 1:
                return <PassRecoveryCode onClickFunc={increaseStep}/>
            case 2:
                return <PassRecoveryOk onClickFunc={increaseStep}/>
            default: return null;
        }
    }

    return(
        <div className="pass_recovery">
             <div className="backLayout">
            <div className="recoveryContainer">
                <div className="logo">
                    <img src="WhiteLogo.svg" alt="" />
                </div>
                    {showStepComponent()}         
            </div>
           
        </div>
        </div>
    )
}

export default PasswordRecovery;