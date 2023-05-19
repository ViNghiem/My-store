import { useTranslation } from 'react-i18next';
import React from "react";

import { Dropdown, Space } from 'antd';
import { useState } from 'react';



const LanguageSelector = () => {

  const { i18n } = useTranslation();
  const [language, setLanguage] = useState('https://media3.scdn.vn/img4/2020/11_19/cv2cZgOcbETuBnJTMRCq_simg_b5529c_250x250_maxb.jpg');

  const changeLanguage = (lng,img) => {
    i18n.changeLanguage(lng);
    setLanguage(img)
  };


const items = [
  {
    label: (
      <div className='d-fex contry' onClick={() => changeLanguage('vi','https://media3.scdn.vn/img4/2020/11_19/cv2cZgOcbETuBnJTMRCq_simg_b5529c_250x250_maxb.jpg')}>
         <img src='https://media3.scdn.vn/img4/2020/11_19/cv2cZgOcbETuBnJTMRCq_simg_b5529c_250x250_maxb.jpg' alt=''/>
         <span>Viet nam</span>
      </div>
    ),
    key: '0',
  },
  {
    label: (
      <div className='d-fex contry' onClick={() => changeLanguage('en','https://vuongquocanh.com/wp-content/uploads/2018/04/la-co-vuong-quoc-anh.jpg')}>
      <img src='https://vuongquocanh.com/wp-content/uploads/2018/04/la-co-vuong-quoc-anh.jpg' alt=''/>
      <span>English</span>
   </div>
    ),
    key: '1',
  },
  
];




 return (
  <Dropdown
  menu={{
    items,
  }}
  >
  
    <Space>
      <div className='contry'>
        <img src={language} alt=''/>
     </div>
    </Space>

</Dropdown>
 )


};
export default LanguageSelector;

