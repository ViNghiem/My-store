// import { NavLink } from 'react-router-dom';
import {  useSelector } from 'react-redux';
import {useEffect} from 'react';
import { loginUser } from '../redux/actions/UserAction';
import axios from 'axios';
import Store from '../store';
import LanguageSelector from '../component/translate'


const Header =()=>{
  const UserInfo =  useSelector((state) => state.user.user)
  // const [User, setUser] = useState(UserInfo);
  useEffect(() => {
    if(UserInfo) return ;
    const token = localStorage.getItem('accessToken')
    axios.get(`http://127.0.0.1:3020/user/account`, {
        headers: {
          'token': `${token}`
        }
    }).then((res)=>{
      const user = res.data
      Store.dispatch(loginUser(user))
      // setUser(user)
    })
  },[UserInfo]);
  


  return(
  <header className="topbar" data-navbarbg="skin5">
   
    <div className="Navlinks">
      <div className="left-Navlink">

      </div>
      <div className='language-change'>
        <LanguageSelector/>
      </div>
      <div className="right-Navlink">
      { UserInfo ?
        <div className="avatar">
           <img src={UserInfo.avartar?UserInfo.avartar:'https://res.cloudinary.com/dhef1t1iu/image/upload/v1680489402/pb7rsiir5rfjvoxworcj.jpg' } alt="avartar" />
           <p>{UserInfo.username}</p>
        </div>
        : <>dsad</>
      }
      </div>
    </div>
  </header>
  )
}
export default Header;