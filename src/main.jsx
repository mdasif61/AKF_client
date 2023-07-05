import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './components/Layout/Route';
import AuthProvider from './components/NavPage/AuthProvider';
import { Toaster } from 'react-hot-toast';
import 'react-loading-skeleton/dist/skeleton.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <RouterProvider router={router}></RouterProvider>
    <Toaster />
    </AuthProvider>
  </React.StrictMode>,
)
