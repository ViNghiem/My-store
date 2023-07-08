import axios from "axios";

import jwtDecode from "jwt-decode";


export const axiosToken = axios.create()
axiosToken.interceptors.request.use(
  async(config)=>{
    let date = new Date()
    const decodeToken = jwtDecode(localStorage.getItem('accessToken'))
    console.log(decodeToken)  
    if(decodeToken.exp < date.getTime()/1000){
      await axios.get('http://localhost:3020/auth/refreshtoken',{
          withCredentials: true
        }
      ).then((res)=>{
          localStorage.setItem('accessToken',res.data.accessToken);
          config.headers['token']= res.data.accessToken
      })
    }
    return config
  },
  (err)=>{
    return Promise.reject(err)
  } 
)


