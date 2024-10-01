import React, { useState, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';
import 'react-toastify/dist/ReactToastify.css';
import  './login.css';
import { GoogleAuthProvider, signInWithPopup,getAuth } from 'firebase/auth'
import { auth } from '../../firebase/firebaseConfig'
import { FaGoogle } from 'react-icons/fa';

const Login = ({ setSignIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { HandleLogin, HandleGoogleLogin } = useContext(AuthContext);

  // Prevent form default submission
  const onSubmit = useCallback(async (e) => {
      e.preventDefault(); // Prevent the default form submission behavior
      
      try {
          const response = await HandleLogin({ email, password });
          console.log('Login response', response);
          
          if (response.success) {
              toast.success('Login Successful', {
                position: 'top-right',
                autoClose: 1000,
              });
              navigate('/taskview');
          } else {
              toast.error('Login Failed', {
                  position: 'top-right',
                  autoClose: 3000,
              });
          }
      } catch (error) {
          console.log(error);
          toast.error('An error occurred during login');
      }
  }, [email, password, HandleLogin, navigate]);

  const handleGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        const idToken = await user.getIdToken();
        const userData = {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        };

        const response = await HandleGoogleLogin(userData, idToken);
        console.log('Google sign-in response:', response);

        if (response) {
          toast.success('Login Successful', {
            position: 'top-right',
            autoClose: 1000,
          });
          navigate('/taskview');
        } else {
          toast.error('Login Failed', {
            position: 'top-right',
            autoClose: 3000,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error('An error occurred during Google login');
      });
  };

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm text-black">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
          Log In
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm text-black">
        {/* Add the onSubmit handler to the form */}
        <form className="space-y-6" onSubmit={onSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full rounded-md border-0 py-1.5 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6">
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-transparent focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit" // This now uses the form's submit event
              className="flex w-full justify-center rounded-md bg-sky-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-stone-600">
          Don't have an account?{' '}
          <a
            href="#"
            onClick={() => setSignIn(false)}
            className="font-semibold leading-6 text-sky-600 hover:text-sky-500"
          >
            SignUp here
          </a>
        </p>
      </div>

      <hr className="border text-center border-gray-500 mt-4" data-content="or" />

      <div className="flex justify-center m-10">
        <button
          type="button" // Prevent default form submission
          onClick={handleGoogle}
          className="flex items-center w-[50%] xs:max-md:w-[100%] justify-center rounded-md bg-white px-4 py-3 rounded-lg text-sm font-bold leading-6 text-black shadow-lg border border-black hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          aria-label="Continue with Google"
        >
          <FaGoogle className="mr-2" />
          Continue with Google
        </button>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
