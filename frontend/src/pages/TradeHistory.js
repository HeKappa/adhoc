// frontend/src/pages/TradeHistory.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TradeHistory() {
  const username = localStorage.getItem('username');
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    fetchTrades();
  }, []);

  const fetchTrades = async () => {
    const res = await axios.get('http://localhost:5000/api/trades');
    const userTrades = res.data.filter(trade => trade.offerBy === username || trade.acceptedBy === username);
    setTrades(userTrades);
  };

  return (
    <div>
      <h2 className="text-xl mb-4">Trade History</h2>
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-300">
            <th className="px-4 py-2">Offer By</th>
            <th className="px-4 py-2">Accepted By</th>
            <th className="px-4 py-2">Product Offered</th>
            <th className="px-4 py-2">Product Gotten</th>
            <th className="px-4 py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {trades.map(trade => (
            <tr key={trade._id} className="text-center">
              <td className="border px-4 py-2">{trade.offerBy}</td>
              <td className="border px-4 py-2">{trade.acceptedBy}</td>
              <td className="border px-4 py-2">{trade.productOffered}</td>
              <td className="border px-4 py-2">{trade.productGotten}</td>
              <td className="border px-4 py-2">{new Date(trade.dateCreated).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TradeHistory;
