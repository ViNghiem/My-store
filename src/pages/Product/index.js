import {useEffect,useState} from 'react';
import axios from 'axios';
import { Table } from 'antd';
import {useTranslation}  from 'react-i18next';
import ActionProduct from './ActionProduct'
import React from "react";
import Topbar from '../../component/topbar';
import VeiwAction from './WeiwAction';
import{Success,Error} from "../../util/index"
import { axiosToken } from '../../util/ConfihAxios'


const Product = ()=>{
  const { t } = useTranslation();
  const [listProduct, setListProduct] = useState();

  useEffect(() => {
    if(listProduct) return ;
    const token = localStorage.getItem('accessToken')
    axiosToken.get(`http://127.0.0.1:3020/products/all`, {
        headers: {
          'token': `${token}`   
        },
    }).then((res)=>{
      console.log(res.data,"nghiem")
      const data = res.data
      const newdata = data.map(item =>({
        ...item,
        key:item._id
      }))



      setListProduct(newdata)
    })
  },[listProduct]);

  const DeleteProduct = (id)=>{
    const token = localStorage.getItem('accessToken')
    axiosToken.delete('http://127.0.0.1:3020/products/delete', {

    headers: {
      'token': `${token}`   
    },
      params: {
        id: id  
      }
    })
    .then(res => {
      const newdata = res.data.map(item =>({
        ...item,
        key:item._id
      }))
      setListProduct(newdata)
      Success(t("Xóa sản phẩm thành công"))
    })
    .catch(error => {
      console.log(error)
      Error(t(error.response.data))
    });
  }
  
 
  const columns = [
    {
      key:'1',
      title: t('Product name'),
      dataIndex: 'name',
      render: (name, { images },_id) =>{
        return (
          <div key={_id} className='avatar-product'>
            <img src={images[0]} alt='product img'/>
            <span>{name}</span>
          </div>
        )
      }
    },

    {
      key:'2',
      title: t('View'),
      dataIndex: 'slug',
      render: (_id,slug) => <VeiwAction key={_id+'1'} _id={_id} product={slug} />
    },

    


    {
      key:'3',
      title: t('Quantity'),
      dataIndex: 'quatity',
    },
    {
      key:'4',
      title: t('Price'),
      dataIndex: 'price',
      render: (price,_id) =><span key={_id+'2'}>{price.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</span>
    },
    {
      key:'5',
      title: t('Action'),
      dataIndex: '_id',
      render: (_id,slug) => <ActionProduct key={_id+'1'} _id={_id} Delete={DeleteProduct} />
    },
  ];



  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };


  
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: 'odd',
        text: 'Select Odd Row',
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },  
      {
        key: 'even',
        text: 'Select Even Row',
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };


  
  return(
    <>
    <Topbar ToPage="/products/creat-product"/>
    <Table rowSelection={rowSelection} columns={columns} dataSource={listProduct} />
    </>
   
  )




}

export default Product;