import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from 'pages/Home';
import List from 'pages/List';
import Cart from 'pages/Cart';
import Layout from 'layout/Layout';
import Checkout from 'pages/Checkout';
import MyOrders from 'pages/MyOrders';
import 'App.css';
import { CartProvider } from './context/CartContext';
import { ToastContainer } from 'react-toastify';
import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';

function App() {
  useEffect(() => {
    const existingUser = Cookies.get('userInfo');
    
    if (!existingUser) {
      const newUser = {
        id: uuidv4(),
        firstVisit: new Date().toISOString(),
      };
      Cookies.set('userInfo', JSON.stringify(newUser), { expires: 7 });
      console.log('New cookie set:', newUser);
    } else {
      console.log('Existing user found:', JSON.parse(existingUser));
    }
  }, []);

  return (
    <CartProvider>
      <Router>
        <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<List />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<MyOrders />} />
        </Routes>
        </Layout>
      </Router>
      <ToastContainer position="bottom-right" theme='dark' autoClose={2000} />
    </CartProvider>
  );
}

export default App;
