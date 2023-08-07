import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
// import jwtDecode from "jwt-decode";
// import LoginPage from '../pages/login'
import {URLAPI} from '../util/index'
// import {connect} from './ConnectServer'
export default function AuthProvider({ children }) {
  const navigate = useNavigate();
  useEffect(() => {
    if( !localStorage.getItem('accessToken')){
      axios.get(`${URLAPI}/auth/login/success`,
        {
          withCredentials: true 
        }
      )
      .then(function (res) {
        console.log(res)
        localStorage.setItem('accessToken',res.data.accessToken);
        // const decodeToken = jwtDecode(res.data.accessToken)
        if(res.data.role ==='pending'){  
          navigate('/info')
        }else{
        
          navigate('/')
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
      <>
        { children}
      </>
  );
}

