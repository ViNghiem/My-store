import axios from "axios";
import { useState,useEffect } from "react";
import FileCollection from './fileCollection'
import {DeleteOutlined,UploadOutlined} from'@ant-design/icons'
import {useTranslation}  from 'react-i18next';
// import dotenv from 'dotenv'
// dotenv.config();
import { Alert, Spin } from 'antd';
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
function Collection() {
  const { t } = useTranslation();
  const [ listfile, setListFile] = useState([]);
  const [fileChange, setFileChange] = useState([]);

  const handleChange = (value) => {
    let newlist = [];
    if(fileChange.includes(value)){
      newlist = [...fileChange.filter(item => item !== value)]
    }else{
      newlist = [...fileChange,value]
    }
    setFileChange(newlist);
  };


  const handleDelete = async (data) =>{
    console.log(data,"data")
    axios.delete('http://localhost:3020/files/deletes', {
      params: {
        data: data
      },
    })
    .then(function (response) {
      
      setListFile(response.data)
      noti("xóa thành công")
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {
      console.log("sadhjsahjsajdh")
    });

  }


  

  console.log("fileChange",fileChange)

  useEffect(() => {
    axios.get('http://localhost:3020/files/imag', {
    })
    .then(function (response) {
      setListFile(response.data)
     
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {
    });

  },[]);


  





  return (
    <>
    {listfile?
    <div className="media-table">
      <div className="d-flex nav-top-list">
        <div className="total-images">
          <span>{t('All photos')}: </span>
          {
            listfile.length > 0? <span>{listfile.length} {t('Photo')}</span>:<></>
          }
        </div>
        
        <div className="d-flex">
          <div className="control-listfile">
            <UploadOutlined />
          </div>
          <div className="control-listfile" onClick={()=>handleDelete(fileChange)}>
            <DeleteOutlined />
          </div>
        </div>
      </div>
      <div className="row">
        { listfile ?
          listfile.map((elm) => (
            <div className="col-md-2"  key={elm.asset_id} style={{ margin: "10px 0" }}>
              <FileCollection 
                create = {elm.created_at}
                handleChange ={handleChange}
                Capacity = {elm.bytes}
                format = {elm.format}
                public_id = {elm.public_id}
                url={elm.url}
              />
            </div>
          ))
          : <Spin tip="Loading...">
          <Alert
            message="Alert message title"
            description="Further details about the context of this alert."
            type="info"
          />
        </Spin>
        }
      </div>
    </div>
    :
    <Spin tip="Loading...">            
          </Spin>
    
    }

  </>
  );
}

export default Collection;