import AddSomeBookItem from "../items/AddSomeBookItem";

const AddSomeBooksList=({books,addItemFunc,removeItemFunc})=>{
    return(
        <div className="add_some_books_list">
            <div className="add_some_books_list_row">
                {books.map(k=>
                    <AddSomeBookItem book={k} key={k.id} addItem={addItemFunc} removeItem={removeItemFunc}/>
                )}
            </div>
        </div>
    )
}

export default AddSomeBooksList;