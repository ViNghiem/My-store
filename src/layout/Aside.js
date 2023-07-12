// import NavItem from "./navItem";
import { Menu } from 'antd';
import  {TeamOutlined,FilePptOutlined,SyncOutlined,UserOutlined,BarChartOutlined,PictureOutlined,FolderOutlined,WalletOutlined } from '@ant-design/icons';

// import axios from 'axios';
// const { SubMenu } = Menu;
// import {useEffect,useState} from 'react';
import {useTranslation}  from 'react-i18next';
import React from "react";
// import  Space  from 'antd';
import {  useSelector } from 'react-redux';
import { Link ,useLocation } from 'react-router-dom';




const Aside = ()=>{
  const { t } = useTranslation();
  const UserInfo =  useSelector((state) => state.user.user)
  const location = useLocation();
  const currentPath = location.pathname;
  const role = UserInfo?.role
  const isAdmin = UserInfo?.isAdmin
  const PrivateNav = [
    {
      label: <Link to="/">{  t('Statistical')}</Link>,
      key:'/',
      icon: <BarChartOutlined />,
      children:null,
    },

    {
      label: <Link to="/orders">{  t('Order')}</Link>,
      key:'/orders',
      icon:<WalletOutlined />,
      children:null,
    },

    {
      label: <Link to="/collection">{  t('Collection')}</Link>,
      key:'/collection',
      icon: <PictureOutlined />,
      children:null,
    },


    {
      label:t('Product'),
      key:'Product',
      icon: <BarChartOutlined />,
      children:[
        {
          label: <Link to="/categories">{  t('Category')}</Link> ,
          key:'/categories',
          icon: <FolderOutlined />
        },
        {
          label:<Link to="/products">{  t('All product')}</Link> ,
          key:'/products',
          icon:  <FilePptOutlined />,
        },

      ],
    },

    


   



  ]


  const AdminNav =[




    {
      label: <Link to="/staffs">{  t('Staff')}</Link>,
      key:'/staffs',
      icon:   <TeamOutlined />,
      children:null,
    },

    {
      label: t('History update'),
      key:'updatehistori',
      icon: <SyncOutlined />,
      children:[
        {
          label: <Link to="/updatehistori">{t('History update Product')}</Link>,
          key:'/updatehistori',
          icon: <FilePptOutlined />
        },

      ],
    }

  ]


  const PublicNav = [
    {
      label: <Link to="/info">{  t('Info')}</Link>,
      key:'/info',
      icon: <UserOutlined />,
      children:null,
    },
  ]
  var items = [];



  


  if(isAdmin){
    items = PrivateNav.concat(AdminNav).concat(PublicNav)
  }else{
    if(role ==='pending'){
      items = PublicNav
    }else if(role ==='approved'){
      items = PrivateNav.concat(PublicNav)
    }
  }


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
        defaultSelectedKeys={currentPath}
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