import '../login/login.css';
import { Link } from 'react-router-dom';
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify';


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



function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [username, setUsername] = useState("");
  
  const navigate = useNavigate();


  if (localStorage.getItem('accessToken')) {
    navigate('/')
  }



  const handleSingup =(e)=>{
    e.preventDefault();
      const neuUser = {
        username:username,
        email:email,
        password:password,
      }
      axios.post('http://127.0.0.1:3020/user/regiter',  neuUser)
      .then((res)=>{
        navigate('/login')
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
  <form onSubmit={handleSingup}>
  <div className='form-login'>
      <h3>Login Here</h3>

      <label htmlFor="username">Username
        <input type="text" placeholder="Email or Phone" id="username"  onChange={(e)=>setUsername(e.target.value)}    />
      </label>

      <label htmlFor="username">Email
        <input type="text" placeholder="Email or Phone" id="username"  onChange={(e)=>setEmail(e.target.value)}  />
      </label>
      
      <label htmlFor="password">Password
      <input type="password" placeholder="Password" id="password"  onChange={(e)=>setPassword(e.target.value)}   />
      </label>
      <button >Submit</button>
      <div className="social">
        <div className="go"><i className="fab fa-google"></i>  Google</div>
        <div className="fb"><i className="fab fa-facebook"></i>  Facebook</div>
      </div>
      <div className='link-page'>
        <Link to="/login">Login</Link>
      </div>
  </div>
  </form>
</div>

  );
}

export default RegisterPage;