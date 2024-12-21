// frontend/src/components/Navbar.js
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

const Navbar = () => {
  const { user, setUser, onlineUsers, socket } = useContext(UserContext);
  const navigate = useNavigate();
  const [tradeRequests, setTradeRequests] = useState([]);

  useEffect(() => {
    if (!socket) return;

    // Listen for incoming trade requests
    socket.on('receiveTradeRequest', (data) => {
      setTradeRequests((prev) => [...prev, data]);
    });

    // Cleanup listeners on unmount
    return () => {
      socket.off('receiveTradeRequest');
    };
  }, [socket]);

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <div>
        <span className="font-bold">Welcome, {user.username}</span>
      </div>
      <div className="flex space-x-4 items-center">
        <Link to="my-products" className="hover:underline">
          My Products
        </Link>
        <Link to="my-listings" className="hover:underline">
          My Listings
        </Link>
        <Link to="trade-interface" className="hover:underline">
          Trade Interface
        </Link>
        <Link to="trade-history" className="hover:underline">
          Trade History
        </Link>
        <Link to="change-password" className="hover:underline">
          Profile
        </Link>
        {/* Trade Request Notification */}
        {tradeRequests.length > 0 && (
          <div className="relative">
            <span className="absolute top-0 right-0 inline-block w-3 h-3 bg-red-600 rounded-full"></span>
            <button className="hover:underline">Trade Requests</button>
          </div>
        )}
        <button onClick={handleLogout} className="hover:underline">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
