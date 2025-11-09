/* eslint-disable @typescript-eslint/no-unused-vars */
import { type FC, type PropsWithChildren, useState } from "react";
import { CartContext } from "./CartContext";
import axios from "axios";
import type { CartItem } from "../../types/CartItem";
import { BASE_URL } from "../../constants/BASE_URL";
import { useAuth } from "../Auth/AuthContext";
export const CartProvider: FC<PropsWithChildren> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const { token } = useAuth();
  const [error, setError] = useState<string | null>(null);
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
      if (!response.data) {
        setError("Failed to add item to cart");
        return;
      }
      const cart = await response.data;
      if(!cart){
        setError("Failed to retrieve updated cart");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const cartItemsMapped = cart.items.map(({ product, quantity }: { product: any; quantity: number }) => ({
        productId: product._id,
        title: product.title,
        image: product.image,
        quantity,
        unitPrice: product.price,
      }));
      setCartItems([...cartItemsMapped]);
      setTotalAmount(cart.totalAmount);
    } catch (err) {
      console.error("Failed to add item to cart:", err);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, totalAmount, addItemToCart }}>
      {children}
    </CartContext.Provider>
  );
};
