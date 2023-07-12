// import { NavLink } from 'react-router-dom';
import {  useSelector } from 'react-redux';
import {useEffect} from 'react';
import { loginUser } from '../redux/actions/UserAction';
import axios from 'axios';
import Store from '../store';
import { useNavigate } from 'react-router-dom';
import LanguageSelector from '../component/translate'
import {useTranslation}  from 'react-i18next';
import {clearUser} from '../redux/actions/UserAction'
import { Dropdown } from 'antd';
import React from "react";
import { axiosToken } from '../util/ConfihAxios'

const Header =()=>{
  const { t } = useTranslation();
  const navigate = useNavigate();
  const UserInfo =  useSelector((state) => state.user.user)


  useEffect(() => {
    if(UserInfo) return ;
    const token = localStorage.getItem('accessToken')
    if(token){
      axiosToken.get(`http://localhost:3020/user/account`, {
          headers: {
            'token': `${token}`
          }
      }).then((res)=>{
        const user = res.data
        console.log(user,"user")
        Store.dispatch(loginUser(user))
      })
    }
  },[UserInfo]);








  const logout = ()=>{
      axios.get('http://localhost:3020/auth/logout',
      {
        withCredentials: true 
      }
    )
    .then(function (res) {
      navigate('/login')
      localStorage.clear('accessToken')
      Store.dispatch(clearUser())
    })
    .catch(function (error) {
      console.log(error);
    });



    
  }


  const items = [
    {
      label: (
        <div className='d-fex contry' onClick={()=>{logout()}}>
            {t ("logout")}
        </div>
      ),
      key: '0',
    },
  ];
  
  return(
  <header className="topbar" data-navbarbg="skin5">
   
    <div className="Navlinks">
      <div className="left-Navlink">
        <span>Dashboard</span>
        <span></span>
      </div>
      <div className='d-flex align-center'>
        <div className='language-change'>
          <LanguageSelector/>
        </div>
        <Dropdown
          menu={{
            items,
          }}
          >
        <div className="right-Navlink">
        { UserInfo ?
          <div className="avatar">
            <img src={UserInfo.avartar?UserInfo.avartar:'https://res.cloudinary.com/dhef1t1iu/image/upload/v1680489402/pb7rsiir5rfjvoxworcj.jpg' } alt="avartar" />
            <p>{UserInfo.username}</p>
          </div>
          : <></>
        }
        </div>
        </Dropdown>
      </div>
    </div>
  </header>
  )
}
export default Header;