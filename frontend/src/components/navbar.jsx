import React, { useContext, useEffect } from 'react';
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import UserProfileDropdown from './userProfile';

const LoginBtn = () => {


  return (
    <div className="flex space-x-4">
      <Link to="/signin" state={{ setSignIn: false }}>
        <Button className="px-6 py-2 bg-transparent text-white border border-white rounded-md transition-all duration-300 hover:bg-white hover:text-black">
          Sign up
        </Button>
      </Link>
      <Link to="/signin">
        <Button className="px-6 py-2 bg-white text-black rounded-md transition-all duration-300 hover:bg-transparent hover:text-white hover:border-white border">
          Login
        </Button>
      </Link>
    </div>
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
      <UserProfileDropdown logoutme={logoutme} user={user} />
    </div>
  );
};

const NavBar = () => {
  const { state } = useContext(AuthContext); 
  const navigate = useNavigate();

  return (
    <div className="bg-gray-800 text-white flex justify-center  px-6 h-16 shadow-md ">
      <div className="flex justify-between  items-center w-full mx-auto">
        {/* Logo / Title */}
        <h1
          className="text-2xl font-bold cursor-pointer hover:text-gray-300"
          onClick={() => navigate('/')}
        >
          TaskCombinator
        </h1>

        {/* Right-side buttons */}
        <div className="flex space-x-4">
          {state.isAuthenticated ? <UserBtn state={state} /> : <LoginBtn />}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
