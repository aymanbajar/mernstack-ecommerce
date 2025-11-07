import { useAuth } from "../contexts/Auth/AuthContext";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../constants/BASE_URL";
export default function CartPage() {
    //get token auth context
    const { token } = useAuth();
    //state of items in cart
    const [cartItems, setCartItems] = useState([]);
    //error state
    const [error, setError] = useState('');
    //fetch cart items from backend
    useEffect(() => {
        //check if token exists
        if(!token){
            setError('User not authenticated');
            return;
        }
        //function to fetch cart items
        const fetchCartItems = async () => {
            try{
                const response =  await axios.get(`${BASE_URL}/cart`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
                setCartItems(response.data);

            }catch(err){
                setError('Failed to fetch cart items');
                return;
            }
        }
        fetchCartItems();
    }, [token]);

    console.log("Cart Items:", cartItems);

    return (
        <div>
            <h1>Cart Page</h1>
        </div>
    )
}