// import NavItem from "./navItem";
import { Menu } from 'antd';
import  {SettingFilled,BarChartOutlined,PictureOutlined } from '@ant-design/icons';
import {NavLink} from "react-router-dom";
// const { SubMenu } = Menu;
import {useTranslation}  from 'react-i18next';

// import  Space  from 'antd';





const Aside = ()=>{

  const { t } = useTranslation();







  return(
    <>
      <div className="scroll-sidebar">
        <div className="Logo">
          <img src="https://demos.wrappixel.com/free-admin-templates/bootstrap/ample-bootstrap-free/html/plugins/images/logo-text.png" alt="Logo" />
        </div>
        <div className="SideBar">
        <Menu
        mode="inline"
        // openKeys={this.state.openKeys}
        // onOpenChange={this.onOpenChange}
        style={{ width: 256 }}
      >
        {/* <SubMenu
          key="sub1"
          title={
            <span>
              <SettingFilled />
              <span>Navigation One</span>
            </span>
          }
        >
          <Menu.Item key="1">Option 1</Menu.Item>
          <Menu.Item key="2">Option 2</Menu.Item>
          <Menu.Item key="3">Option 3</Menu.Item>
          <Menu.Item key="4">Option 4</Menu.Item>
        </SubMenu> */}
        <Menu.Item key="7">
          <NavLink to='/'>
              <BarChartOutlined />
              <span>{t('Statistical')}</span>
          </NavLink>
        </Menu.Item>

        <Menu.Item key="6">
          <NavLink to='/collection'>
              <PictureOutlined />
              <span>{t('Collection')}</span>
          </NavLink>
        </Menu.Item>

        

        <Menu.Item key="4">
          <NavLink to='/info'>
              <SettingFilled />
              <span>{t('Info')}</span>
          </NavLink>
        </Menu.Item>
      </Menu>




        </div>
      </div>
    </>
  )

}

export default Aside;