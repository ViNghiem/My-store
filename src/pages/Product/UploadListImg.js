import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import { useState } from 'react';

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const UploadListImg = (prods) =>{
  let list =[]
  console.log(prods,"prods")
  const AddnewImages = prods.AddnewImages
  
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState(list);
  
  prods.listImage?.map((e,index) =>list.push({
    uid: index,
      name: 'image.png',
      status: 'done',
      url: e,
  }))


  const sendDataImg = (listfile)=>{
   AddnewImages(listfile)
  }


  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };
  const handleChange = ({ fileList: newFileList }) =>{
    console.log(newFileList,"newFileList")
    
    const dataImg = newFileList.map(obj => { 
      if(obj.response){
        console.log("link",obj.response.newFile.image_path )
        return obj.response.newFile.image_path 
      }else{
        return obj.url 
      }
    });
    sendDataImg(dataImg)
    console.log("dataImg",dataImg)
    setFileList(newFileList);

  }

 
  console.log(fileList.response?.newFile ,"fileListssssssss")







  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  return (  
    <>
      <Upload
        multiple = {true}
        action="http://localhost:3020/files/uploadphoto"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
       {fileList.length >= 8 ? null : uploadButton} 
      </Upload>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img
          alt="example"
          style={{
            width: '100%',
          }}
          src={previewImage}
        />
      </Modal>
    </>
  );
}

export default UploadListImg;