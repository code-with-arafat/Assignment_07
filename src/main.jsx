import { Children, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import HomePage from './pages/homePage/HomePage'
import MainLayout from './layout/MainLayout'

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout ,
    Children: [
      {
        index: true,
        element: <HomePage/>

      },

      

    ]
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <RouterProvider router={router}/>
  </StrictMode>,
)
