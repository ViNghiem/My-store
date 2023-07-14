import './login.css';
import axios from 'axios';
import { useState } from "react";
import { loginUser } from '../../redux/actions/UserAction';
import Store from '../../store';
import { useNavigate } from 'react-router-dom';
// import {  useSelector } from 'react-redux';
import {  toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// import {useEffect} from 'react';





function noti(text){
  toast.error(text, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
    });
}

function LoginPage() {
 const { t } = useTranslation();
  const navigate = useNavigate();
  // const UserInfo =  useSelector((state) => state.user.user)
  // const token = localStorage.getItem('accessToken')

  // useEffect(() => {
  
  //   console.log(token)
  //     // navigate('/')
    
  // },[]);




  if (localStorage.getItem('accessToken')) {
    console.log("sadghsgahdg")
    console.log(localStorage.getItem('accessToken'))
    navigate('/')
  }
  
  const handleGoogleLogin = async () => {
    window.open("http://localhost:3020/auth/google", "_self");
  };

  const Facebook = () => {
    window.open("http://localhost:3020/auth/facebook", "_self");
  };


  const [email, setEmail] = useState("");
  const [password,setPassword] = useState("")
  const handlelLogin = (e) =>{
    e.preventDefault();
    const neuUser = {
      email:email,
      password:password,
    }
    axios.post('https://leaningapinodejs.onrender.com/user/login',  neuUser,{
      withCredentials: true 
    })
    
    .then((res)=>{
      const user = res.data
      if (user.accessToken !== localStorage.getItem('accessToken')) {
        localStorage.setItem('accessToken', user.accessToken);
      }
      Store.dispatch(loginUser(user))
      navigate('/')
    })
    .catch(function (error) {
      noti(error.response.data.mess) 
    });
  }
  return ( 
  <div className='box-login-form'>
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
    </div>
    <form onSubmit={handlelLogin}>
    <div className='form-login'>
        <h3>{t('Login')}</h3>

        <label htmlFor="username">Email
          <input type="text" placeholder="Email or Phone" id="username"  onChange={(e)=>setEmail(e.target.value)}  />
        </label>
        <label htmlFor="password">Password
        <input type="password" placeholder="Password" id="password" onChange={(e)=>setPassword(e.target.value)}  />
        </label>
        <button >Log In</button>
        <div className="social">
          <div className="go" onClick={handleGoogleLogin}><i className="fab fa-google"></i>  Google</div>
          <div className="fb" onClick={Facebook} ><i className="fab fa-facebook"></i>  Facebook</div>
        </div>
        <div className='link-page'>
          <Link to="/regitser">register</Link>
        </div>
    </div>
    </form>
  </div>
  );
}

export default LoginPage;