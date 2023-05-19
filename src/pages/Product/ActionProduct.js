import {EditOutlined,DeleteOutlined} from "@ant-design/icons"
import { useNavigate } from "react-router-dom";
import React from "react";
const ActionProduct = (props) =>{
  const navigate = useNavigate();

const Delete = props.Delete
console.log(props,"props")
  const linkEdit ='/products/edit/'+props._id
  const OpenVeiwedit = ()=>{
    navigate(linkEdit);
  }

  const DeleteProduct = (id)=>{
    console.log(id,"id")
    Delete(id)
  }


  return(
    <div className="action-product">
      <div className="action-item" onClick={()=> OpenVeiwedit()}>
        <EditOutlined />
      </div>
      <div className="action-item" onClick={()=>DeleteProduct(props._id)}>
        <DeleteOutlined />
      </div>
    </div>
  )
}

export default ActionProduct;