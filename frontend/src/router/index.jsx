import { Route, Routes } from "react-router-dom"
import Main from "../pages/Main"
import Auth from "../pages/Auth"
import Reg from "../pages/Reg"
import PasswordRecovery from "../pages/PasswordRecovery"
import PersonalAccount from "../pages/PersonalAccount"
import EditAccount from "../pages/EditAccount"
import Class from "../pages/Class"
import Classes from "../pages/Classes"
import Books from "../pages/Books"
import Notes from "../pages/Notes"
import Shelfs from "../pages/Shelfs"
import Shelf from "../pages/Shelf"
import Progress from "../pages/Progress"
import Note from "../pages/Note"
import BooksProgress from "../pages/BooksProgress"


export const PATHS={
    MAIN: '/',
    AUTH: '/auth',
    REG: '/reg',
    PASSWORD_RECOVERY: '/password_recovery',
    PERSONAL_ACCOUNT: '/me',
    EDIT_ACCOUNT: '/edit',
    CLASSES: '/classes',
    CLASS: '/classes/:id',
    BOOKS: '/books',
    BOOKSPROGRESS:"/books/progress",
    BOOK: '/books/:id',
    NOTES: '/notes',
    NOTE: '/notes/:id',
    SHELFS: '/shelfs',
    SHELF: '/shelfs/:id',
    PROGRESS: '/progress'
}

export const router=()=>(
    <Routes>
        <Route path={PATHS.MAIN} element={<Main/>}/>
        <Route path={PATHS.AUTH} element={<Auth/>}/>
        <Route path={PATHS.REG} element={<Reg/>}/>
        <Route path={PATHS.PASSWORD_RECOVERY} element={<PasswordRecovery/>}/>
        <Route path={PATHS.PERSONAL_ACCOUNT} element={<PersonalAccount/>}/>
        <Route path={PATHS.EDIT_ACCOUNT} element={<EditAccount/>}/>
        <Route path={PATHS.CLASSES} element={<Classes/>}/>
        <Route path={PATHS.CLASS} element={<Class/>}/>
        <Route path={PATHS.BOOKS} element={<Books/>}/>
        <Route path={PATHS.BOOKSPROGRESS} element={<BooksProgress/>}/>
        <Route path={PATHS.BOOK} element={<Books/>}/>
        <Route path={PATHS.CLASS} element={<Class/>}/>
        <Route path={PATHS.NOTES} element={<Notes/>}/>
        <Route path={PATHS.NOTE} element={<Note/>}/>
        <Route path={PATHS.SHELFS} element={<Shelfs/>}/>
        <Route path={PATHS.SHELF} element={<Shelf/>}/>
        <Route path={PATHS.PROGRESS} element={<Progress/>}/>
    </Routes>
)