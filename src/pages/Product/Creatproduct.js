import TinyMCEEditor from './TinyMCEEditor'
import { Collapse } from 'antd';
import { Input } from 'antd';
import {useTranslation}  from 'react-i18next';
import {  Select } from 'antd';
import axios from 'axios';
import slugify from 'slugify';
// import SelectTag from '../../component/SelectTag'
import UploadListImg from './UploadListImg'
// import Attributes from './Artributes'
import { useState ,useEffect} from 'react';
import{Success,Error} from "../../util/index"
const CreatProduct = () =>{

  const [lisCategory,setListCategory] = useState()
  const [disception,setDisception] = useState('') 
  const [nameProduct, setNameProduct] = useState('');
  const [priceProduct, setPriceproduct] = useState('');
  const [listImages, setListimages] = useState([]);
  const [selectedCate, setSelectedcate] = useState([]);
  const { t } = useTranslation();
  const { Panel } = Collapse;

  const getContent = (content) => {
    console.log(content,"contentsssssssssssssss")
    setDisception(content)
  };

 

  const AddnewImages = (data) => {
   console.log("dataimagesssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",data)
    setListimages(data)

  };



const handleInputChange = (event) => {
  setNameProduct(event.target.value);
};

const handlePrice = (event) => {
  setPriceproduct(event.target.value);
};





  useEffect(() => {
    if(lisCategory) return ;
   
    axios.get(`'https://leaningapinodejs.onrender.com/admin/categories/all`,)
    .then((res)=>{
      console.log(res.data,"nghiem")
      const data = res.data.data
      console.log(typeof data)
      const newdata = data?.map(item =>({
        label:item.name,
        value:item._id
      }))
      console.log(newdata,"newdata")
      setListCategory(newdata)

     
    })
  },[lisCategory]);



  const handleSelectChange = (values) => {
    setSelectedcate(values);
  };








const CreateProduct = ()=> {
  const url = 'https://leaningapinodejs.onrender.com/products/add';
  const slug = slugify(nameProduct, {
    replacement: '-',
    lower: true,
    remove: /[*+~.()'"!:@]/g,
    locale: 'vi',
  });
  const newProduct = {
    name:nameProduct,
    description:disception,
    price:priceProduct,
    images:listImages,
    slug:slug,
    quatity:500,
    categories:selectedCate,
  }
  axios.post(url, newProduct)
    .then(res => {
      Success("Thêm sản phẩm thành công")
    })
    .catch(error => {
      Error(error.response.data)
      console.error('Lỗi khi gửi yêu cầu PUT:', error);
    });

   


}




  return (
    <div className='box-edit'>
      <div className='title-bar--wrapper'>
        <div className="title-bar" style={{marginBottom: "20px"}}>
          <div className="title-bar--main is-flex is-flex--space-between">
            <div className="title-bar--main-left">
              <div className="title-bar--main__text">Thêm mới Sản Phẩm</div>
              <div className="title-bar--main__action ">
                <div className="action-bar--top">
                
                </div>
              </div>
            </div>
            <div className="title-bar--main-right">
              <div className="com-button">
                <button type="button" className="ant-btn created_new_white"><span>Huỷ</span></button>
              </div>
              <div className="com-button style-primary"><button onClick={CreateProduct} type="button" className="ant-btn created_new_green l-save-bt ant-btn-primary"><span>Lưu sản phẩm</span></button></div>
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
                    value={nameProduct} onChange={handleInputChange}
                    className="ant-input"
                  />
                </div>
                <div className="form-section is-flex-1 ml-40">
                  <label>{t('Price')}</label>
                  <div className="com-dropdown">
                    <div className="editable ant-dropdown-trigger" data-placeholder="">
                      <Input type="text" className="ant-input"  value={priceProduct} onChange={handlePrice} />
                    </div>
                  </div>  
                </div>
              </div>
              <div className="form-section">
                <label>{t('Describe')}</label>
                <TinyMCEEditor valueId='diception' getcontent={getContent}/>
              </div>
              <div className="is-flex">
                <div className="form-section is-flex-1">
                  <label>{t('Category')}</label>
                  <Select onChange={handleSelectChange}  mode="multiple" options={lisCategory}  style={{ width: '100%',}}/>
                </div>
                <div className="form-section is-flex-1 ml-40">
                  <label>{t('Tag')}</label>
                  <Select   mode="tags" style={{ width: '100%',}}/>
                </div>
              </div>
              </Panel>
            </Collapse>
        </div>
        <div className='product-info--block'>
              <Collapse accordion  defaultActiveKey={['1']}>
                  <Panel header= {t("Image product")} key="1">
                      <UploadListImg AddnewImages={AddnewImages}  />
                  </Panel>
              </Collapse>
        </div>

       



      </div>
    </div> 
  )
}

export default CreatProduct