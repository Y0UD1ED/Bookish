const MemberProgressItem=({sign,value})=>{
    const progressBarStyle={
        display: "flex",
        flexDirection: "column",
        width: `${value}%`,
        height: "18px",   
        borderRadius: "14px",
        textAlign: "center",
        justifyContent: "center",
        color: value>10?"white":"black",
        background: "#2FAB6B"
    }
    return(
        <div className="member_progress_item">
             <div className="member_progress">
                            <div className="member_progress_col">
                                <div className="member_progress_default_bar">
                                    <div className="member_progress_bar" style={progressBarStyle}>
                                        <div className="member_progress_num">{value}%</div>
                                    </div>
                                </div>
                                <div className="member_progress_sign">{sign}</div>
                        </div>
                    </div>
        </div>
    )
}

export default MemberProgressItem;