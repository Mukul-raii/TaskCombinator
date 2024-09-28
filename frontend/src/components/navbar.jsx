import React, { useContext, useEffect } from 'react';
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import UserProfileDropdown from './userProfile';
import logo from '../assets/logo.png';
const LoginBtn = () => {


  return (
  
    <button className="px-6 py-2    border border-2 bg-blue-500 text-white  xs:max-md:rounded-xl xs:max-md:h-10 xs:max-md:text-sm  rounded-lg  ">
          <Link to="/signin">
         Get Started
      </Link>
        </button>
  
  );
};

const UserBtn = ({ state }) => {
  const { HandleLogout } = useContext(AuthContext);
  const token = state.user?.message?.token || state.user?.token
const user=state.user?.message?.user || state.user.name


  const logoutme = async () => {
    await HandleLogout(token);
  };

  return (
    <div >
      <UserProfileDropdown logoutme={logoutme} userdata={state} />
    </div>
  );
};

const NavBar = () => {
  const { state } = useContext(AuthContext); 
  const navigate = useNavigate();

  return (
    <div className="bg-white border bottom-1 text-white flex justify-center mx-2 rounded-full px-6 h-16 xs:max-md:px-1 xs:max-md:h-14 shadow-white  fixed  top-0 w-full z-10" >
      <div className="flex justify-between items-center w-full mx-auto">
    <div className='flex items-center flex-row gap-2'>

    <img src={logo} alt={logo} className='w-11 '  />
        <h1
          className="text-xl font-bold text-blue-950 cursor-pointer"
          onClick={() => navigate('/')}
          >
          TaskCombinator
        </h1>
          </div>

        {/* Right-side buttons */}
        <div className="flex space-x-4">
          {state.isAuthenticated ? <UserBtn state={state} /> : <LoginBtn />}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
