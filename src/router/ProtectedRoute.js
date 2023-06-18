import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Header from '../layout/Header';
import Aside from '../layout/Aside';


// import Cookies from 'js-cookie';
// import { useEffect, useState } from "react";




export default function ProtectedRoute({ children }) {



console.log("ạhdsagdsafsadfgh")


  if (!localStorage.getItem('accessToken')) {
    return <Navigate to='/login' />;
  }

  return (
    <div>
        <Header/>
        <div>
        <Aside/>
        <div className='content-layout page-wrapper'>
          <Outlet />
        </div>
        </div>
    </div>
  )
}

