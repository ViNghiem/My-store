// import NavItem from "./navItem";
import { Menu } from 'antd';
import  {SettingFilled,BarChartOutlined,PictureOutlined,AppstoreOutlined,MailOutlined,SettingOutlined } from '@ant-design/icons';
import {NavLink} from "react-router-dom";
// import axios from 'axios';
// const { SubMenu } = Menu;
// import {useEffect,useState} from 'react';
import {useTranslation}  from 'react-i18next';
import React from "react";
// import  Space  from 'antd';
// import {  useSelector } from 'react-redux';
import { Link } from 'react-router-dom';




const Aside = ()=>{
  const { t } = useTranslation();

  const con = (linksss)=>{
    console.log(linksss)
  }
  const items = [
    {
      label: <Link to="/">{  t('Statistical')}</Link>,
      key:'1',
      icon: <BarChartOutlined />,
      children:null,
    },

    {
      label: t('updatehistori'),
      key:'2',
      icon: <BarChartOutlined />,
      children:[
        {
          label: <Link to="/updatehistori">{t('History update Product')}</Link>,
          key:'3',
          icon: <BarChartOutlined />
        },

      ],
    },

    {
      label:<Link to="/categories">{  t('Category')}</Link>  ,
      key:'4',
      icon: <BarChartOutlined />,
      children:[
        {
          label: <Link to="/updatehistori">{t('History update Product')}</Link>,
          key:'3',
          icon: <BarChartOutlined />
        },

      ],
    },



   

  ];
  




  const onClick = (e) => {
    console.log('click ', e);
  };


  return(
    <>
      <div className="scroll-sidebar">
        <div className="Logo">
          <img src="https://demos.wrappixel.com/free-admin-templates/bootstrap/ample-bootstrap-free/html/plugins/images/logo-text.png" alt="Logo" />
        </div>
        <div className="SideBar">
        {/* <Menu
        mode="inline"
        style={{ width: 256 }}
      > */}
    
        {/* <Menu.Item key="1">
          <NavLink to='/'>
              <BarChartOutlined />
              <span>{t('Statistical')}</span>
          </NavLink>
        </Menu.Item>


        <Menu.Item key="18">
          <NavLink to='/orders'>
              <BarChartOutlined />
              <span>{t('Order')}</span>
          </NavLink>
        </Menu.Item>

        <Menu.Item key="19">
          <NavLink to='/updatehistori'>
              <BarChartOutlined />
              <span>{t('History update Product')}</span>
          </NavLink>
        </Menu.Item>

        <Menu.Item key="2">
          <NavLink to='/collection'>
              <PictureOutlined />
              <span>{t('Collection')}</span>
          </NavLink>
        </Menu.Item>

        <Menu.Item key="3">
          <NavLink to='/products'>
            <AppstoreOutlined />
              <span>{t('Products')}</span>
          </NavLink>
        </Menu.Item>

        <Menu.Item key="4">
          <NavLink to='/categories'>
          <AppstoreOutlined />
              <span>{t('Category')}</span>
          </NavLink>
        </Menu.Item>
        
        <Menu.Item key="6">
          <NavLink to='/staffs'>
         
          <AppstoreOutlined />
              <span>{t('Staff')}</span>
          </NavLink>
        </Menu.Item>

        <Menu.Item key="5">
          <NavLink to='/info'>
              <SettingFilled />
              <span>{t('Info')}</span>
          </NavLink>
        </Menu.Item> */}

        

      {/* </Menu> */}
  



  <Menu
        onClick={onClick}
        style={{
          width: 250,
        }}
        // defaultSelectedKeys={['1']}
        // defaultOpenKeys={['sub1']}
        mode="inline"
        items={items}
      />

        </div>
      </div>
    </>
  )

}

export default Aside;