import React, { useState, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';
import 'react-toastify/dist/ReactToastify.css';



const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const { HandleLogin } = useContext(AuthContext);

  const onSubmit = useCallback(async () => {
    try {
      const response = await HandleLogin({ email, password });
      console.log("Login response", response);
      
      if (response) {
        toast.success('Login Successful');
        navigate('/taskview');
      } else {
        toast.error('Login Failed', {
          position: "top-right",
          autoClose: 5000,
      });

      }
    } catch (error) {
      console.log(error);
      toast.error('An error occurred during login');
    }
  }, [email, password, HandleLogin, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-sm p-8 bg-gray-800 rounded-lg shadow-lg">
      <ToastContainer />
        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>

        <form className="flex flex-col space-y-6">
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
            Login
          </button>
        </form>
    
      </div>
    </div>
  );
};

export default Login;
