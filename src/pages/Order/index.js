
import { Table } from 'antd';
import Topbar from '../../component/topbar';
import {useEffect,useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {useTranslation}  from 'react-i18next';
import {URLAPI} from '../../util/index'
import StaffOrder from './StaffOrder'
import {axiosToken} from'../../util/ConfihAxios'
import StateOrder from './StateOrder';

const OrderPage = ()=>{

  const navigate = useNavigate();
  const token = localStorage.getItem('accessToken')
  const [listUser, setListUser] = useState([]);
  const [Err, setErr] = useState();
  const [orderId, setOrderId] = useState();
  const { t } = useTranslation();

  console.log("asdhgashdgashdgashjgdsaj")
  const handleStatusUpdate = (orderId, newStatus) => {
    console.log('--------------------------',orderId)
    setOrderId(orderId)
  };

  const fomatTime = (time)=>{
    const date = new Date(time );
    const options = { day: '2-digit', month: '2-digit', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return date.toLocaleDateString('vi-VN', options);
  }

  useEffect(() => {
    axiosToken.get(`${URLAPI}/admin/orders/all`, {
        withCredentials: true,
        headers: {
          'token': `${token}`
        },
    }).then((res)=>{
      const data = res.data.data
      const newdata = data?.map(item =>({
        ...item,
        key:item._id
      }))
      setListUser(newdata)
    })
    .catch((err)=>{
      setErr(err.response.data)
      console.log('err',err)
    })
   if(orderId) return
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[orderId]);


console.log("------------listUser-----------",listUser)







  const columns = [
    {
      title: t('Customer'),
      dataIndex: 'name',
      key: 'name',
   
      render: (name,item,_id) =>{
       
        return (
          <div key={_id} onClick={ ()=>{navigate(`/orders/${item._id}`)}} className='avatar-product avatar-user'>
            <div className='name-avt  order'>{item.full_name.slice(0, 2)}</div>
            <span >{item.full_name}</span>
          </div>
        )
      }
    },

  

    {
      title: t('Phone number'),
      dataIndex: 'Phone_number',
      key: 'phone',
      render: (name,item,_id) =>{
        return (
          <div key={_id} className='avatar-product' onClick={ ()=>{navigate(`/orders/${item._id}`)}}>
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
          <div key={_id} className='avatar-product' onClick={ ()=>{navigate(`/orders/${item._id}`)}}>
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
          <div key={_id} className='avatar-product' onClick={ ()=>{navigate(`/orders/${item._id}`)}}>
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
          <div key={_id} className='avatar-product' onClick={ ()=>{navigate(`/orders/${item._id}`)}}>
            <span>{item.totalAmount.toLocaleString('vi', {style : 'currency', currency : 'VND'}) }</span>
          </div>
        )
      }
    },

    {
      title: t('Status'),
      dataIndex: 'status',
      key: 'moneys',
      render: (name,item,_id) =>{
        return (
          <StateOrder key={item._id} id={item._id} status ={item.status}  onUpdateStatus={handleStatusUpdate} />
        )
      }
    },

    {
      title: t('Assigned staff'),
      dataIndex: 'product',
      key: 'product',
      render: (name,item,_id) =>{
        return (
          <StaffOrder item={item} field='StaffHandlingLsy'/>
        )
      }
    },

      {
      title: t('Update status'),
      dataIndex: 'product',
      key: 'product',
      render: (name,item,_id) =>{
        return (
          <StaffOrder item={item} field='UpdateStatus'  />
        )
      }
    },

    
  ];


  

  



  return(
    Err ?
      <>
      Tài khoản phải là Admin
      </>
    :
      <>
        <Topbar ToPage="/products/creat-product"/>
        <Table columns={columns} dataSource={listUser} />
      </>
    )
  
}

export default OrderPage;