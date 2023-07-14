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
import AuthProvider from './GetAuth'
import CreatProduct from '../pages/Product/Creatproduct'
import Categori from '../pages/category';
import ListStaff from '../pages/Staff'
import OrderPage from '../pages/Order';
import CreatCategory from '../pages/category/CreatCategory'
import ProductUpate from '../pages/updatehistory/ProductUpate'


const AuthLayout = () => {
 
  return (
    < AuthProvider>
      <Outlet />
    </AuthProvider>
  )
};







const objrouter = {

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
      element:  <ProtectedRoute />,
      children: [
        {
          element: <Home />,
          path: '/',
        },

        

        {
          element:< OrderPage />,
          path: '/orders',
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
          element: <CreatProduct />,
          path: '/products/creat-product',
        },

        {
          element: <ListStaff />,
          path: '/staffs',
        },

        {
          element: <ProductUpate />,
          path: '/updatehistori',
        },


        {
          element: <InfoUser />,
          path: '/info',
        },

        {
          element: <CreatCategory />,
          path: '/categories/create',
        },

        {
          element: <Categori />,
          path: '/categories',
         
        },

        {
          element: <Collection />,
          path: '/collection',
        }

      ],
    },


  ],
}


export default createBrowserRouter([
  objrouter
]);