import '../Style/Product.css';
import { Input } from 'antd';
import { useNavigate } from 'react-router-dom';
const Topbar = (props)=>{
  const navigate = useNavigate();
  const link = props.ToPage
  const GotoPage = () =>{
    navigate(link)
  }


  return(
    <div className="is-flex is-flex--space-between mt-24 mb-24">
      <div className="search-box">
        <Input placeholder="Search" />
      </div>
  <div className="com-button style-primary">
    <button type="button" onClick={GotoPage} className="ant-btn created_new_green ant-btn-primary">
     
      <span>Tạo mới</span>
    </button>
  </div>
</div>
  )
}

export default Topbar;