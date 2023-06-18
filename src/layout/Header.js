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

const Header =()=>{
  const { t } = useTranslation();
  const navigate = useNavigate();
  const UserInfo =  useSelector((state) => state.user.user)
  
  useEffect(() => {
    if(UserInfo) return ;
    const token = localStorage.getItem('accessToken')
    axios.get(`http://localhost:3020/user/account`, {
        headers: {
          'token': `${token}`
        }
    }).then((res)=>{
      const user = res.data
      console.log(user,"user")
      Store.dispatch(loginUser(user))
    })
  },[UserInfo]);




  const logout = ()=>{
   
    // Cookies.remove('name')
      // localStorage.clear('accessToken')
      // Store.dispatch(clearUser())
      // navigate('/login')
 
    
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

      </div>
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
  </header>
  )
}
export default Header;