import { useLocation, useNavigate, useParams } from "react-router-dom";
import BlueButton from "../../components/buttons/BlueButton";
import DeleteButton from "../../components/buttons/DeleteButton";
import Footer from "../../components/Footer";
import BooksList from "../../components/lists/BooksList";
import Navbar from "../../components/Navbar"
import { useContext, useEffect, useState } from "react";
import AddSomeBookInShelfPopup from "../../components/popups/AddSomeBookInShelfPopup";
import EditShelfPopup from "../../components/popups/EditShelfPopup";
import DeleteShelfPopup from "../../components/popups/DeleteShelfPopup";
import { Context } from "../..";
import Loading from "../../components/Loading";
import { API_URL } from "../../api/api";

const Shelf=()=>{
    const { pathname } = useLocation();
    const param=useParams()
    const {store}=useContext(Context)
    const [owner,setOwner]=useState(false)
    const [wait,setWait]=useState(false)
    const [shelf,setShelf]=useState({name:"none",description:"none",image:null,books:[],owner:null})
    useEffect(() => {
        window.scrollTo(0,0);
        console.log(JSON.parse(JSON.stringify(store.user)))
        const fetchData=async()=>{
            try{
                setWait(true)
                const res=await store.getSheflById(param.id);
                if(res.owner==localStorage.getItem("user_id")){
                    setOwner(true)
                }
                setShelf(res)
        }catch(e){
            console.log(e)
        }finally{
            setWait(false)
        }
            
    }
    fetchData()
      },[pathname]);
    const navigate=useNavigate()
    const [show,setShow]=useState(false)
    const [edit,setEdit]=useState(false)
    const [del,setDel]=useState(false)
    if(wait){
        return <Loading/>
    }
    return(
        <div className="one_shelf">
            <Navbar/>
            <div className="pagecontainer">
            <div className="lists_row">
                <div className="object_container">
                    <div className="object_row">
                        <div className="object_info">
                            <div className="object_img">
                                <img src={API_URL+"/images/"+shelf.image||"/defaultObjectImg.svg"} alt="" />
                            </div>
                            <div className="object_text">
                                <div className="object_name">{shelf.name}</div>
                                <div className="object_about">{shelf.description}</div>
                                {owner&&<DeleteButton btnText={'Удалить полку'} onClickFunc={()=>setDel(true)}/>}
                            </div>
                        </div>
                        <div className="object_btns">
                            <div className="object_btns_row">
                                {owner&&<BlueButton btnText={'Редактировать полку'} onClickFunc={()=>setEdit(true)}/>}
                                <BlueButton btnText={'Назад'} onClickFunc={()=>navigate(-1)}/>
                            </div>
                        </div>
                    </div>
                </div>
                {owner&&<BooksList btnText={"Добавить книги"} btnFunc={()=>setShow(true)} books={shelf==undefined?[]:shelf.books}/>}
                {!owner&&<BooksList useDBbtn={false} btnFunc={()=>setShow(true)} books={shelf==undefined?[]:shelf.books}/>}
                <AddSomeBookInShelfPopup id={shelf.id} isShow={show} onClose={()=>setShow(false)}/>
            </div>
            <EditShelfPopup shelf={shelf} isShow={edit} onClose={()=>setEdit(false)}/>
            <DeleteShelfPopup shelf={shelf} isShow={del} onClose={()=>setDel(false)}/>
            </div>
            <Footer/>
        </div>
    )
}

export default Shelf;