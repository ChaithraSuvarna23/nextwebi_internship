import React, { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

        const addToCart = (item) => {
          let updated = false;
          setCartItems(prevItems => {
            const existingItem = prevItems.find(i => i.title === item.title);
            if (existingItem) {
              updated = true;
              return prevItems.map(i =>
                i.title === item.title ? { ...i, quantity: item.quantity } : i
              );
            } else {
              return [...prevItems, { ...item, quantity: item.quantity || 1 }];
            }
          });

          if (updated) {
            toast.info(`${item.title} quantity updated`);
          } else {
            toast.success(`${item.title} added to cart`);
          }
        };

        const removeFromCart = (title) => {
          setCartItems((prev) => prev.filter((item) => item.title !== title));
          toast.error(`${title} removed from cart`);
        };

        const clearCart = () => {
        setCartItems([]);
        toast.warn('Cart cleared');
        };

        const getQuantity = (title) => {
          const item = cartItems.find((item) => item.title === title);
          return item ? item.quantity : 0;
        };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, getQuantity }}>
      {children}
    </CartContext.Provider>
  );
};


