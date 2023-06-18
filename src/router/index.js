import { createBrowserRouter, Outlet } from 'react-router-dom';
import LoginPage from '../pages/login';
import ProtectedRoute from './ProtectedRoute';
import Home from '../pages/home';
import InfoUser from '../pages/infoUser';
import RegisterPage from '../pages/register'
import Collection from '../pages/collection'
import Product from '../pages/Product';
import EditorProduct from '../pages/Product/EditProduct'
import React from "react";

import axios from 'axios';
import { useEffect } from 'react';

const AuthLayout = () => {
 
  useEffect(() => {
    if(localStorage.getItem('accessToken')){
      
    }else{
    axios.get('http://localhost:3020/auth/login/success',
      {
        withCredentials: true 
      }
    )
    .then(function (res) {
      console.log(res);
      localStorage.setItem('accessToken',res.data.accessToken);
      
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  }, []);

  
  return (
    <Outlet />
  )



  
};

export default createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        element: <LoginPage />,
        path: '/login',
      },
      {
        element: <RegisterPage />,
        path: '/regitser',
      },

      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <Home />,
            path: '/',
          },

          {
            element: <EditorProduct />,
            path: '/products/edit/:id',
          },

          {
            element: <Product />,
            path: '/products',

          },

          {
            element: <InfoUser />,
            path: '/info',
          },

          {
            element: <Collection />,
            path: '/collection',
          }

        ],
      },


    ],
  },
]);