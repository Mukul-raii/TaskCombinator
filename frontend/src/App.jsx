import { createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import SignUp from '../pages/signup/signUp';
import SignIn from '../pages/SignIn';
import Login from '../pages/login/login';
import Home from '../pages/home/Home';
import TaskManager from '../pages/task/task';
import Profile from './components/Profile';
import { AuthProvider, AuthContext } from '../context/AuthContext';
import { ToastContainer } from 'react-toastify';
const PrivateRouter =  ({ element, isAuthenticated }) => {

  
  return  isAuthenticated ? element : <Navigate to="/SignIn" />;
}

function App() {
  const { state } = useContext(AuthContext);


  return (
   
      <div className="App">
  
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/taskview" element={<PrivateRouter element={<TaskManager />} isAuthenticated={state} />} />
        </Routes>
      </div>
  );
}

export { App, AuthContext };
