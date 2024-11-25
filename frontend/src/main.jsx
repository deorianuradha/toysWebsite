import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import './i18n.js';
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
import Profile from "./pages/User/Profiile.jsx";
import UserList from "./pages/Admin/UserList.jsx";

import CategoryList from "./pages/Admin/CategoryList.jsx";


import ProductList from "./pages/Admin/ProductList.jsx";
// import AddProductGallery from "./pages/Admin/productgallary.jsx"
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
import UserOrder from "./pages/User/UserOrder.jsx";


import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import OrderList from "./pages/Admin/OrderList.jsx";
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";

import AboutUs from "./pages/AboutUs.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import HelpCentre from "./pages/FAQ.jsx";
import Grievance from "./pages/Grievance.jsx";
import Payment from "./pages/Payment.jsx";
import ShippingFooter from "./pages/ShippingFooter.jsx";
import OrderCancelReturnPolicy from "./pages/CancelReturnPolicy.jsx";
import CancelReturnPolicy from "./pages/Security.jsx";
import TermsofUse from "./pages/TermsofUse.jsx";

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
      <Route path="/user-orders" element={< UserOrder/>} />


    <Route path="" element={<PrivateRoute />} >
      <Route path="/profile" element={<Profile />} />
      <Route path="/shipping" element={<Shipping />} ></Route>
      <Route path="/placeorder" element={<PlaceOrder />} ></Route>
      <Route path="/order/:id" element={<Order />} ></Route>

    </Route>

    <Route path="/aboutus" element={<AboutUs />} />
    <Route path="/contactus" element={<ContactUs />} />
    <Route path="/FAQ" element={<HelpCentre/>} />
    <Route path="/grievance" element={<Grievance />} />
    <Route path="/payment" element={<Payment />} />
    <Route path="/shippingfooter" element={<ShippingFooter />} />
    <Route path="/CancelReturnPolicy" element={<OrderCancelReturnPolicy />} />
    <Route path="/Security" element={<CancelReturnPolicy />} />
    <Route path="/TermsofUse" element={<TermsofUse />} />
    

{/* Admin Routes */}
    <Route path="/admin" element={<AdminRoute />}>
      <Route path="userlist" element={<UserList />} />
      <Route path="categorylist" element={<CategoryList />} />
      <Route path="productlist" element={<ProductList />} />
      <Route path="allproductslist" element={<AllProducts />} />
      <Route path="productlist/:pageNumber" element={<ProductList />} />
      <Route path="orderlist" element={<OrderList />} />
      <Route path="product/update/:_id" element={<ProductUpdate />} />
      <Route path="dashboard" element={<AdminDashboard />} />
      {/* <Route path="productgallary" element={<AddProductGallery />} /> */}

      
    
    </Route>
  </Route>
  )
);


ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
   <RouterProvider router={router} ></RouterProvider>
  </Provider>
  
);
