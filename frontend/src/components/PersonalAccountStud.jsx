import  BlueButton from './buttons/BlueButton'
import DeleteButton from './buttons/DeleteButton';
import ClassesList from './lists/ClassesList'
import ShelfsList from './lists/ShelfsList'
import BooksList from './lists/BooksList';
import ImportantBooksList from './lists/ImportantBooksList';

const PersonalAccountStud=()=>{
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
                                <BlueButton btnText={'Редактировать профиль'} onClickFunc={1}/>
                                <DeleteButton btnText={'Выйти'} onClickFunc={1}/>
                            </div>
                        </div>
                    </div>
                </div>
                <ClassesList/>
                <ShelfsList/>
                <BooksList/>
                <ImportantBooksList/>
            </div>
           
        </div>
    )
}

export default PersonalAccountStud;