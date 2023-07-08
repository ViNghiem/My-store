import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Header from '../layout/Header';
import Aside from '../layout/Aside';

export default function ProtectedRoute({ children }) {

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

