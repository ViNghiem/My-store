

import {axiosToken} from'../../util/ConfihAxios'
import {URLAPI} from '../../util/index'
import React, { useEffect } from 'react';
import  { useState } from 'react';




const StaffOrder = (props)=>{
  console.log("_____________________________________")
  const feid = props.field
  const item = props.item
  var StaffHandlingLsy
  if(feid ==='StaffHandlingLsy'){
     StaffHandlingLsy = item.StaffHandlingLsy
  }else{
    StaffHandlingLsy = item.UpdateStatus
  }
  
  const [staff, setStaff] = useState();
  
    useEffect(() => {
      if(StaffHandlingLsy){
      const token = localStorage.getItem('accessToken');
      const url = `${URLAPI}/user/infostaff`;
        const  dataUpdate={
              idStaff:StaffHandlingLsy
            }
        const headers = {
          token:token
        };

        axiosToken.post(url, dataUpdate, { headers })
          .then(response => {
            setStaff(response?.data)
          })
          .catch(error => {
            console.error('Error:', error);
          });
        }
       
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props]);
  
  return(
    <>
      { 
       staff?
       staff.avartar?
            <div className="avatar">
              <img src={staff.avartar} alt="avartar"/>
              <p className='black-color'>{staff.username}</p>
            </div>
        :
        <div  className='avatar-product avatar-user'>
          <div className='name-avt  order staff'>{staff?.username.slice(0, 2)}</div>
          <span >{staff?.username}</span>
        </div>
        :<></>
      }
    </>
  )



}

export default StaffOrder;
