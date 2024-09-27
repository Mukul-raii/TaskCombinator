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
    <div className='w-7/12  '>
      <img className='h-screen' src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80" />
    </div>
        <div className="flex min-h-full flex-1 flex-col justify-center  px-6 py-12 lg:px-8">

        {signIn ? <Login setSignIn={setSignIn}/> : <SignUp />}

      </div>
      </div>


    </>
  
    );
  };
  
  export default SignIn;

