import axios from 'axios';
import {URLAPI} from '../../util/index'


const ProductUpate = ()=>{
  const neuUser = {
    email:'mmmm',
    password:'mmmm',
  }
  const bawn = () => {
    axios.post(`${URLAPI}/user/test`,  neuUser,{
      withCredentials: true 
    })
    
    .then((res)=>{
      console.log(res)
    })
    .catch(function (error) {
      console.log(error)
    });
  }
    return(
      <>



       <button onClick={bawn}>bắn</button>
      </>
    )
}

export default ProductUpate