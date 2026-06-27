import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import MainLayout from './layout/MainLayout';
import NotFound from './pages/notFound/NotFound';
import HomePage from './pages/homePage/HomePage';
import FriendDetails from './pages/friendDetails/FriendDetails';
import Timeline from './pages/timeline/Timeline'; // Timeline পেজ ইম্পোর্ট করা হলো

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/friend/:id',
        element: <FriendDetails />,
      },
      {
        path: '/timeline',
        element: <Timeline />, 
      },
      // Others page path here
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);