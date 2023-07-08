import {  useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import React from "react";
import { PlusOutlined ,LoadingOutlined} from '@ant-design/icons';
import { Upload, message} from 'antd';
import { useState } from 'react';
import axios from 'axios';
import { Input } from 'antd';
import Store from '../../store';
import { loginUser } from '../../redux/actions/UserAction'
import {  toast } from 'react-toastify';

function noti(text){
  toast.success(text, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
    });
}

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};


const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};






const InfoUser = ()=>{
 

  const UserInfo =  useSelector((state) => state.user.user )
  console.log("UserInfo",UserInfo)
  const [imageUrl, setImageUrl] = useState(UserInfo?.avartar);
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [avartar,setAvatar]=useState(UserInfo?.avartar)
  const [newName,setName] = useState(UserInfo?.username)
  const [newPhone,setPhone] = useState(UserInfo?.phone)
  
  console.log("imageUrl",imageUrl)

  const handleChange = (info) => {
   
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      console.log(info.file,"aasdfghjklkjhgfdsdfghjklkjhgfddfghjkl")
      getBase64(info.file.originFileObj, (url) => {
        setAvatar(info.file.response.secure_url)
        setLoading(false);
        console.log("url",url)
        setImageUrl(url);
      });
    }
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );


  const UpdateProfile = (e)=>{
    e.preventDefault();
    const url = 'http://localhost:3020/user/update';
    const data = { 
      id: UserInfo._id,
      username: newName,
      phone:newPhone,
      avartar: avartar
    };
  
  
    console.log("data",data)
    axios.put(url, data)
      .then(response => {
        Store.dispatch(loginUser(response.data))
        noti("update thành công")
      })
      .catch(error => {
        console.error('Lỗi khi gửi yêu cầu PUT:', error);
      });
  
  }
  
  



  return (
    <>
    {UserInfo?
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-3 col-xlg-3 col-md-12">
          <div className="white-box">
            <div className="user-bg">
              <img src="https://res.cloudinary.com/dhef1t1iu/image/upload/v1680598170/iwo6boictrox64hkmdef.jpg" alt="avatar"/>
              <div className="overlay-box">
                {
                  UserInfo ?
                  <div className="user-content">
                    <img src={UserInfo?.avartar } className="thumb-lg img-circle" alt="img"/>
                    <h4 className="text-white mt-2">{ UserInfo.username}</h4>
                    <h5 className="text-white mt-2">{UserInfo.email}</h5>
                  </div>:<></>
                 }
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-8 col-xlg-9 col-md-12">
          <div className="card">
              <div className="card-body">
                <form className="form-horizontal form-material" onSubmit={UpdateProfile}>
                    <div className="form-group mb-4">
                      <label className="col-md-12 p-0">{t('Full Name')}</label>
                      <div className="col-md-12  p-0">
                        <Input placeholder={UserInfo?.username} onChange={(e)=>setName(e.target.value)} defaultValue={UserInfo?.username} />
                      </div>
                    </div>
                    <div className="form-group mb-4">
                      <label htmlFor="example-email" className="col-md-12 p-0">Email</label>
                      <div className="col-md-12 p-0">
                        {
                          UserInfo ?  <input disabled type="email" value={UserInfo?.email} onChange={(e)=>setPhone(e.target.value)} className="form-control p-0 border-0" name="example-email" id="example-email" />
                          :
                          <input type="email" placeholder="" className="form-control p-0 border-0" name="example-email" id="example-email" />
                        }
                      </div>
                    </div>
                
                    <div className="form-group mb-4">
                      <label className="col-md-12 p-0">{t('Phone number')}</label>
                      <div className="col-md-12 p-0">
                        <Input   placeholder={UserInfo?.phone} onChange={(e)=>setPhone(e.target.value)} defaultValue={UserInfo?.phone} />
                      </div>
                    </div>
                    <div className="form-group mb-4">
                      <label className="col-md-12 p-0">{t('Avatar')}</label>
                      <div className='row'>
                        <div className='col-md-4 p-0 d-flex my-avatar'>
                        {
                        <Upload
     
                            listType="picture-circle"
                            className="avatar-uploader"
                            showUploadList={false}
                            action="http://localhost:3020/files/uploadphoto"
                            beforeUpload={beforeUpload}
                            onChange={handleChange}
                          >
                            {imageUrl ? (
                              <img
                                src={imageUrl}
                                alt="avatar"
                                style={{
                                  width: '100%',
                                  height: '100%',
                                }}
                              />
                            ) : (
                              uploadButton
                            )}
                          </Upload>
                        }

                        </div>
                        <div className='col-md-8 p-0'>
                          <div className='box-update'>
                            
                          </div>  
                        </div>
                      </div>
                    </div>
                  
                    <div className="form-group mb-4">
                      <div className="col-sm-12">
                          <button className="btn btn-success" >Update Profile</button>
                      </div>
                    </div>
                </form>
              </div>
          </div>
        </div>
      </div>
    </div>
     :<></>}

  </>
    
  )

}
export default InfoUser;