import AddSomeBookItem from "../items/AddSomeBookItem";

const AddSomeBooksList=({addItemFunc,removeItemFunc})=>{
    return(
        <div className="add_some_books_list">
            <div className="add_some_books_list_row">
                <AddSomeBookItem id={1} addItem={addItemFunc} removeItem={removeItemFunc}/>
                <AddSomeBookItem id={2} addItem={addItemFunc} removeItem={removeItemFunc}/>
                <AddSomeBookItem id={3} addItem={addItemFunc} removeItem={removeItemFunc}/>
                <AddSomeBookItem id={4} addItem={addItemFunc} removeItem={removeItemFunc}/>
                <AddSomeBookItem id={5} addItem={addItemFunc} removeItem={removeItemFunc}/>
                <AddSomeBookItem id={6} addItem={addItemFunc} removeItem={removeItemFunc}/>
                <AddSomeBookItem id={7} addItem={addItemFunc} removeItem={removeItemFunc}/>
                <AddSomeBookItem id={8} addItem={addItemFunc} removeItem={removeItemFunc}/>
                <AddSomeBookItem id={9} addItem={addItemFunc} removeItem={removeItemFunc}/>
                <AddSomeBookItem id={10} addItem={addItemFunc} removeItem={removeItemFunc}/>
            </div>
        </div>
    )
}

export default AddSomeBooksList;