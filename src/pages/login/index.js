import './login.css';
import axios from 'axios';
import { useState } from "react";
import { loginUser } from '../../redux/actions/UserAction';
import Store from '../../store';
import { useNavigate } from 'react-router-dom';
import {  useSelector } from 'react-redux';
import {  toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';



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
  const UserInfo =  useSelector((state) => state.user.user)
  if(UserInfo){
    navigate('/')
  }

  if (localStorage.getItem('accessToken')) {
    navigate('/')
  }

  const [email, setEmail] = useState("");
  const [password,setPassword] = useState("")
  const handlelLogin = (e) =>{
    e.preventDefault();
    const neuUser = {
      email:email,
      password:password,
    }
    axios.post('http://127.0.0.1:3020/user/login',  neuUser)
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
      console.log(error.response.data,"djsajdhsjahdahsh");
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
          <div className="go"><i className="fab fa-google"></i>  Google</div>
          <div className="fb"><i className="fab fa-facebook"></i>  Facebook</div>
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