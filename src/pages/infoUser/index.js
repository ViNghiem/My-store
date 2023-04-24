import {  useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';


const InfoUser = ()=>{
  const UserInfo =  useSelector((state) => state.user.user)
  const { t } = useTranslation();


  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-3 col-xlg-3 col-md-12">
          <div className="white-box">
            <div className="user-bg">
              <img src="https://res.cloudinary.com/dhef1t1iu/image/upload/v1680598170/iwo6boictrox64hkmdef.jpg" alt="avatar"/>
              <div className="overlay-box">
                {
                  UserInfo ?
                  <div className="user-content">
                    <img src={ UserInfo.avartar} className="thumb-lg img-circle" alt="img"/>
                    <h4 className="text-white mt-2">{ UserInfo.username}</h4>
                    <h5 className="text-white mt-2">{UserInfo.email}</h5>
                  </div>:<></>
                 }
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-8 col-xlg-9 col-md-12">
          <div className="card">
              <div className="card-body">
                <form className="form-horizontal form-material">
                    <div className="form-group mb-4">
                      <label className="col-md-12 p-0">{t('Full Name')}</label>
                      <div className="col-md-12 border-bottom p-0">
                          {
                          UserInfo ? <input type="text" value={UserInfo.username} className="form-control p-0 border-0" /> 
                          :
                          <input type="text" placeholder="Johnathan Doe" className="form-control p-0 border-0" /> 
                        }
                      </div>
                    </div>
                    <div className="form-group mb-4">
                      <label htmlFor="example-email" className="col-md-12 p-0">Email</label>
                      <div className="col-md-12 border-bottom p-0">
                        {
                          UserInfo ?  <input type="email" value={UserInfo.email} className="form-control p-0 border-0" name="example-email" id="example-email" />
                          :
                          <input type="email" placeholder="" className="form-control p-0 border-0" name="example-email" id="example-email" />
                        }
                      </div>
                    </div>
                
                    <div className="form-group mb-4">
                      <label className="col-md-12 p-0">{t('Phone number')}</label>
                      <div className="col-md-12 border-bottom p-0">
                      {
                          UserInfo ?
                          <input type="text" value={ UserInfo.phone } className="form-control p-0 border-0" />
                          :<input type="text" placeholder="123 456 7890" className="form-control p-0 border-0" />
                      }
                      </div>
                    </div>
                    <div className="form-group mb-4">
                      <label className="col-md-12 p-0">Avatar</label>
                      <div className='row'>
                        <div className='col-md-4 p-0 d-flex my-avatar'>
                          {
                            UserInfo ?
                          <img src={UserInfo.avartar} alt='avatar'/>
                            :<img src="" alt='avatar'/>
                          } 
                        </div>
                        <div className='col-md-8 p-0'>
                          <div className='box-update'>
                            
                          </div>  
                        </div>
                      </div>
                    </div>
                    <div className="form-group mb-4">
                      <label className="col-sm-12">Select Country</label>
                      <div className="col-sm-12 border-bottom">
                          <select className="form-select shadow-none p-0 border-0 form-control-line">
                            <option>London</option>
                            <option>India</option>
                            <option>Usa</option>
                            <option>Canada</option>
                            <option>Thailand</option>
                          </select>
                      </div>
                    </div>
                    <div className="form-group mb-4">
                      <div className="col-sm-12">
                          <button className="btn btn-success">Update Profile</button>
                      </div>
                    </div>
                </form>
              </div>
          </div>
      </div>
      </div>
    </div>
  )
}
export default InfoUser;