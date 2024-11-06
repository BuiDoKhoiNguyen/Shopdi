import React from 'react'
import LoginForm from '../pages/Auth/LoginForm'
import { Route, Routes } from 'react-router-dom'
import CartPage from '../pages/buyer/CartPage.jsx';
import HomePage from "../pages/buyer/HomePage.jsx";
import Review from "../components/Buyer/Review/Review.jsx";
import OrderDetails from "../components/Buyer/OrderDetails.jsx";
import OrderItemList from "../components/Buyer/Order/OrderItemList.jsx";
import orderItemList from '../data/orderData.json';
import SignUpForm from "../pages/buyer/SignUp.jsx";
import Forget from "../pages/buyer/Forget.jsx";
import Checkout from "../pages/buyer/Checkout.jsx";
import SellerSignUp from "../pages/seller/SignUp.jsx";
const AppRouter = () => {
    return (
        <div>
            <Routes>
                <Route path="/*" element={<HomePage />} />

                <Route path="/review" exact element={<Review />} />
                <Route path="/orderlist" exact element={<OrderItemList List={orderItemList} />} />
                <Route path="/orderdetail" exact element={<OrderDetails />} />
                <Route path="/login" exact element={<LoginForm />} />
                <Route path="/cart" exact element={<CartPage />} />
                <Route path="/buyer/checkout" element={<Checkout />} />
                <Route path="/buyer/signup" exact element={<SignUpForm />} />
                <Route path="/buyer/forget" exact element={<Forget />} />
                <Route path="/seller/signup" exact element={<SellerSignUp />} />

            </Routes>
        </div>
    );
}
export default AppRouter