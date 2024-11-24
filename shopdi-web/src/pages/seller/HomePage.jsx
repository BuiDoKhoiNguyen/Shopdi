import {Routes, Route} from "react-router-dom";
import React from "react";
import ProductManagement from "./product/ProductManagement.jsx";
import AddProduct from "@/pages/seller/product/AddProduct";
import ProductDetail from "@/pages/seller/product/ProductDetail";
import DashBoard from "@/pages/seller/dashboard/DashBoard";
import OrderList from "./order/OrderList.jsx";
import SellerProfile from "./profile/SellerProfile.jsx";
import OrderDetails from "./order/OrderDetails.jsx";
import SellerSignUp from "./SignUp.jsx";
import EditProduct from "./product/EditProduct.jsx";

export default function HomePage() {
    return (
        <div>
            <Routes>
                <Route path="/" exact element={<DashBoard/>}/>
                <Route path="/products/" exact element={<ProductManagement/>}/>
                <Route path="products/add-product" exact element={<AddProduct/>}/>
                <Route path="/products/product-detail/:id" exact element={<ProductDetail/>}/>
                <Route path="/orders" exact element={<OrderList/>}/>
                <Route path="/profile" exact element={<SellerProfile/>}/>
                <Route path='/orders/:id' element={<OrderDetails/>}/>
                <Route path="/signup" exact element={<SellerSignUp/>}/>
                <Route path="/products/edit-product/:id" exact element={<EditProduct/>}/>

            </Routes>
        </div>


    )
}