import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import MainLayout from './layout/MainLayout';
import NotFound from './pages/notFound/NotFound';
import HomePage from './pages/homePage/HomePage'
import FriendDetails from './pages/friendDetails/FriendDetails';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      // Others page path here
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },

  {
  path: '/friend/:id',
  element: <FriendDetails />,
}


]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
