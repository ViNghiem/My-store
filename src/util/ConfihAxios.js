import axios from "axios";

import jwtDecode from "jwt-decode";
import {URLAPI} from './index'


export const axiosToken = axios.create()
axiosToken.interceptors.request.use(

  
  async(config)=>{

    const currentTime = Math.floor(Date.now() / 1000)
    const decodeToken = await jwtDecode(localStorage.getItem('accessToken'))
  
    if(decodeToken.exp < currentTime){
      await axios.get(`${URLAPI}/auth/refreshtoken`,{
          withCredentials: true,
        }
      ).then( async (res)=>{
        await localStorage.setItem('accessToken',res.data.accessToken);
          config.headers['token']= res.data.accessToken
      })
    }
    return config
  },
  (err)=>{
    return Promise.reject(err)
  } 
)


