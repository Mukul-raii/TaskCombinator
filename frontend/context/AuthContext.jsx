import { createContext, useEffect } from 'react';
import { atom } from 'recoil';
import { login, signin, setAuthToken ,logout } from '../services/AuthServices';
import { useNavigate } from 'react-router-dom';
import { useReducer } from 'react';

const AuthContext = createContext();

const userReducer = (state, {type, payload}) => {
    switch (type) {
      case 'LOGIN':
        return {
          ...state,
          isAuthenticated: true,
          user: payload,
        };
      case 'LOGOUT':
        return {
          ...state,
          isAuthenticated: false,
          user: null,
        };
      default:
        return state;
    }
  };
  

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, { isAuthenticated: false, user: null });
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem('user')) || null;
  
      if (user && user.message && user.message.token) {
        setAuthToken(user.message.token);
        dispatch({ type: 'LOGIN', payload: user });

      }
    } catch (error) {
      console.error('Error parsing user from localStorage:', error);
    }
  }, []);
  
  const HandleLogin = async (user) => {
    const response = await login(user);
    const token =response.user.message.token
    const VerifiedUser=response.user
    if (response.success) {
      localStorage.setItem('user', JSON.stringify(VerifiedUser));
       
      dispatch({ type: 'LOGIN' ,payload: VerifiedUser});
      navigate('/taskview');
      return response.data;
    } else {
      console.log(response.user);
    }
  };
  

  const HandleSignUp = async (user) => {
    const response = await signin(user);
    console.log('auth signup', response);

    if (response.success) {
      localStorage.setItem('user', response.user);

      navigate('/login');
    } else {
      console.log(response.Error);
    }
  };

  const HandleLogout = async (token) => {

    const response = await logout(token);

    if(response.success){
        localStorage.removeItem('token');
        dispatch({ type: 'LOGOUT' });
        navigate('/')
    }
  };

  return (
    <AuthContext.Provider value={{  state,HandleLogin, HandleSignUp, HandleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
