import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, createBrowserRouter } from "react-router-dom";

import { RouterProvider } from 'react-router-dom';

import routes from "./utils/routes.jsx";
const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById('root')).render(
    // <React.StrictMode>
    //     <App />
    // </React.StrictMode>
    
    // <BrowserRouter>
    //     <App />
    // </BrowserRouter>

    // <RouterProvider router={routes} />
    <RouterProvider router={router} />

    ,
)
