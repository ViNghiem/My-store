
import { Table } from 'antd';
import Topbar from '../../component/topbar';
import {useEffect,useState} from 'react';
import axios from 'axios';
import {useTranslation}  from 'react-i18next';


const OrderPage = ()=>{

  const [listUser, setListUser] = useState();
  const { t } = useTranslation();

  const fomatTime = (time)=>{
    const date = new Date(time );
    const options = { day: '2-digit', month: '2-digit', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return date.toLocaleDateString('vi-VN', options);
  }

  useEffect(() => {
    if(listUser) return ;
    const token = localStorage.getItem('accessToken')
    axios.get(`http://localhost:3020/admin/orders/all`, {
        headers: {
          'token': `${token}`
        },
    }).then((res)=>{
      console.log(res.data,"nghiem")
      const data = res.data.data
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
      title: t('Customer'),
      dataIndex: 'name',
      key: 'name',
      render: (name,item,_id) =>{
        console.log("item",item)
        return (
          <div key={_id} className='avatar-product avatar-user'>
            <div className='name-avt  order'>{item.full_name.slice(0, 2)}</div>
            <span >{item.full_name}</span>
          </div>
        )
      }
    },

    {
      title: t('Products'),
      dataIndex: 'product',
      key: 'product',
      render: (name,item,_id) =>{
        console.log("item",item)
        return (
          <div>Nhiều sản phẩm</div>
        )
      }
    },

    {
      title: t('Phone number'),
      dataIndex: 'Phone_number',
      key: 'phone',
      render: (name,item,_id) =>{
        return (
          <div key={_id} className='avatar-product'>
            <span>{item.phone_number }</span>
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
    },

    {
      title: t('Created at'),
      dataIndex: 'time',
      key: 'time',
      render: (name,item,_id) =>{
        return (
          <div key={_id} className='avatar-product'>
            <span>{ fomatTime(item.orderDate) }</span>
          </div>
        )
      }
    },


    {
      title: t('Total money'),
      dataIndex: 'Total_money',
      key: 'money',
      render: (name,item,_id) =>{
        return (
          <div key={_id} className='avatar-product'>
            <span>{item.totalAmount.toLocaleString('vi', {style : 'currency', currency : 'VND'}) }</span>
          </div>
        )
      }
    },

    {
      title: t('Status'),
      dataIndex: 'status',
      key: 'money',
      render: (name,item,_id) =>{
        return (
          <div key={_id} className='avatar-product'>
            <span>{item.status}</span>
          </div>
        )
      }
    },


    
  
   
  ];
  



  return(
  
      <>
        <Topbar ToPage="/products/creat-product"/>
        <Table columns={columns} dataSource={listUser} />;
      </>
    )
  
}

export default OrderPage;