import React,{useState,useCallback, useContext} from 'react'
import axios from 'axios'
import TaskManager from './task'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../App'
import Cookies from 'js-cookie'
axios.defaults.withCredentials = true;

1


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
     
    const {setIsAuth} =useContext(AuthContext)

    const navigate =useNavigate()

    const onSubmit = useCallback(() => {
        console.log(email, password)
      
        axios.post('http://localhost:4000/api/v1/user/login', {email, password}).then((res)=>{
            
          console.log(res.data);
          localStorage.setItem('User',res.data);
          if(res.data.statusCode == 200){   
            console.log("Login Success");
            
           
          setIsAuth(true);
        console.log("Navigatingt to taskview"); 
        
         navigate('/taskview');

          }   
             
              
             
        }).catch((err) => {
          console.error("Error",err)
        })
    },[email,password,navigate])


  return (
    <div className='flex justify-evenly  flex-row p-2 max-w-screen min-h-screen bg-black text-white'>
    
      <div className='p-6 m-2  w-full  flex justify-evenly items-center '>
     
        <div className='border px-16 py-12 rounded-lg flex flex-col  justify-center items-center bg-blue-400'>
          
        
          <h1 className='text-3xl p-5'>Login</h1>
    
          <form action="\" className='flex flex-col justify-between '>
         
          <div className='text-2xl m-3 flex flex-col  justify-items-start text-black font-medium   '>
          <label htmlFor="">Email:</label>
          <input onChange={e => setEmail(e.target.value)}  className='font-normal rounded-md bg-white font-black' type="text" />
          </div>
          <div className=' text-2xl m-3 flex flex-col  justify-items-start text-black font-medium   '>
          <label htmlFor="">Password:</label>
          <input onChange={e => setPassword(e.target.value)}  className= 'font-normal rounded-md bg-white font-black' type="password" />
          </div>
          </form>
         <button className='text-2xl my-5 border p-2 bg-yellow-50 px-4 mt-8  rounded   text-black font-medium hover:bg-black hover:text-white  ' onClick={onSubmit} type="submit">Login</button>
          
        </div>
      </div>
    </div>
  )
}

export default Login
