import {  Modal,Button } from 'antd';
import { useState } from 'react';
import {useTranslation}  from 'react-i18next';
import axios from 'axios';
import {  toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {URLAPI} from '../../util/index'
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



const ModelDelete =(prods)=>{
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {

  axios.delete(`${URLAPI}/products/delete`, {
        params: {
          id: prods.idProduct
        }
      })
      .then(res => {
        setOpen(false)
        navigate('/products')
        noti(t("Xóa sản phẩm thành công"))
        
      })
      .catch(error => {
        
      });

      setTimeout(() => {
        setLoading(false);
      
      }, 3000);
    };


  const handleCancel = () => {
    setOpen(false);
  };  



  return(
    <>
    <div className="action-icon" onClick={showModal}>
        <svg width={14} height={16} viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.28544 2.14118H4.14258C4.22115 2.14118 4.28544 2.0769 4.28544 1.99833V2.14118H9.71401V1.99833C9.71401 2.0769 9.77829 2.14118 9.85687 2.14118H9.71401V3.4269H10.9997V1.99833C10.9997 1.36797 10.4872 0.855469 9.85687 0.855469H4.14258C3.51222 0.855469 2.99972 1.36797 2.99972 1.99833V3.4269H4.28544V2.14118ZM13.2854 3.4269H0.714007C0.397935 3.4269 0.142578 3.68225 0.142578 3.99833V4.56976C0.142578 4.64833 0.206864 4.71261 0.285435 4.71261H1.36401L1.80508 14.0519C1.83365 14.6608 2.33722 15.1412 2.94615 15.1412H11.0533C11.664 15.1412 12.1658 14.6626 12.1944 14.0519L12.6354 4.71261H13.714C13.7926 4.71261 13.8569 4.64833 13.8569 4.56976V3.99833C13.8569 3.68225 13.6015 3.4269 13.2854 3.4269ZM10.9158 13.8555H3.08365L2.65151 4.71261H11.3479L10.9158 13.8555Z" fill="#595959" />
        </svg>
      </div>

      <div className="action-title" onClick={showModal}> {t("Delete")}</div>
      <Modal
        open={open}
        title={t("Delete")}
        onOk={handleOk}
        onCancel={handleCancel}

        centered={true}
        footer={[
          <Button key="back" onClick={handleCancel}>
          {t("Cancel")}
          </Button>,

          <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
          {t("Delete")}
          </Button>

         
        ]}
      >
        {t("Product deletion confirmation")}
      </Modal>






    </>
  )
}

export default ModelDelete;