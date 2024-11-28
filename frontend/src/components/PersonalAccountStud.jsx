import  BlueButton from './buttons/BlueButton'
import DeleteButton from './buttons/DeleteButton';
import ClassesList from './lists/ClassesList'
import ShelfsList from './lists/ShelfsList'
import BooksList from './lists/BooksList';
import ImportantBooksList from './lists/ImportantBooksList';
import { useLocation, useNavigate } from 'react-router-dom';
import { PATHS } from '../router';
import { useEffect } from 'react';

const PersonalAccountStud=()=>{
    const navigate=useNavigate()
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0,0);
      }, [pathname]);
    return(
        <div className="personal_account_stud">
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
                            </div>
                        </div>
                        <div className="object_btns">
                            <div className="object_btns_col">
                                <BlueButton btnText={'Редактировать профиль'} onClickFunc={()=>navigate(PATHS.EDIT_ACCOUNT)}/>
                                    <div className="delete_wrapper">
                                    <DeleteButton btnText={'Выйти'} onClickFunc={()=>navigate(PATHS.MAIN)}/>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ClassesList/>
                <ShelfsList/>
                <BooksList useAdd={true} btnText={"Показать все"} btnFunc={()=>navigate("/notes")} />
                <ImportantBooksList/>
            </div>
           
        </div>
    )
}

export default PersonalAccountStud;