import axios from 'axios'
import React, {useState, useCallback } from 'react'
import Login from './login'
import { Button } from './button'
import { Navigate } from 'react-router-dom'

const SignUp = () => {
  const [userName, setuserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const[isSignedUp,setIsSignedUp] = useState(false)

  const onSubmit = useCallback(() => {
    console.log(userName, email, password)
    axios
    .post('http://localhost:4000/api/v1/user/signup', {userName, email, password})
    .then((res)=>{
     setIsSignedUp(true)
    .catch((err) => {
      console.error("Error signing up:", err);
    })
    })
  }, [userName, email, password])
 
if(isSignedUp){
  return <Navigate to={'/login'}/>
}
  return (
    <div className='flex justify-evenly  flex-row p-2 max-w-screen min-h-screen bg-black text-white'>
    
      <div className='p-6 m-2  w-full  flex justify-evenly items-center '>
     
        <div className='border px-16 py-12 rounded-lg flex flex-col  justify-center items-center bg-blue-400'>
          
        
          <h1 className='text-3xl p-5'>Sign Up</h1>
    
          <form action="\" className='flex flex-col justify-between '>
          <div className=' text-2xl m-3 flex flex-col  justify-items-start text-black font-medium   '>
          <label htmlFor="">username:</label>
          <input   onChange={e => setuserName(e.target.value)} className='font-normal rounded-md bg-white font-black'  type="text" />
          </div>
          <div className='text-2xl m-3 flex flex-col  justify-items-start text-black font-medium   '>
          <label htmlFor="">Email:</label>
          <input onChange={e => setEmail(e.target.value)}  className='font-normal rounded-md bg-white font-black' type="text" />
          </div>
          <div className=' text-2xl m-3 flex flex-col  justify-items-start text-black font-medium   '>
          <label htmlFor="">Password:</label>
          <input onChange={e => setPassword(e.target.value)}  className= 'font-normal rounded-md bg-white font-black' type="password" />
          </div>
          </form>
    <button className='text-2xl my-5 border p-2 bg-yellow-50 px-4 mt-8  rounded   text-black font-medium hover:bg-black hover:text-white  ' onClick={onSubmit} type="submit">Sign-up</button>
 </div>
      </div>
    </div>
  )
}

export default SignUp
