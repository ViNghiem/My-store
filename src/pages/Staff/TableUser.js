import { Table } from 'antd';
import {useTranslation}  from 'react-i18next';

import StateUser from './StateUser'

const TableUser = (props) =>{
  const { t } = useTranslation();
  const listUser = props.listUser
  const columns = [
    {
      title: t('Name'),
      dataIndex: 'name',
      key: 'name',
      render: (name,item,_id) =>{
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
        return(
          <StateUser User={item} />
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