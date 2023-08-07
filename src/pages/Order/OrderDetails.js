
import { useParams } from 'react-router-dom';
import {URLAPI} from '../../util/index'
import {axiosToken} from'../../util/ConfihAxios'
import {useEffect,useState} from 'react';
import { Divider, Space, Tag } from 'antd';
import ListItemOrder from './ListItemorder'
import { Col, Row } from 'antd';
import { Input } from 'antd';
const { TextArea } = Input;


const fomatTime = (time)=>{
  const date = new Date(time );
  const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };

  return date.toLocaleDateString('vi-VN', options);
}

const OrderDetails =()=>{
  const [data, setData] = useState();
  const PamramsID = useParams();
  const id = PamramsID.id
  const token = localStorage.getItem('accessToken')
  useEffect(() => {
    if(data) return ;
    axiosToken.get(`${URLAPI}/admin/orders/info`, {
      withCredentials: true,
        headers: {
          'token': `${token}`
        },
        params:{id:id}
    }).then((res)=>{
      console.log(res.data,"nghiem")
      setData(res.data)
    
    })
    .catch((err)=>{
      console.log(err)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  console.log('sadsadsasa',data)
  return (
    data?
      <div className='box-order'>
          <div className='hearde-order'>
            <div className='d-flex'>
              <div className='id-order'>
                <Tag className='tag-idOrder' color="#027a48" style={{height:'48px'}}>#{data.orderInfo._id}</Tag>
              </div>
              <div className='state-order'>
                <div><b>Trạng thái: </b>{data.orderInfo.status}</div>
                <div><b>Tạo lúc: </b>{ fomatTime(data.orderInfo.orderDate)}</div>
              </div>             
            </div>
            <div className="box-list-item-order">
              <ListItemOrder listItem={data.items} />
            </div>
          </div>

          <div className="infor-payment">
          <Row className='beetwen'>
            <Col span={12} style={{ paddingRight: '10px'}}>
              <div className="box-payinfo">
                <h6 className="wrap-order-payment--title">Thông tin đơn hàng</h6>
                <ul className='List-item-pay'>
                  <li className='d-flex between center-items itempay'>
                    <div className='d-flex center-items'>
                      <svg className="mr-5" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.6665 2H0.666504V10.6667H10.6665V2Z" stroke="#262626" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"></path><path d="M13.3332 5.33331H10.6665V10.6666H15.3332V7.33331L13.3332 5.33331Z" stroke="#262626" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"></path><path d="M3.66667 14C4.58714 14 5.33333 13.2538 5.33333 12.3334C5.33333 11.4129 4.58714 10.6667 3.66667 10.6667C2.74619 10.6667 2 11.4129 2 12.3334C2 13.2538 2.74619 14 3.66667 14Z" stroke="#262626" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"></path><path d="M12.3332 14C13.2536 14 13.9998 13.2538 13.9998 12.3334C13.9998 11.4129 13.2536 10.6667 12.3332 10.6667C11.4127 10.6667 10.6665 11.4129 10.6665 12.3334C10.6665 13.2538 11.4127 14 12.3332 14Z" stroke="#262626" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                      <span className='title-item'>Phí vận chuyển</span>
                    </div>
                    <div className='value-money'> 0 ₫</div>
                  </li>
                  <li className='d-flex between center-items itempay'>
                    <div className='d-flex center-items'>
                    <svg className="mr-5" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.1361 1.81802L13.1361 1.81803L1.82181 13.1323C1.76655 13.1876 1.67564 13.1876 1.62038 13.1323L0.863234 12.3752C0.836694 12.3484 0.821806 12.3122 0.821806 12.2745C0.821806 12.2367 0.836694 12.2005 0.863233 12.1737L12.1793 0.861236C12.2061 0.834696 12.2423 0.819808 12.28 0.819808C12.3177 0.819808 12.3539 0.834696 12.3807 0.861235L13.1379 1.61838C13.1931 1.67364 13.1931 1.76455 13.1361 1.81802ZM5.85745 3.28249C5.85745 4.70021 4.70399 5.85367 3.28627 5.85367C1.86855 5.85367 0.715092 4.70021 0.715092 3.28249C0.715092 1.86477 1.86855 0.711308 3.28627 0.711308C4.70399 0.711308 5.85745 1.86477 5.85745 3.28249ZM4.57224 3.28249C4.57224 2.57342 3.99534 1.99653 3.28627 1.99653C2.57721 1.99653 2.00031 2.57342 2.00031 3.28249C2.00031 3.99155 2.57721 4.56845 3.28627 4.56845C3.99534 4.56845 4.57224 3.99155 4.57224 3.28249ZM8.14366 10.7111C8.14366 9.29334 9.29712 8.13988 10.7148 8.13988C12.1326 8.13988 13.286 9.29334 13.286 10.7111C13.286 12.1288 12.1326 13.2822 10.7148 13.2822C9.29712 13.2822 8.14366 12.1288 8.14366 10.7111ZM9.42888 10.7111C9.42888 11.4201 10.0058 11.997 10.7148 11.997C11.4239 11.997 12.0008 11.4201 12.0008 10.7111C12.0008 10.002 11.4239 9.4251 10.7148 9.4251C10.0058 9.4251 9.42888 10.002 9.42888 10.7111Z" fill="black" fillOpacity="0.85" stroke="#262626" strokeWidth="0.000496032"></path></svg>
                     <span className='title-item'>Giảm giá</span>
                    </div>
                    <div className='value-money'> 0 ₫</div>
                  </li>
                </ul>
                <ul className='List-item-pay'>
                  <li className='d-flex between center-items '>
                    <div className='d-flex center-items'>
                      <span>Tổng tiền</span>
                    </div>
                    <div className='value-money'>{data.orderInfo.totalAmount.toLocaleString('vi', {style : 'currency', currency : 'VND'}) }</div>
                  </li>
              
                </ul>
              </div>
            </Col>







            <Col span={12} style={{ paddingLeft: '10px'}}>
                <div className="box-payinfo">
                  <h6 className='wrap-order-payment--title'>Thông tin vận chuyển</h6>
                  <div className='note-title'>
                     Ghi chú
                  </div>
                  <TextArea rows={4} value={data.orderInfo.note}/>
                  <div  className='adresss'>
                    <div className='d-flex center-items'>
                    <svg
                      width={14}
                      height={14}
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7 13.4163C7 13.4163 12.25 9.91634 12.25 5.83301C12.25 4.44062 11.6969 3.10526 10.7123 2.1207C9.72774 1.13613 8.39239 0.583008 7 0.583008C5.60761 0.583008 4.27226 1.13613 3.28769 2.1207C2.30312 3.10526 1.75 4.44062 1.75 5.83301C1.75 9.91634 7 13.4163 7 13.4163Z"
                        stroke="#434343"
                        strokeWidth="1.16667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7 7.58301C7.9665 7.58301 8.75 6.79951 8.75 5.83301C8.75 4.86651 7.9665 4.08301 7 4.08301C6.0335 4.08301 5.25 4.86651 5.25 5.83301C5.25 6.79951 6.0335 7.58301 7 7.58301Z"
                        stroke="#434343"
                        strokeWidth="1.16667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span style={{ marginLeft:'5px'}}> { data.orderInfo.fullAdress }</span>
                    </div>
                  </div>



                  <div  className='adresss'>
                    <div className='d-flex center-items'>
                    <svg
                      width={16}
                      height={14}
                      viewBox="0 0 12 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.1424 -0.0389404H1.85672C1.22637 -0.0389404 0.713867 0.47356 0.713867 1.10392V14.8182C0.713867 15.4486 1.22637 15.9611 1.85672 15.9611H10.1424C10.7728 15.9611 11.2853 15.4486 11.2853 14.8182V1.10392C11.2853 0.47356 10.7728 -0.0389404 10.1424 -0.0389404ZM9.99958 14.6753H1.99958V1.24677H9.99958V14.6753ZM5.2853 12.8539C5.2853 13.0434 5.36055 13.225 5.4945 13.359C5.62846 13.4929 5.81014 13.5682 5.99958 13.5682C6.18902 13.5682 6.3707 13.4929 6.50466 13.359C6.63861 13.225 6.71387 13.0434 6.71387 12.8539C6.71387 12.6645 6.63861 12.4828 6.50466 12.3488C6.3707 12.2149 6.18902 12.1396 5.99958 12.1396C5.81014 12.1396 5.62846 12.2149 5.4945 12.3488C5.36055 12.4828 5.2853 12.6645 5.2853 12.8539Z"
                        fill="#434343"
                      />
                    </svg>
                    <span style={{ marginLeft:'5px'}}>{ data.orderInfo.phone_number }</span>
                    </div>
                  </div>






                </div>
            </Col>
          </Row>
          </div>
      </div>
      :<Space/>
    
  
  )
}

export default OrderDetails