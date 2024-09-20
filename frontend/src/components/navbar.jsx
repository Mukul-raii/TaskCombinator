import React, { useEffect, createContext, useContext, useState, useCallback } from 'react';
import { Button } from './button';
import SignUp from '../../pages/signUp';
import { Link, useNavigate } from 'react-router-dom';
import Home from '../../pages/Home';
import axios from 'axios';
import { set } from 'mongoose';
import { AuthContext, AuthProvider } from '../../context/AuthContext';
import UserProfileDropdown from './userProfile';
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

const UserBtn = ({state}) => {
  const { HandleLogout } = useContext(AuthContext);
  const token=state.user.message.token;
  
  const logoutme = async () => {
  
   await HandleLogout(token);
  };

  return (
    <div>
      <UserProfileDropdown logoutme={logoutme} />
    </div>
  );
};

const NavBar = () => {
  const { state } = useContext(AuthContext); // Correct useContext to AuthContext
  const navigate = useNavigate();

 
  return (
    <div className="flex justify-between text-2xl flex-row p-2 max-w-screen  bg-black text-white">
      <div className="m-2">
        <h1 className='hover:text-white hover:cursor-pointer' onClick={() => navigate('/')}>TaskCombinator</h1>
   
      </div>
      <div>
      {state.isAuthenticated ? <UserBtn state={state}/> : <LoginBtn />}

      </div>
    </div>
  );
};

export default NavBar;
