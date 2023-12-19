import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './App';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import CreateProduct from './CreateProduct';
import UpdateProduct from './UpdateProduct';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/create-product",
    element: <CreateProduct/>
  },
  {
    path: "/update-product/:id",
    element: <UpdateProduct />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);

