import React, { useState } from 'react';
import Login from './login/login';
import SignUp from './signup/signUp';
import NavBar from '../src/components/navbar';

const SignIn=()=>{
    const[signIn,setSignIn]=useState(true)
    
  
  
  
  return (
    <>
  <NavBar/>
     
    <div className='flex justify-center items-center flex-row  bg-white text-black text-white'>
    <div className='w-7/12  xs:max-md:hidden '>
      <img className='h-screen' src="https://res.cloudinary.com/dmvzjbgwp/image/upload/v1727520919/hgrr8xq0nc2wlvkrx8yv.jpg" />
    </div>
        <div className="flex min-h-full flex-1 flex-col justify-center  px-6 py-12 lg:px-8">

        {signIn ? <Login setSignIn={setSignIn}/> : <SignUp />}

      </div>
      </div>


    </>
  
    );
  };
  
  export default SignIn;

