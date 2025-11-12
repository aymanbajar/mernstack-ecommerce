/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { type FC, type PropsWithChildren, useState } from "react";
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

        console.log("Raw items from server:", cart.items);
        console.log("Mapped items:", cartItemsMapped);
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
