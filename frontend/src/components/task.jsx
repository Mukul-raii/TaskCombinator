import React, { useContext, useEffect, useState } from 'react';
import NavBar from './navbar';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../App';
import Cookies from 'js-cookie';

const TaskManager = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const [Isloading, setIsLoading] = useState(true);


  console.log('from task vie2w', isAuth);
  

  useEffect(() => {
    axios
      .get('http://localhost:4000/api/v1/user/getme')
      .then((res) => {
        console.log('from task view', res.data);


``
        setIsAuth(true);
      })
      .catch((err) => {
        console.error(err);
        setIsAuth(false);
      });

    setIsLoading(false);
  }, [setIsAuth]);

  if (Isloading) {
    return <div className="">Loading...</div>;
  }
  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <NavBar  />
    </>
  );
};

export default TaskManager;
