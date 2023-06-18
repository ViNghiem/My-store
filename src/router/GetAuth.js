import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import LoginPage from '../pages/login'


export default function AuthProvider({ children }) {

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem('accessToken');


    useEffect(() => {
      axios.get('http://localhost:3020/auth/login/success',
      {
        withCredentials: true 
      }
      )
      .then(function (res) {
        console.log(res);
        localStorage.setItem('accessToken',res.data.accessToken);
        setIsLoading(false)
      })
      .catch(function (error) {
        console.log(error);
      });
    
    }, []);
  
  return (
      <>
        {isLoading ?<></> : children}
      </>
  );
}
