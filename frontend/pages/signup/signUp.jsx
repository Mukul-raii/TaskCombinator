import React, { useState, useCallback, useContext } from 'react'
import {  useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { AuthContext } from '../../context/AuthContext'
import 'react-toastify/dist/ReactToastify.css'
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { GoogleAuthProvider, signInWithPopup,getAuth } from 'firebase/auth'
import { auth } from '../../firebase/firebaseConfig'


const SignUp = () => {

  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { HandleSignUp } = useContext(AuthContext)
  const { HandleLogin,HandleGoogleLogin ,state} = useContext(AuthContext)
  const navigate = useNavigate()

  const onSubmit = useCallback(async (e) => {
      try {
        e.preventDefault()
       
        
          const response = await HandleSignUp({ userName, email, password })
          console.log('SignUp response', response)

          if (response) {
              toast.success('Sign Up Successful')
              navigate('/signin')
          } 
      } catch (error) {
          console.error(error)
          toast.error('An error occurred during sign up')
      }
  }, [userName, email, password, HandleSignUp, navigate])

  const handleGoogle = () => {
    const provider = new GoogleAuthProvider()
      signInWithPopup(auth, provider).then(async (result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        const idToken = await user.getIdToken();
     

        const userData = {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL
        };
        console.log(idToken);
      
        
    const response = await HandleGoogleLogin(userData,idToken)
    console.log(response);
    
        
    })
}


  return (
      <>
       <div className='sm:mx-auto sm:w-full sm:max-w-sm text-black'>
         
            <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight'>
                Sign Up to your new account
            </h2>
        </div>

        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm text-black'>
            <form className='space-y-6'>
            <div>
                    <label htmlFor='email' className='block text-sm font-medium leading-6'>
                       Username
                    </label>
                    <div className='mt-2'>
                        <input
                            id='username'
                            type='text'
                            onChange={(e) => setUserName(e.target.value)}
                            required
                            autoComplete='email'
                            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor='email' className='block text-sm font-medium leading-6'>
                        Email address
                    </label>
                    <div className='mt-2'>
                        <input
                          id='email'           
                          onChange={(e) => setEmail(e.target.value)}     
                            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                        />
                    </div>
                </div>

                <div>
                    <div className='flex items-center justify-between'>
                        <label htmlFor='password' className='block text-sm font-medium leading-6 '>
                            Password
                        </label>
                        <div className='text-sm'>
                            <a href='#' className='font-semibold text-sky-600 hover:text-sky-500'>
                                Forgot password?
                            </a>
                        </div>
                    </div>
                    <div className='mt-2'>
                        <input
                            id='password'
                            type='password'
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          
                            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                        />
                    </div>
                </div>

                <div>
                    <button
                        onClick={onSubmit}
                        type='submit'
                        className='flex w-full justify-center rounded-md bg-sky-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600'>
                        Sign Up
                    </button>
                </div>
            </form>

        
        </div>
        <hr
            className='border text-center  border-gray-500 mt-4 after:contents:tr(data-content)'
            data-content='or'
        />
        <div className='flex justify-center m-10'>
        <button
      type='submit'
      onClick={handleGoogle}

      className='flex items-center w-[50%] xs:max-md:w-[100%] justify-center rounded-md bg-white px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'
      aria-label='Continue with Google'
    >
      <FaGoogle className='mr-2 ' />
      Continue with Google
    </button>
        </div>   
      </>
  )
}







export default SignUp



