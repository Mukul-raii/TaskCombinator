import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

import { dotenv } from 'dotenv';

const apiUrl = import.meta.env.VITE_API_URL;


const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};
const login = async (user) => {
  try {
console.log(apiUrl);
    
    const res = await axios.post(`${apiUrl}/user/login`, user,{withCredentials:true});
    console.log("login response",res);

    if (res.data.statusCode==200) {
      return { success: true, user: res.data };
    } else {
      return { success: false, Error: res.data.message };
    }

  } catch (error) {
    console.error('Error while Logging ', error);
  }
};

const signin = async (user) => {
  try {
    const res = await axios.post(`${apiUrl}/user/signup`, user);

    if (res) {
      return { success: true, user: res.data };
    } else {
      return { success: false, Error: res.data.message };
    }
  } catch (error) {
    return { success: false, Error: error };
  }
};


const logout =async(token)=>{
    const res=await axios.post(`${apiUrl}/user/logout`,{token});
    console.log(res);
    
    if(res.status==200){
      localStorage.removeItem('user');
    return { success: true, user: res.data };

  }

}

const signinWithGOogle=async (userData,idToken) => {
  try {
    const payload = {
      idToken, // Include the idToken
      ...userData // Include the rest of the user data
    };

    const res = await axios.post(`${apiUrl}/user/googleLogin`, payload ,{withCredentials:true});

    if (res.data.statusCode==200) {
      return { success: true, user: res.data };
    } else {
      return { success: false, Error: res.data.message };
    }

  } catch (error) {
    console.error('Error while Logging ', error);
  } 

  
}


export { login, signin, setAuthToken ,logout,signinWithGOogle};
