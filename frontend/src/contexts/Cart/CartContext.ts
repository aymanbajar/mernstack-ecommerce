
import type { CartItem } from '../../types/CartItem';
import { createContext, useContext } from 'react';
interface CartContextType {
    cartItems: CartItem[];
    totalAmount: number;
    addItemToCart :(productId: string) => void;
    fetchCart: () => void
    updateItemInCart: (productId: string, quantity: number) => void;
    deleteItemInCart: (productId: string) => void;
    clearCart: () => void;
}

//define context
export const CartContext = createContext<CartContextType>({
    cartItems: [],
    totalAmount: 0,
    addItemToCart: () => {},
    fetchCart: () => {},
    updateItemInCart: () => {},
    deleteItemInCart: () => {},
    clearCart: () => {},
});

//export cart context

export const useCart = () => useContext(CartContext);