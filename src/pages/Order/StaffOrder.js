
import {axiosToken} from'../../util/ConfihAxios'
import {URLAPI} from '../../util/index'
import React, { useEffect } from 'react';
import  { useState } from 'react';




const StaffOrder = (props)=>{
 console.log('props.item',props.item)
 const item = props.item
 const StaffHandlingLsy = item.StaffHandlingLsy
  const [staff, setStaff] = useState();
  console.log()

  useEffect(() => {

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

  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  console.log("staff",staff)






  
  return(
    <>
      {staff?.username}
    </>
  )



}

export default StaffOrder;
