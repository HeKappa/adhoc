// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginRegister from './pages/LoginRegister';
import Dashboard from './pages/Dashboard';
import MyProducts from './pages/MyProducts';
import MyListings from './pages/MyListings';
import TradeInterface from './pages/TradeInterface';
import TradeHistory from './pages/TradeHistory';
import ChangePassword from './pages/ChangePassword';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginRegister />} />
                <Route path="/dashboard" element={<Dashboard />}>
                    <Route path="my-products" element={<MyProducts />} />
                    <Route path="my-listings" element={<MyListings />} />
                    <Route path="trade-interface" element={<TradeInterface />} />
                    <Route path="trade-history" element={<TradeHistory />} />
                    <Route path="change-password" element={<ChangePassword />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;