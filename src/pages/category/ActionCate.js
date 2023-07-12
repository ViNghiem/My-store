import {EditOutlined,DeleteOutlined} from "@ant-design/icons"
import { useNavigate } from "react-router-dom";


const ActionCate = (props) => {
  const navigate = useNavigate();
  const Delete = props.Delete
  const linkEdit ='/products/edit/'+props._id
  const OpenVeiwedit = ()=>{
    navigate(linkEdit);
  }

  const DeleteProduct = (id)=>{
    Delete(id)
  }


  return(
    <>
        <div className="action-product">
      <div className="action-item" onClick={()=> OpenVeiwedit()}>
        <EditOutlined />
      </div>
      <div className="action-item" onClick={()=>DeleteProduct(props._id)}>
        <DeleteOutlined />
      </div>
    </div>
    </>
  )
}

export default ActionCate 