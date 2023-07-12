import { Table } from 'antd';
import {useTranslation}  from 'react-i18next';
import {  Popover } from 'antd';


const TableUser = (props) =>{
  const { t } = useTranslation();
  const listUser = props.listUser
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
    },

    {
      title: t('Status'),
      dataIndex: 'role',
      key: 'age',
      render: (name,item,_id) =>{
        console.log("item",item)
        return (
          <>
          {item.isAdmin?
             <div className={item.role ==='pending'? 'pending' : 'approved' }>Admin</div>
            :
            <Popover
              content={<div className='poiter'>{item.role ==='pending'? t('approved') : t('pending') }</div>}
              trigger="hover"
            >
              <div className={item.role ==='pending'? 'pending' : 'approved' }>{t(item.role)}</div>
            </Popover>

          }
          </>
          


          // <div key={_id} className='avatar-product'>
          //   <span>{item.role }</span>
          // </div>
        )
      }
    }

  
   
  ];








  return(
    <>
    <Table columns={columns} dataSource={listUser} />;
    
    
    
    
    
    </>
  )
}

export default TableUser;