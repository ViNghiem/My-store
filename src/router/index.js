import { createBrowserRouter, Outlet } from 'react-router-dom';
import LoginPage from '../pages/login';
import ProtectedRoute from './ProtectedRoute';
import Home from '../pages/home';
import InfoUser from '../pages/infoUser';
import RegisterPage from '../pages/register'
import Collection from '../pages/collection'


const AuthLayout = () => {
  return (
      <Outlet />
  );
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