import { createContext, useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, NavigationType } from 'react-router-dom';

import './App.css';
import SignUp from './components/signUp';
import Login from './components/login';

import Home from './components/Home';
import TaskManager from './components/task';
import Cookies from 'js-cookie';
import { set } from 'mongoose';
import Profile from './components/Profile';

/* 
const PrivateRouter=({element,isAuth})=>{
  console.log(isAuth);
  
  return isAuth? element : <Navigate to="/signup"/>
}
*/
const AuthContext = createContext();

function App() {
  const [isAuth, setIsAuth] = useState(false);

 
  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/taskview" element={isAuth ? <TaskManager />: <Navigate to={'/login'}/> } />
          {/* <Route path="/taskview" element={<TaskManager />}/> */}
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export {App,AuthContext};
