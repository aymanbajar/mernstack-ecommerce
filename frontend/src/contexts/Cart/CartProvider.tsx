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
  //fetch items in cart
  const fetchCart = async () => {
    const response = await axios.get(`${BASE_URL}/cart`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const cart = response.data;
    const cartItemsMapped = cart.items.map(
      ({
        product,
        quantity,
        unitPrice,
      }: {
        product: any;
        quantity: number;
        unitPrice: number;
      }) => ({
        productId: product._id,
        title: product.title,
        image: product.image,
        quantity,
        unitPrice,
      })
    );

    setCartItems(cartItemsMapped);
    setTotalAmount(cart.totalAmount);
  };

  //add item to cart
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

      setCartItems(cartItemsMapped);
      setTotalAmount(cart.totalAmount);
    } catch (err) {
      console.error("Failed to add item to cart:", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [token]);

  //update cart when token changes

  const updateItemInCart = async (productId: string, quantity: number) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/cart/items`,
        {
          productId,
          quantity,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status !== 200 && response.status !== 201) {
        console.error("Failed to update cart item");
        return;
      }

      // ✅ تحقق من data.data أولاً مثل fetchCart
      const cart = response.data.data || response.data;

      if (!cart || !cart.items) {
        console.error("Failed to parse cart data");
        return; // ✅ أضفنا return هنا
      }

      const cartItemsMapped = cart.items.map(
        ({
          product,
          quantity,
          unitPrice,
        }: {
          product: any;
          quantity: number;
          unitPrice: number;
        }) => ({
          productId: product._id,
          title: product.title,
          image: product.image,
          quantity,
          unitPrice,
        })
      );

      setCartItems(cartItemsMapped);
      setTotalAmount(cart.totalAmount);
    } catch (err) {
      console.error("Failed to update cart item:", err);
    }
  };

  //delete item from cart
  const deleteItemInCart = async (productId: string) => {
    try {
      const response = await axios.delete(`${BASE_URL}/cart/items/${productId}`, {
        data: {
          productId,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status !== 200 && response.status !== 201) {
        console.error("Failed to delete cart item");
        return;
      }
      const  cart = response.data.data || response.data;
     const cartItemFiltered = cartItems.filter((item => item.productId !== productId));
     setCartItems( cartItemFiltered);
     setTotalAmount(cart.totalAmount);


    } catch (err) {
      console.error("Failed to delete cart item:", err);
    }
  };

//clear cart 

const  clearCart = async () => {
  try{
    const  response = await axios.delete(`${BASE_URL}/cart`,{
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status !== 200 && response.status !==201){
      console.error("Failed to clear cart");
      return;
    }
    setCartItems([]);
    setTotalAmount(0);
  } catch (err) {
    console.error("Failed to clear cart:", err);
  }
}


  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalAmount,
        addItemToCart,
        fetchCart,
        updateItemInCart,
        deleteItemInCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
