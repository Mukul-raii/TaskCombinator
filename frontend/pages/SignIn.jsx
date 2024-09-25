import React, { useState } from 'react';
import Login from './login/login';
import SignUp from './signup/signUp';

const SignIn=()=>{
    const[signIn,setSignIn]=useState(true)
    
  
  
  
  return (
    <>
  
     
    <div className='flex justify-center items-center flex-row  bg-gray-800 text-white'>
    <div className='w-7/12  '>
      <img className='h-screen' src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80" />
    </div>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">

        {signIn ? <Login setSignIn={setSignIn}/> : <SignUp />}

      </div>
      </div>


    </>
  
    );
  };
  
  export default SignIn;


/* 
  const SignUsp = () => {
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { HandleSignUp } = useContext(AuthContext)
    const navigate = useNavigate()
    const onSubmit = useCallback(async () => {
        try {
            const response = await HandleSignUp({ userName, email, password })
            console.log('SignUp response', response)

            if (response) {
                toast.success('Sign Up Successful')
                navigate('/login')
            } else {
                toast.error('Sign Up Failed')
            }
        } catch (error) {
            console.error(error)
            toast.error('An error occurred during sign up')
        }
    }, [userName, email, password, HandleSignUp, navigate])

    return (
        <>
         <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
              <img
                  alt='Your Company'
                  src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
                  className='mx-auto h-10 w-auto'
              />
              <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight'>
                  Sign Up to your new account
              </h2>
          </div>

          <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
              <form action='#' method='POST' className='space-y-6'>
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
                              className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
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
                            type='email'
                            onChange={(e) => setEmail(e.target.value)}
                              required
                              autoComplete='email'
                              className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                          />
                      </div>
                  </div>

                  <div>
                      <div className='flex items-center justify-between'>
                          <label htmlFor='password' className='block text-sm font-medium leading-6 '>
                              Password
                          </label>
                          <div className='text-sm'>
                              <a href='#' className='font-semibold text-indigo-600 hover:text-indigo-500'>
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
                              autoComplete='current-password'
                              className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                          />
                      </div>
                  </div>

                  <div>
                      <button
                          onClick={onSubmit}
                          type='submit'
                          className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                          Sign Up
                      </button>
                  </div>
              </form>

              <p className='mt-10 text-center text-sm text-gray-200'>
                  Don't have account?{' '}
                  <a
                      href='#'
                      onClick={() => setSignIn(false)}
                      className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'>
                      SignUp here
                  </a>
              </p>
          </div>
          <hr
              className='border text-center  border-gray-500 mt-4 after:contents:tr(data-content)'
              data-content='or'
          />
          <div className='flex justify-center m-10'>
              <button
                  type='submit'
                  className='flex w-full justify-center rounded-md bg-white px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 w-max'>
                  Continue with Google
              </button>
          </div>   
        </>
    )
}





 */