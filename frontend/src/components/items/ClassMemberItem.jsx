import MemberProgressItem from "./MemberProgressItem";


const ClassMemberItem=({student})=>{
    return(
        <div className="class_member_item">
            <div className="member_row">
                <div className="member_img">
                    <img src="/defaultObjectImg.svg" alt="" />
                </div>
                <div className="member_col">
                    <div className="member_name">{student.name}</div>
                        <div className="member_progress_row">
                            <MemberProgressItem sign={"Прочел книг"} value={student.haveRead}/>
                            <MemberProgressItem sign={"Читает книг"} value={student.isReading}/>
                            <MemberProgressItem sign={"Планирует читать"} value={student.wantToRead}/>
                        </div>
                        
                </div>
            </div>
        </div>
    )
}

export default ClassMemberItem;