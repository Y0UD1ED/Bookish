import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Store from './store/store';

const store =new Store();
const user={
  name:"artem",
  role:"student"
}

store.setUser(user)

export const Context=createContext(store)



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div className='wrapper'>
      <div className='content'>
        <Context.Provider value={{store}}>
          <App />
        </Context.Provider>
        
      </div>
    </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
