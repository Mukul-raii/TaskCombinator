import React, { useState, useCallback, useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { HandleSignUp } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = useCallback(async () => {
    try {
      const response = await HandleSignUp({ userName, email, password });
      console.log("SignUp response", response);

      if (response) {
        toast.success('Sign Up Successful');
        navigate('/login');
      } else {
        toast.error('Sign Up Failed');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred during sign up');
    }
  }, [userName, email, password, HandleSignUp, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Sign Up</h1>

        <form className="flex flex-col space-y-6">
          <div className="flex flex-col">
            <label className="text-lg font-medium mb-2" htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              onChange={(e) => setUserName(e.target.value)}
              className="px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-lg font-medium mb-2" htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-lg font-medium mb-2" htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>


          <button
            className="w-full py-2 px-4 bg-yellow-500 text-black rounded-md font-medium hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            onClick={onSubmit}
            type="button">
            Sign Up
          </button>
          <span>Already have an account?</span>
          <button
            className="w-full py-2 px-4 bg-yellow-500 text-black rounded-md font-medium hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            onClick={() => navigate('/login')}
            type="button">
            Login Up
          </button>
 </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default SignUp;
