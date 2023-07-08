import { Collapse } from 'antd';
import {useTranslation}  from 'react-i18next';

const Attributes = ()=>{
  const { Panel } = Collapse;
  const { t } = useTranslation();

  return(
    <div className='product-info--block'>
        <Collapse accordion  defaultActiveKey={['1']}>
            <Panel header= {t("Model information")} key="1">
               <div className='class="ant-collapse-content-box"'>
                < div className="ant-row">
                    <div className="ant-col ant-col-14">
                      <label style={{ fontSize: 16 }}>Tạo mẫu mã</label>
                      <div style={{ color: "rgb(140, 140, 140)" }}>
                        Thêm mẫu mã sản phẩm được sử dụng quản lý sản phẩm có những hình thái khác
                        nhau như: size, màu sắc,...
                      </div>
                    </div>
                    <div className="ant-col ant-col-10">
                      <div className="product-info--block__header" style={{ margin: 0 }}>
                        <div className="block-title" />
                      </div>
                    </div>
                  </div>


                  <div className='form-section'>
                    <ul className='variant-list'>
                      <li className="variant-item variant-header" style={{ paddingTop: 16 }}>
                        <span
                          className="variant-item--name"
                          style={{ color: "rgb(89, 89, 89)", fontWeight: "normal" }}
                        >
                          Tên thuộc tính
                        </span>
                        <span
                          className="variant-item--property"
                          style={{ color: "rgb(89, 89, 89)", fontWeight: "normal" }}
                        >
                          Giá trị thuộc tính
                        </span>
                      </li>

                    </ul>
                  </div>


               </div>
            </Panel>
        </Collapse>
      </div>
   

  )
}

export default Attributes