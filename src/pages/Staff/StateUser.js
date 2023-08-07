import {  Popover } from 'antd';
import {useTranslation}  from 'react-i18next';
import {axiosToken} from'../../util/ConfihAxios'
import {URLAPI} from '../../util/index'
import  { useState } from 'react';




const StateUser = (props) => {
  const { t } = useTranslation();
  const item = props.User
  const token = localStorage.getItem('accessToken');
  const [role, setRole] = useState(item.role);

const updateRole = (id,state)=>{
  const url = `${URLAPI}/user/updaterole`;
  const  dataUpdate={
        id:id,
        state:state
      }
  const headers = {
    token:token
  };

  axiosToken.put(url, dataUpdate, { headers })
    .then(response => {
      const dataa = response.data
      setRole(dataa.role)
    })
    .catch(error => {
    
      console.error('Error:', error);
    });
}












  return(
    <>
      {item.isAdmin?
          <div className={role ==='pending'? 'pending' : 'approved' } >Admin</div>
        :
        <Popover
          content={
            role==='pending'?
              <div className='poiter' onClick={()=>updateRole(item._id,'approved')}>{ t('approved') }</div>
            :
              <div className='poiter'  onClick={()=>updateRole(item._id,'pending')}>{ t('pending')  }</div>
        
        }
          trigger="hover"
        >
          <div className={role ==='pending'? 'pending' : 'approved' }  >{t(role)}</div>
        </Popover>

      }
      </>
  )
}

export default StateUser