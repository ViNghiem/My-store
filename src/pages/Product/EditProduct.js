import { Collapse } from 'antd';
import TinyMCEEditor from './TinyMCEEditor'
import  { useState ,useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {useTranslation}  from 'react-i18next';
import { Input } from 'antd';
import {  Spin } from 'antd';
import UploadListImg from './UploadListImg';
import ModelDelete from './modelDelete'
import {URLAPI} from '../../util/index'
import slugify from 'slugify';


const EditorProduct = () => {
  const { t } = useTranslation();
  const { Panel } = Collapse;
  const [product, setProduct] = useState();
  const [slug, setSlug] = useState();
  const [discetion, setDiscetion] = useState();
  const [listImages, setListImages] = useState([]);
  const [name,setName] = useState()
  const PamramsID = useParams();
  const [priceProduct, setPriceproduct] = useState('');


  useEffect(() => {
    if(product) return ;
    axios.get(`${URLAPI}/products/${PamramsID}`, {
        params: { product: PamramsID }
    }).then((res)=>{
      const data = res.data
      setPriceproduct(data.price)
      setListImages(data.images)
      setProduct(data)
      setName(data.name)
      setSlug(data.slug)
    })
  },[PamramsID, product]);

  const getContent = (content) => {
    setDiscetion(content);
  };
  const refreshPage =()=>{
    window.location.reload()
  }

  const openLink = (link) =>{
    window.open(`${URLAPI}/product/${link}`, "_blank")
  }

  const AddnewImages = (data) => {
    console.log("---------anh--------",data)
    
    setListImages(data)
  };


const getNameProduct =(event)=>{
  const slugNew = slugify(event.target.value, {
    replacement: '-',
    lower: true,
    remove: /[*+~.()'"!:@]/g,
    locale: 'vi',
  });
  setName(event.target.value);
  setSlug(slugNew)
}

const handlePrice = (event) => {
  setPriceproduct(event.target.value);
};

const newProduct = {
  id:PamramsID.id,
  name:name,
  description:discetion,
  price:priceProduct,
  images:listImages,
  slug:slug
}

console.log(newProduct,"Product update")


const UpdateProduct = (data)=>{
  axios.put(`${URLAPI}/products/update`, {
      newProduct:newProduct
  })
  .then(res => {
    console.log(res)
     setProduct(res.data)

  })
  .catch(error => {
    console.log("error",error)
    console.log(error)
  });


};




  return(
    <div className='box-edit'>
      {product? 
        <div className="title-bar--wrapper">
          <div className="title-bar">
        <div className="title-bar--main is-flex is-flex--space-between">
          <div className="title-bar--main-left">
            <div className="title-bar--main__text">{product?.name}</div>
            <div className="title-bar--main__action ">
              <div className="action-bar--top">
               
                <div className="action-bar--top__item" onClick={ ()=>{openLink(product.slug)}}>
                  <div className="action-icon">
                    <svg width={16} height={12} viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.6822 5.5404C13.9894 1.97433 11.4305 0.179688 8.0001 0.179688C4.56796 0.179688 2.01082 1.97433 0.31796 5.54219C0.250059 5.68597 0.214844 5.843 0.214844 6.00201C0.214844 6.16102 0.250059 6.31805 0.31796 6.46183C2.01082 10.0279 4.56975 11.8225 8.0001 11.8225C11.4322 11.8225 13.9894 10.0279 15.6822 6.46004C15.8197 6.17076 15.8197 5.83504 15.6822 5.5404ZM8.0001 10.5368C5.11975 10.5368 3.01082 9.07612 1.52332 6.00112C3.01082 2.92612 5.11975 1.4654 8.0001 1.4654C10.8805 1.4654 12.9894 2.92612 14.4769 6.00112C12.9912 9.07612 10.8822 10.5368 8.0001 10.5368ZM7.92868 2.85826C6.19296 2.85826 4.78582 4.2654 4.78582 6.00112C4.78582 7.73683 6.19296 9.14397 7.92868 9.14397C9.66439 9.14397 11.0715 7.73683 11.0715 6.00112C11.0715 4.2654 9.66439 2.85826 7.92868 2.85826ZM7.92868 8.00112C6.82332 8.00112 5.92868 7.10647 5.92868 6.00112C5.92868 4.89576 6.82332 4.00112 7.92868 4.00112C9.03403 4.00112 9.92868 4.89576 9.92868 6.00112C9.92868 7.10647 9.03403 8.00112 7.92868 8.00112Z" fill="#595959" />
                    </svg>
                  </div>
                  <div className="action-title">{t("View")}</div>
                </div>
               
                <div className="action-bar--top__item" onClick={refreshPage}>
                  <div className="action-icon">
                    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.0912 2.59464L14.0841 3.38214C12.7109 1.62679 10.5751 0.5 8.17693 0.5C4.03586 0.5 0.684074 3.84821 0.678717 7.99107C0.67336 12.1375 4.03229 15.5 8.17693 15.5C11.4144 15.5 14.1734 13.4464 15.2234 10.5696C15.2501 10.4946 15.2109 10.4107 15.1359 10.3857L14.1234 10.0375C14.0881 10.0254 14.0494 10.0276 14.0157 10.0436C13.982 10.0596 13.9559 10.0882 13.943 10.1232C13.9109 10.2125 13.8751 10.3018 13.8376 10.3893C13.5287 11.1214 13.0859 11.7786 12.5216 12.3429C11.9618 12.9036 11.2991 13.3511 10.5698 13.6607C9.81443 13.9804 9.00907 14.1429 8.1805 14.1429C7.35015 14.1429 6.54657 13.9804 5.79122 13.6607C5.06117 13.3524 4.39822 12.9048 3.83943 12.3429C3.27818 11.7832 2.83119 11.1197 2.52336 10.3893C2.20372 9.63214 2.04122 8.82857 2.04122 7.99822C2.04122 7.16786 2.20372 6.36429 2.52336 5.60714C2.83229 4.875 3.27515 4.21786 3.83943 3.65357C4.40372 3.08929 5.06086 2.64643 5.79122 2.33571C6.54657 2.01607 7.35193 1.85357 8.1805 1.85357C9.01086 1.85357 9.81443 2.01607 10.5698 2.33571C11.2998 2.64401 11.9628 3.09164 12.5216 3.65357C12.6984 3.83036 12.8644 4.01786 13.018 4.21429L11.943 5.05357C11.9217 5.07003 11.9055 5.09215 11.8963 5.1174C11.887 5.14265 11.8851 5.16999 11.8907 5.1963C11.8963 5.2226 11.9092 5.24679 11.9279 5.26608C11.9467 5.28537 11.9704 5.29899 11.9966 5.30536L15.1323 6.07322C15.2216 6.09464 15.3091 6.02679 15.3091 5.93572L15.3234 2.70536C15.3216 2.5875 15.1841 2.52143 15.0912 2.59464Z" fill="#595959" />
                    </svg>
                  </div>
                  <div className="action-title">{t("Refrest")}</div>
                </div>
                <div className="action-bar--top__item">
            
                 
                  <ModelDelete idProduct={product?._id}/>
                </div>
              </div>
            </div>
          </div>
          <div className="title-bar--main-right">
            <div className="com-button">
              <button type="button" className="ant-btn created_new_white"><span>Huỷ</span></button>
            </div>
            <div className="com-button style-primary"><button onClick={UpdateProduct} type="button" className="ant-btn created_new_green l-save-bt ant-btn-primary"><span>Lưu sản phẩm</span></button></div>
          </div>
        </div>
           </div>

          <div className='product-info--block'>
          <Collapse accordion  defaultActiveKey={['1']}>
            <Panel header= {t("PRODUCT INFORMATION")} key="1">
            <div className="is-flex">
              <div className="form-section is-flex-1">
                <label>{t('Product name')}</label>
                <Input
                  placeholder="Thêm tên sản phẩm..."
                  type="text"
                  className="ant-input"
                  defaultValue = { product?.name }
                  onChange={getNameProduct}
                />
              </div>
              <div className="form-section is-flex-1 ml-40">
                <label>{t('Price')}</label>
                <div className="com-dropdown">
                  <div className="editable ant-dropdown-trigger" data-placeholder="">
                    <Input onChange={handlePrice} type="text" className="ant-input" defaultValue={product?.price} />
                  </div>
                </div>  
              </div>
            </div>
            <div className="form-section">
              <label>{t('Describe')}</label>
              <TinyMCEEditor valueId='diception' initialValue={  product?.description} getcontent={getContent}/>
           
            </div>
            </Panel>
          </Collapse>
          </div>

          <div className='product-info--block'>
          <Collapse accordion  defaultActiveKey={['1']}>
              <Panel header= {t("Image product")} key="1">
                  <UploadListImg listImage={product.images} AddnewImages={AddnewImages}/>
              </Panel>
          </Collapse>
          </div>
        </div>
        :
        <>
            <Spin tip="Loading...">            
          </Spin>
        </>
      }
     
    </div>
  )

}

export default EditorProduct;