import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from 'pages/Home';
import List from 'pages/List';
import Cart from 'pages/Cart';
import Navbar from 'layout/Navbar/Navbar';
import Footer from 'layout/Footer/Footer';
import 'App.css';
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<List />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <Footer />
      </Router>
      {/* <ToastContainer position="bottom-right" /> */}
    </>
  );
}

export default App;
