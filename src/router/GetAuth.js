import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
// import LoginPage from '../pages/login'


export default function AuthProvider({ children }) {
  const navigate = useNavigate();
  useEffect(() => {
    if( !localStorage.getItem('accessToken')){
      axios.get('http://localhost:3020/auth/login/success',
        {
          withCredentials: true 
        }
      )
      .then(function (res) {
        localStorage.setItem('accessToken',res.data.accessToken);
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
  }, []);
  return (
      <>
        { children}
      </>
  );
}

