import { Col, Row } from 'antd';



const ListItemOrder = (props) =>{
  const listitem = props.listItem
console.log('----------',listitem)

  const orderlist = listitem.map((item, index) => (
    <Row key={index} className='mg-bt'>
      <Col  span={4} >
       <div className='item-image'> <img src={item.images} alt=''/></div>
        
        
      </Col>
    <Col  span={12}>
      <p>
      Tên Sản phẩm:  <b>{item.name }</b>
      </p>
      <p>
       Niêm iết: <b>{item.price.toLocaleString('vi', {style : 'currency', currency : 'VND'}) }</b>
      </p>
    </Col>
    <Col  span={8} >
      <p>
      Số lượng:  <b>{item.quatity }</b>
      </p>
      <p>
      Tổng: <b>{(item.quatity * item.price ).toLocaleString('vi', {style : 'currency', currency : 'VND'}) }</b>
      </p>
    </Col>
    </Row>
  ));





  return (
    <>
      {
        orderlist
      }
    </>
  )
}

export default ListItemOrder