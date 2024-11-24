import { useState, useContext, createContext } from "react";
const AuthContext = createContext();
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie'
import { GET } from "../api/GET";
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
    const loginAction = async (data) => {
        try {
            const response = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const res = await response.json();
            if (res.result) {
                localStorage.setItem("Authorization", res.result.token);
    
                let info = await GET(`users/my-info`)
                localStorage.setItem("roles",JSON.stringify(info.result.roles));
                setUser(info.result?.username);
                setIsAuthenticated(true);
                console.log(info)
                navigate("/");
                return;
            }
            throw new Error(res.message);
        } catch (err) {
            console.log(err.message);
        }
    };
    const logOut = () => {
        setUser(null);
        localStorage.clear()
        localStorage.removeItem("Authorization");
        localStorage.removeItem("roles");
        navigate("/login");
    };
    return <AuthContext.Provider value={{ user, loginAction, logOut,isAuthenticated,setIsAuthenticated }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};