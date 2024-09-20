import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const apiUrl = 'http://localhost:4000/api/v1';

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

const login = async (user) => {
  try {
    const res = await axios.post(`${apiUrl}/user/login`, user,{withCredentials:true});
    console.log("login response");
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


export { login, signin, setAuthToken ,logout};
