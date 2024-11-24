import { Navigate, Outlet } from "react-router-dom";
export default function PrivateAdminRoute({ children }) {
    if ( localStorage.getItem("Authorization") === null) return <Navigate to="/login" />;
  let roles = JSON.parse(localStorage.getItem("roles"));
  if(!roles.find(role => role.name === "ADMIN")){
    return <Navigate to="login" />;
  }
  return <Outlet />;
}