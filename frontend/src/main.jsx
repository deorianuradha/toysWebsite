import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute.jsx";


//Auth
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";

import AdminRoute from './pages/Admin/AdminRoute.jsx'

import CategoryList from "./pages/Admin/CategoryList.jsx";


import ProductList from "./pages/Admin/ProductList.jsx";
import AllProducts from "./pages/Admin/AllProducts.jsx";
import ProductUpdate from "./pages/Admin/ProductUpdate.jsx";

import Home from "./pages/Home.jsx";
import Favorites from "./pages/Products/Favorites.jsx";
import ProductDetails from "./pages/Products/ProductDetails.jsx";

import Cart from "./pages/Cart.jsx";
import Shop from "./pages/Shop.jsx";

import Shipping from "./pages/Orders/Shipping.jsx";
import PlaceOrder from "./pages/Orders/PlaceOrder.jsx";
import Order from "./pages/Orders/Order.jsx";

import { PayPalScriptProvider } from '@paypal/react-paypal-js'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route index={true} path="/" element={<Home />} />
      <Route path="/favorite" element={< Favorites/>} />
      <Route path="/product/:id" element={< ProductDetails/>} />
      <Route path="/cart" element={< Cart/>} />
      <Route path="/shop" element={< Shop/>} />


    <Route path="" element={<PrivateRoute />} >
      <Route path="/shipping" element={<Shipping />} ></Route>
      <Route path="/placeorder" element={<PlaceOrder />} ></Route>
      <Route path="/order/:id" element={<Order />} ></Route>

    </Route>

{/* Admin Routes */}
    <Route path="/admin" element={<AdminRoute />}>
    <Route path="categorylist" element={<CategoryList />} />
        <Route path="productlist" element={<ProductList />} />
        <Route path="allproductslist" element={<AllProducts />} />
        <Route path="product/update/:_id" element={<ProductUpdate />} />
        
    
        </Route>
        </Route>
  )
);


ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PayPalScriptProvider>
      <RouterProvider router={router} />
    </PayPalScriptProvider>
   { /*<RouterProvider router={router} />*/}
  </Provider>
  
);
