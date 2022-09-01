import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './Dashboard';

import Login from './login/Login';
import SignUp from './SignUp/SignUp';

const App = () => {


  return (     
    <BrowserRouter>
    <Routes>
      {
        localStorage.getItem('loginStatus') !== null ? (
          <Route path='/' element={(<Dashboard />)} />
        ):(
          <Route path='/' element={<Login />}  />
        )
      }
      
      
      <Route path='/signup' element={<SignUp />}  />
    </Routes>
    </BrowserRouter>
  );
};

export default App;
