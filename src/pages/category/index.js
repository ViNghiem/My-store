import { Table } from 'antd';
import Topbar from '../../component/topbar';
import {useEffect,useState} from 'react';
import axios from 'axios';
import {useTranslation}  from 'react-i18next';
import ActionCate from './ActionCate'
import {URLAPI} from '../../util/index'



const Categori = ()=>{
  const [listCategori, setListCategori] = useState();
  const { t } = useTranslation();
  useEffect(() => {
    if(listCategori) return ;
    const token = localStorage.getItem('accessToken')
    axios.get(`${URLAPI}/admin/categories/all`, {
        headers: {
          'token': `${token}`   
        },
    }).then((res)=>{
      console.log(res.data,"nghiem")
      const data = res.data.data
      console.log(typeof data)
      const newdata = data.map(item =>({
        ...item,
        key:item._id
      }))



      setListCategori(newdata)
    })
  },[listCategori]);

  const columns = [
    {
      title: t('Category'),
      dataIndex: 'name',
      key: 'name',
      render: (name,item,_id) =>{
        return (
          <div key={_id} className='avatar-product'>
            <img src={item.Image} alt='product img'/>
            <span>{name}</span>
          </div>
        )
      }
    },
    {
      title: t('Quantity'),
      dataIndex: 'Qualiti',
      key: 'age',
      render: (name,item,_id) =>{
        return (
          <div key={_id} className='avatar-product'>
            <span>{item?.listProduct.length+' '+ t('Product') }</span>
          </div>
        )
      }
    },
    {
      key:'5',
      title: t('Action'),
      dataIndex: '_id',
      render: (_id,slug) => <ActionCate />
    },
   
  ];
  
  

  
  

console.log("listCategori",listCategori)

  return(
    <>
      <Topbar ToPage="/products/creat-product"/>
      <Table columns={columns} dataSource={listCategori} />;
    </>
  )
}

export default Categori