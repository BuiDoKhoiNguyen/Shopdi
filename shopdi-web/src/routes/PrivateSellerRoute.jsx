import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useCookies } from 'react-cookie';
const PrivateSellerRoute = () => {
  if ( localStorage.getItem("Authorization") === null) return <Navigate to="/login" />;
  let roles = JSON.parse(localStorage.getItem("roles"));
  if(!roles.find(role => role.name === "SELLER")){
    return <Navigate to="seller/signup" />;
  }
  return <Outlet />;
};

export default PrivateSellerRoute;