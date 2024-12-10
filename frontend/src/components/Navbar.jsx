const Navbar=()=>{
    return(
        <div className="navbar">
        <nav className="menu">
            <div className="container">
                <div className="menu_logo"><a><img src="/WhiteLogo.svg" alt=""></img></a></div>
                <ul className="menu_top">
                    <li><a>Мой профиль</a></li>     
                    <li>
                        <div className="notif_icon">
                        <img src="/notificatiom_icon.png" alt="" />
                        </div>
                    </li>
                </ul>
            </div>
           
            
        </nav>
</div>
    )
   
}

export default Navbar