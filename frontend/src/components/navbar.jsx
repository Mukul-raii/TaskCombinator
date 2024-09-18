import React, { useEffect, createContext, useContext, useState, useCallback } from 'react';
import { Button } from './button';
import SignUp from './signUp';
import { AuthContext } from '../App';

import { Link, Navigate, useNavigate } from 'react-router-dom';
import Home from './Home';
import axios from 'axios';
import { set } from 'mongoose';



const LoginBtn = () => {
  return (
    <div className="">
      <Button className="m-2 w-24 bg-black text-white text-base border  border-white  hover:bg-white hover:text-black">
        {' '}
        <Link to="/signup">Sign up</Link>{' '}
      </Button>
      <Button className="m-2 w-24 bg-black text-white text-base border  border-white  hover:bg-white hover:text-black">
        {' '}
        <Link to="/login">Login </Link>{' '}
      </Button>
    </div>
  );
};

const UserBtn = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const [isLogOut, setIsLogOut] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState({});

useEffect(() => { 
  axios.get('http://localhost:4000/api/v1/user/getme').then((res) => {
    setUser(res.data.user);
console.log("user",res.data);


  }).catch((err) => { 
    console.error(err);
    setIsAuth(false);
  }
  )},[]);


  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:4000/api/v1/user/logout');
      setIsAuth(false);
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Loogind</h1>
      <button onClick={()=> {setIsLogOut(true); handleLogout()}}>Logout</button>
    </div>
  );
};





const NavBar = () => {
  
  const { isAuth } = useContext(AuthContext);

  console.log('nav bar  Auth ', isAuth);

  const navigate = useNavigate();

  return (
    <div className="flex justify-between text-2xl flex-row p-2 max-w-screen  bg-black text-white">
      <div className="m-2">
        <h1 onClick={Navigate('/home')}>TaskCombinator</h1>

        <h1>{isAuth}</h1>
      </div>
      {isAuth ? <UserBtn /> : <LoginBtn />}
    </div>
  );
};

export default NavBar;
