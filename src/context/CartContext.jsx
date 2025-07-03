import React, { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

        const addToCart = (item) => {
          setCartItems(prevItems => {
            const existingItem = prevItems.find(i => i.title === item.title);

            if (existingItem) {
              return prevItems.map(i =>
                i.title === item.title
                  ? { ...i, quantity: item.quantity }
                  : i
              );
            } else {
              console.log('Adding new item to cart:');
              toast.success(`${item.title} added to cart`);
              return [...prevItems, { ...item, quantity: item.quantity || 1 }];
            }
          });
        };

        const removeFromCart = (title) => {
          setCartItems((prev) => prev.filter((item) => item.title !== title));
          toast.error(`${title} removed from cart`);
        };

        const clearCart = () => {
        setCartItems([]);
        toast.warn('Cart cleared');
        };

        const updateQuantity = (title, newQuantity) => {
          setCartItems(prev =>
            newQuantity <= 0
              ? prev.filter(item => item.title !== title) 
              : prev.map(item =>
                  item.title === title ? { ...item, quantity: newQuantity } : item
                )
          );
        };

        const getQuantity = (title) => {
          const item = cartItems.find((item) => item.title === title);
          return item ? item.quantity : 0;
        };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, getQuantity }}>
      {children}
    </CartContext.Provider>
  );
};


