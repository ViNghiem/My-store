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

function notierror(text){
  toast.error(text, {
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
        },
       
    }).then((res)=>{
      const data = res.data
      setListProduct(data)
    })
  },[listProduct]);

  const DeleteProduct = (id)=>{
    const token = localStorage.getItem('accessToken')
    axios.delete('http://127.0.0.1:3020/products/delete', {

    headers: {
      'token': `${token}`   
    },

      params: {
        id: id  
      }
      



    })
    .then(res => {
      setListProduct(res.data)
      noti(t("Xóa sản phẩm thành công"))
    })
    .catch(error => {
      console.log(error)
      notierror(t(error.response.data))
    });
  }
  
  console.log(listProduct,"listProduct")
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
    <>
    <div class="d-flex nav-top-list">
      <div class="total-images">
        <span>Tất cả sản phẩm: </span><span>{listProduct?.length } sản phẩm</span>
      </div>
      <div class="d-flex">
        <div class="control-listfile">
          <span role="img" aria-label="upload" class="anticon anticon-upload">
            <svg viewBox="64 64 896 896" focusable="false" data-icon="upload" width="1em" height="1em" fill="currentColor" aria-hidden="true">
              <path d="M400 317.7h73.9V656c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V317.7H624c6.7 0 10.4-7.7 6.3-12.9L518.3 163a8 8 0 00-12.6 0l-112 141.7c-4.1 5.3-.4 13 6.3 13zM878 626h-60c-4.4 0-8 3.6-8 8v154H214V634c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v198c0 17.7 14.3 32 32 32h684c17.7 0 32-14.3 32-32V634c0-4.4-3.6-8-8-8z"></path></svg></span></div><div class="control-listfile"><span role="img" aria-label="delete" class="anticon anticon-delete"><svg viewBox="64 64 896 896" focusable="false" data-icon="delete" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"></path>
            </svg>
          </span>
        </div>
      </div>
    </div>
    <Table rowSelection={rowSelection} columns={columns} dataSource={listProduct} />
    </>
   
  )




}

export default Product;