/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { type FC, type PropsWithChildren, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import axios from "axios";
import type { CartItem } from "../../types/CartItem";
import { BASE_URL } from "../../constants/BASE_URL";
import { useAuth } from "../Auth/AuthContext";
export const CartProvider: FC<PropsWithChildren> = ({ children }) => {
  const { token } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
    const fetchCart = async () => {
  const  response  =  await axios.get(`${BASE_URL}/cart`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  const cart = response.data;
  const cartItemsMapped = cart.items.map(({product ,quantity ,unitPrice}: {product:any,quantity:number,unitPrice:number}) => ({
    productId: product._id,
    title: product.title,
    image: product.image,
    quantity,
    unitPrice
  }));

  setCartItems(cartItemsMapped);
  setTotalAmount(cart.totalAmount);
};


  const addItemToCart = async (productId: string) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/cart/items`,
        {
          productId,
          quantity: 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status !== 200 && response.status !== 201) {
        setError("Failed to add to cart");
        return;
      }

      const cart = response.data;

      if (!cart) {
        setError("Failed to parse cart data");
      }
      const cartItemsMapped = cart.items.map(
        ({ product, quantity }: { product: any; quantity: number }) => ({
          productId: product._id,
          title: product.title,
          image: product.image,
          quantity,
          unitPrice: product.price,
        })
      );

      setCartItems((prev) => [...prev, ...cartItemsMapped]);
      setTotalAmount(cart.totalAmount);
    } catch (err) {
      console.error("Failed to add item to cart:", err);
    }
  };

    useEffect(() => {
 
    fetchCart();
  },[token])

  return (
    <CartContext.Provider value={{ cartItems, totalAmount, addItemToCart ,fetchCart}}>
      {children}
    </CartContext.Provider>
  );
};
