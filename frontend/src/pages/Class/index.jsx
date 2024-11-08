import BlueButton from "../../components/buttons/BlueButton";
import DeleteButton from "../../components/buttons/DeleteButton";
import Footer from "../../components/Footer";
import ImportantBooksList from "../../components/lists/ImportantBooksList";
import Navbar from "../../components/Navbar";
import ProgressList from "../../components/lists/ProgressList";
import StudentsList from "../../components/lists/StudentsList";

import './styles.css'

const Class=()=>{
    return(
        <div className="one_class">
            <Navbar/>
            <div className="pagecontainer">
            <div className="lists_row">
                <div className="object_container">
                    <div className="object_row">
                        <div className="object_info">
                            <div className="object_img">
                                <img src="defaultObjectImg.svg" alt="" />
                            </div>
                            <div className="object_text">
                                <div className="object_name">Фамилия Имя Отчество</div>
                                <div className="object_about">О себе</div>
                                <div className="object_about">Код для добавления</div>
                                <DeleteButton btnText={'Выйти из класса'} onClickFunc={1}/>
                            </div>
                        </div>
                        <div className="object_btns">
                            <div className="object_btns_col">
                                <BlueButton btnText={'Редактировать профиль'} onClickFunc={1}/>
                            </div>
                        </div>
                    </div>
                </div>
                <ProgressList/>
                <ImportantBooksList/>
                <StudentsList/>
            </div>
    
            </div>
            <Footer/>
        </div>
    )
}

export default Class;
