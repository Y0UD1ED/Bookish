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
import Students from "../pages/Students"


export const PATHS={
    MAIN: '/',
    AUTH: '/auth',
    REG: '/reg',
    PASSWORD_RECOVERY: '/password_recovery',
    PERSONAL_ACCOUNT: '/me',
    EDIT_ACCOUNT: '/edit',
    MYCLASSES: '/me/classes',
    CLASS: '/classes/:id',
    MYBOOKS: '/me/books',
    USERBOOKS: '/users/:id/books',
    BOOKSPROGRESS:"/classes/:id/books/progress",
    MYNOTES: '/me/notes',
    USERNOTES: '/users/:id/notes',
    NOTE: '/notes/:id',
    MYSHELFS: '/me/shelfs',
    USERSHELFS: '/users/:id/shelfs',
    SHELF: '/shelfs/:id',
    PROGRESS: '/classes/:id/progress',
    STUDENTS: '/classes/:id/stydents',
}

export const router=()=>(
    <Routes>
        <Route path={PATHS.MAIN} element={<Main/>}/>
        <Route path={PATHS.AUTH} element={<Auth/>}/>
        <Route path={PATHS.REG} element={<Reg/>}/>
        <Route path={PATHS.PASSWORD_RECOVERY} element={<PasswordRecovery/>}/>
        <Route path={PATHS.PERSONAL_ACCOUNT} element={<PersonalAccount/>}/>
        <Route path={PATHS.EDIT_ACCOUNT} element={<EditAccount/>}/>
        <Route path={PATHS.MYCLASSES} element={<Classes/>}/>
        <Route path={PATHS.CLASS} element={<Class/>}/>
        <Route path={PATHS.MYBOOKS} element={<Books/>}/>
        <Route path={PATHS.USERBOOKS} element={<Books/>}/>
        <Route path={PATHS.BOOKSPROGRESS} element={<BooksProgress/>}/>
        <Route path={PATHS.CLASS} element={<Class/>}/>
        <Route path={PATHS.MYNOTES} element={<Notes/>}/>
        <Route path={PATHS.USERNOTES} element={<Notes/>}/>
        <Route path={PATHS.NOTE} element={<Note/>}/>
        <Route path={PATHS.MYSHELFS} element={<Shelfs/>}/>
        <Route path={PATHS.USERSHELFS} element={<Shelfs/>}/>
        <Route path={PATHS.SHELF} element={<Shelf/>}/>
        <Route path={PATHS.PROGRESS} element={<Progress/>}/>
        <Route path={PATHS.STUDENTS} element={<Students/>}/>
    </Routes>
)