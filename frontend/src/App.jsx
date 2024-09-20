import { createContext, useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, NavigationType } from 'react-router-dom';

import './App.css';
import SignUp from '../pages/signUp';
import Login from '../pages/login';

import Home from '../pages/Home';
import TaskManager from '../pages/task';
import Cookies from 'js-cookie';
import { set } from 'mongoose';
import Profile from './components/Profile';
import { AuthProvider,AuthContext } from '../context/AuthContext';
/* 
const PrivateRouter=({element,isAuth})=>{
  console.log(isAuth);
  
  return isAuth? element : <Navigate to="/signup"/>
}
*/

1


function App() {

 
  return (
    <AuthProvider>
   <div className="App">

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
         {/*  <Route path="/taskview" element={isAuth ? <TaskManager />: <Navigate to={'/login'}/> } /> */}
          <Route path="/taskview" element={<TaskManager />}/> 
        </Routes>
  
  </div>
    
    </AuthProvider>
  );
}

export {App,AuthContext};
