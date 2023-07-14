
import {useEffect,useState} from 'react';
import axios from 'axios';
import {useTranslation}  from 'react-i18next';
import TableUser from './TableUser'
import {  Tabs } from 'antd';
import {  useSelector } from 'react-redux';


const ListStaff = ()=>{

  const [listUser, setListUser] = useState();
  const [listProp,setListProp] = useState()
  const { t } = useTranslation();
  const UserInfo =  useSelector((state) => state.user.user)
  console.log("UserInfo",UserInfo)



  useEffect(() => {
    if(listUser) return ;
    const token = localStorage.getItem('accessToken')
    axios.get(`https://leaningapinodejs.onrender.com/user/all`, {
        headers: {
          'token': `${token}`
        },
    }).then((res)=>{
      console.log(res.data,"nghiem")
      const data = res.data
      console.log(data)
      const newdata = data?.map(item =>({
        ...item,
        key:item._id
      }))
      setListProp(newdata)
      setListUser(newdata)
    })
  },[listUser]);
  console.log("listUser",listUser)

  const  fillter = (key) =>{
    console.log("nghiemmmmm",key)
    console.log(listUser)
    if(key !=='all'){
      const newlist = listUser.filter((user) =>user.role === key)
      console.log(newlist)
      setListProp(newlist)
    }else{
      setListProp(listUser)
    }
   

  }
  const itemsTab = [
    {
      label:t('All'),
      key: 'all',
    },

    {
      label: t(`pending`),
      key: 'pending',
    },

    {
      label: t(`approved`),
      key: 'approved',
    }

  ]
  return(
  
      <>
      {
          UserInfo?.isAdmin?
          <><Tabs
              defaultActiveKey="1"
              items={itemsTab}
              onChange = {fillter}
            />
            <TableUser listUser={listProp} />
          </>
        :
          <div className='warning'>tài khoản của bạn chưa được cấp quền xem trang này vui lòng liên hệ admin</div>
      }


      </>
    )
  
}

export default ListStaff;