import  BlueButton from './buttons/BlueButton'
import DeleteButton from './buttons/DeleteButton';
import ClassesList from './lists/ClassesList'
import ShelfsList from './lists/ShelfsList'
import BooksList from './lists/BooksList';
import ImportantBooksList from './lists/ImportantBooksList';
import { useLocation, useNavigate } from 'react-router-dom';
import { PATHS } from '../router';
import { useContext, useEffect, useState } from 'react';
import { Context } from '..';
import { observer } from 'mobx-react';
import Loading from './Loading';
import { API_URL } from '../api/api';

const PersonalAccountStud=({data})=>{
    const { store } = useContext(Context);
    const navigate=useNavigate()
    const [classes,setClasses]=useState([])
    const [importantBooks,setImportantBooks]=useState([])
    const [personalBooks,setPersonalBooks]=useState([])
    const [shelfs,setShelfs]=useState([])
    const [wait,setWait]=useState(false)
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0,0);
        setClasses(data.myClasses)
        setImportantBooks(data.myImportantBooks)
        setPersonalBooks(data.myPersonalBooks)
        setShelfs(data.myShelfs)
      }, [pathname]);

      const logout=async()=>{
        try{
            setWait(true)
            await store.logout()
        }catch(e){
            console.log(e)
        }finally{
            navigate(PATHS.MAIN)
        }
      }
    if(wait){
        return <Loading/>
    }
    return(
        <div className="personal_account_stud">
            <div className="lists_row">
                <div className="object_container">
                    <div className="object_row">
                        <div className="object_info">
                            <div className="object_img">
                                <img src={API_URL+"/images/"+store.user.image||"defaultObjectImg.svg"} alt="" />
                            </div>
                            <div className="object_text">
                                <div className="object_name">{store.user.name}</div>
                                <div className="object_about">{store.user.about||"О себе"}</div>
                            </div>
                        </div>
                        <div className="object_btns">
                            <div className="object_btns_col">
                                <BlueButton btnText={'Редактировать профиль'} onClickFunc={()=>navigate(PATHS.EDIT_ACCOUNT)}/>
                                    <div className="delete_wrapper">
                                    <DeleteButton btnText={'Выйти'} onClickFunc={()=>logout()}/>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ClassesList classes={classes} onClickFunc={()=>navigate(PATHS.MYCLASSES)}/>
                <ShelfsList shelfs={shelfs} onClickFunc={()=>navigate(PATHS.MYSHELFS)}/>
                <BooksList useAdd={true} btnText={"Показать все"} btnFunc={()=>navigate(PATHS.MYNOTES)} books={personalBooks} />
                <ImportantBooksList books={importantBooks} onClickFunc={()=>navigate(PATHS.MYBOOKS)}/>
            </div>
           
        </div>
    )
}

export default observer(PersonalAccountStud);