// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './components/home/Home';
import Profile from './components/Profile';
import ProductDetail from './components/ProductDetails';
import ProductList from './components/ProductList';
import CartPage from './components/CartPage'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} style={{ marginTop: 20 }} />
        <Route path="/my-profile" element={<Profile />} style={{ marginTop: 20 }} />
        <Route path="/my-Cart" element={<CartPage />} style={{ marginTop: 20 }} />
        <Route path='/product/:searchTerm/*' element={<ProductList />} />
        <Route path="/product/:productId" element={<ProductDetail />} style={{ marginTop: 20 }} />
      </Routes>
    </Router>
  );
}

export default App;
