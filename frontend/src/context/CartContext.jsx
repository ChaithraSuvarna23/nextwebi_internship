import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/cart', { withCredentials: true })
      .then(res => {
        if (Array.isArray(res.data)) {
          setCartItems(res.data);
        }
      })
      .catch(err => console.error('Error loading cart from backend:', err));
  }, []);

  const syncCartWithServer = (items) => {
    axios.post('http://localhost:5000/api/cart/save', items, { withCredentials: true })
      .catch(err => console.error('Error syncing cart to server:', err));
  };

  const addToCart = (item) => {
    let updated = false;
    let removed = false;

    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => i.title === item.title);
      let updatedItems;

      if (existingItem) {
        if (item.quantity <= 0) {
          removed = true;
          updatedItems = prevItems.filter(i => i.title !== item.title);
        } else {
          updated = true;
          updatedItems = prevItems.map(i =>
            i.title === item.title ? { ...i, quantity: item.quantity } : i
          );
        }
      } else {
        if (item.quantity <= 0) return prevItems;
        updatedItems = [...prevItems, { ...item, quantity: item.quantity || 1 }];
      }

      syncCartWithServer(updatedItems);
      return updatedItems;
    });

    setTimeout(() => {
      if (removed) {
        toast.error(`${item.title} removed from cart`);
      } else if (updated) {
        toast.info(`${item.title} quantity updated`);
      } else {
        toast.success(`${item.title} added to cart`);
      }
    }, 100);
  };

  // ✅ Remove item from cart
  const removeFromCart = (title) => {
    const updatedItems = cartItems.filter(item => item.title !== title);
    setCartItems(updatedItems);
    syncCartWithServer(updatedItems);
    toast.error(`${title} removed from cart`);
  };

  // ✅ Clear entire cart
  const clearCart = () => {
    setCartItems([]);
    syncCartWithServer([]);
    toast.warn('Cart cleared');
  };

  // ✅ Get item quantity
  const getQuantity = (title) => {
    const item = cartItems.find(item => item.title === title);
    return item ? item.quantity : 0;
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, getQuantity }}>
      {children}
    </CartContext.Provider>
  );
};



/*import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() =>{
    const cookieData = Cookies.get('cartItems');
    return cookieData ? JSON.parse(cookieData) : [];
  });

  useEffect(() => {
    Cookies.set('cartItems', JSON.stringify(cartItems), { expires: 7 });
  }, [cartItems]);


  const addToCart = (item) => {
    let updated = false;
    let removed = false;

    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => i.title === item.title);

      if (existingItem) {
        if (item.quantity <= 0) {
          removed = true;
          return prevItems.filter(i => i.title !== item.title);
        } else {
          updated = true;
          return prevItems.map(i =>
            i.title === item.title ? { ...i, quantity: item.quantity } : i
          );
        }
      } else {
        if (item.quantity <= 0) return prevItems;
        return [...prevItems, { ...item, quantity: item.quantity || 1 }];
      }
    });

    setTimeout(() => {
      if (removed) {
        toast.error(`${item.title} removed from cart`);
      } else if (updated) {
        toast.info(`${item.title} quantity updated`);
      } else {
        toast.success(`${item.title} added to cart`);
      }
    }, 100); 
  };

  const removeFromCart = (title) => {
    setCartItems(prev => prev.filter(item => item.title !== title));
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
*/



/*import React, { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

        const addToCart = (item) => {
          let updated = false;
          let removed = false;

          setCartItems(prevItems => {
            const existingItem = prevItems.find(i => i.title === item.title);

            if (existingItem) {
              if (item.quantity <= 0) {
                removed = true;
                return prevItems.filter(i => i.title !== item.title);
              } else {
                updated = true;
                return prevItems.map(i =>
                  i.title === item.title ? { ...i, quantity: item.quantity } : i
                );
              }
            } else {
              if (item.quantity <= 0) return prevItems;
              return [...prevItems, { ...item, quantity: item.quantity || 1 }];
            }
          });

          if (removed) {
            toast.error(`${item.title} removed from cart`);
          } else if (updated) {
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
*/

