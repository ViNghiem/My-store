import { Table } from 'antd';
import Topbar from '../../component/topbar';
import {useEffect,useState} from 'react';
import axios from 'axios';
import {useTranslation}  from 'react-i18next';


const ListStaff = ()=>{

  const [listUser, setListUser] = useState();
  const { t } = useTranslation();
  useEffect(() => {
    if(listUser) return ;
    const token = localStorage.getItem('accessToken')
    axios.get(`http://localhost:3020/user/all`, {
        headers: {
          'token': `${token}`
        },
    }).then((res)=>{
      console.log(res.data,"nghiem")
      const data = res.data
      console.log(typeof data)
      const newdata = data?.map(item =>({
        ...item,
        key:item._id
      }))
      setListUser(newdata)
    })
  },[listUser]);
  console.log("listUser",listUser)

  const columns = [
    {
      title: t('Name'),
      dataIndex: 'name',
      key: 'name',
      render: (name,item,_id) =>{
        console.log("item",item)
        return (
          <div key={_id} className='avatar-product avatar-user'>
            {
              item.avartar?
              <img src={item.avartar}  alt='avatar'/>
              :<div className='name-avt'>{item.username.slice(0, 2)}</div>
            }
            
            <span >{item.username}</span>
          </div>
        )
      }
    },
    {
      title: 'Email',
      dataIndex: 'Email',
      key: 'age',
      render: (name,item,_id) =>{
        return (
          <div key={_id} className='avatar-product'>
            <span>{item.email }</span>
          </div>
        )
      }
    }
  
   
  ];
  












  return(
  
      <>
        <Topbar ToPage="/products/creat-product"/>
        <Table columns={columns} dataSource={listUser} />;
      </>
    )
  
}

export default ListStaff;