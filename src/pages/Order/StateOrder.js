import {  Popover } from 'antd';
import {CheckCircleOutlined,CloseCircleOutlined,GiftOutlined} from '@ant-design/icons'
import {axiosToken} from'../../util/ConfihAxios'
import {URLAPI} from '../../util/index'
import {useTranslation}  from 'react-i18next';
import  { useState } from 'react';
const StateOrder = (props)=>{
  const { t } = useTranslation();
  const id = props.id
  const [status, setStatus] = useState(props.status);
  const updateOrder = (id,state)=>{
    const token = localStorage.getItem('accessToken');
    const url = `${URLAPI}/admin/orders/update`;
      const  dataUpdate={
              id:id,
             state:state
          }
      const headers = {
        token:token
      };

      axiosToken.post(url, dataUpdate, { headers })
        .then(response => {
          const dataa = response.data
          setStatus(dataa.order.status)
          props.onUpdateStatus(dataa)
        })
        .catch(error => {
          console.error('Error:', error);
        });
  }
  

switch (status) {
  case `pending`:
    return  (
      <Popover
        content={
        <>
          <div className='poiter center-flex state-order' onClick={()=>updateOrder(id,'Confirm')}><CheckCircleOutlined /><span>{t('Confirm')}</span></div>
          <div className='poiter  center-flex state-order'  onClick={()=>updateOrder(id,'Cancel order')}><CloseCircleOutlined /> <span>{t('Cancel order')}</span></div>
        </>
      }
      trigger="hover"
      >
        <div className='approved state-order'>{t(status)}</div>
      </Popover>
    )
  case `Cancel order`:
    return (
        <div className='poiter state-order cancel'>{t(`Cancel order`)}</div>
     )
  case `Confirm`:
    return (
      <Popover
        content={
        <>
          <div className='poiter center-flex state-order' onClick={()=>updateOrder(id,'shipped')}><GiftOutlined /><span>{t('Shipping')}</span></div>
          <div className='poiter  center-flex state-order'  onClick={()=>updateOrder(id,'Cancel order')}><CloseCircleOutlined /> <span>{t('Cancel order')}</span></div>
        </>
      }
      trigger="hover"
      >
        <div className='approved state-order'>{t(status)}</div>
      </Popover>
      )

  case `shipped`:
    return (
      <Popover
        content={
        <>
          <div className='poiter center-flex state-order' onClick={()=>updateOrder(id,'delivered')}><GiftOutlined /><span>{t('Delivered')}</span></div>
          <div className='poiter  center-flex state-order'  onClick={()=>updateOrder(id,'Refund-form')}><CloseCircleOutlined /> <span>{t('Refund form')}</span></div>
        </>
      }
      trigger="hover"
      >
        <div className='approved state-order'>{t(status)}</div>
      </Popover>
      )
  case `Refund-form`:
      return (
          <div className='poiter state-order cancel'>{t(`Refund form`)}</div>
        )
  case `delivered`:
    return (
        <div className='poiter state-order cancel delivered'>{t(`Delivered`)}</div>
      )

  default:
    return (
      <Popover
      content={
      <>
      <div className='poiter'>1</div>
      <div className='poiter'>2</div>
      </>
    }
      trigger="hover"
      >
        <div className='approved state-order'>{t(status)}</div>
      </Popover>
     )
}
}

export default StateOrder;
