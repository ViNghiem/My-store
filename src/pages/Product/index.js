import {useEffect,useState} from 'react';
import axios from 'axios';
import { Table } from 'antd';
import {useTranslation}  from 'react-i18next';
import ActionProduct from './ActionProduct'
import React from "react";
import {  toast } from 'react-toastify';

function noti(text){
  toast.success(text, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
    });
}

const Product = ()=>{
  const { t } = useTranslation();
  const [listProduct, setListProduct] = useState();

  useEffect(() => {
    if(listProduct) return ;
    const token = localStorage.getItem('accessToken')
    axios.get(`http://127.0.0.1:3020/products/all`, {
        headers: {
          'token': `${token}`
        }
    }).then((res)=>{
      const data = res.data
      setListProduct(data)
    })
  },[listProduct]);

  const DeleteProduct = (id)=>{
    axios.delete('http://127.0.0.1:3020/products/delete', {
      params: {
        id: id
      }
    })
    .then(res => {
      setListProduct(res.data)
      noti(t("Xóa sản phẩm thành công"))
    })
    .catch(error => {
      
    });
  }
  
  
  const columns = [
    {
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
      title: t('slug'),
      dataIndex: 'slug',
    },

    {
      title: t('Price'),
      dataIndex: 'price',
      render: (price,_id) => <span key={_id}>{price.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</span>
    },
    {
      title: t('Action'),
      dataIndex: '_id',
      render: (_id,slug) => <ActionProduct _id={_id} Delete={DeleteProduct} />
    },
  ];



  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
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
    <Table rowSelection={rowSelection} columns={columns} dataSource={listProduct} />
  )




}

export default Product;