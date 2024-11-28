import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Class from './pages/Class';
import Main from './pages/Main';
import PersonalAccount from './pages/PersonalAccount';
import EditAccount from './pages/EditAccount';
import { BrowserRouter } from 'react-router-dom';
import { router } from './router';
function App() {

  return (
    <BrowserRouter>
    {router()}
    </BrowserRouter>
   
  );
}

export default App;
