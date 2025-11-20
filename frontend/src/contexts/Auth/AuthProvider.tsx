import { type FC, type PropsWithChildren, useState } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import { BASE_URL } from "../../constants/BASE_URL";
const USERNAME_KEY = "username";
const TOKEN_KEY = "token";

 export const AuthProvider :FC<PropsWithChildren> = ({ children }) => {
    const [username, setUsername] = useState<string | null>(localStorage.getItem (USERNAME_KEY));
    const [token, setToken] = useState<string | null>(localStorage.getItem (TOKEN_KEY));
    const [myOrders, setMyOrders] = useState([]);  


    const login = (username:string, token:string) => {
        setUsername (username);
        setToken (token);
        localStorage.setItem (USERNAME_KEY, username);
        localStorage.setItem (TOKEN_KEY, token);
    }
    const isAuthenticated = !!token;

    const logout =() => {
        setUsername (null);
        setToken (null);
        localStorage.removeItem (USERNAME_KEY);
        localStorage.removeItem (TOKEN_KEY);
    }
    const getMyOrders = async () => {
        const response = await axios.get(`${BASE_URL}/user/my-orders`,{
            headers : {
                Authorization : `Bearer ${token}`
            }
        })
        if(response.status !== 200){
            throw new Error ("Unable to fetch orders");
        }
        const orders = response.data ;
        setMyOrders(orders);

    }

    return (
        <AuthContext.Provider value ={{ username, token, myOrders, isAuthenticated,login, logout, getMyOrders }}>
            {children}
        </AuthContext.Provider>
    )
}