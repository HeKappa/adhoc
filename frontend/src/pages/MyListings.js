// frontend/src/pages/MyListings.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MyListings() {
  const username = localStorage.getItem('username');
  const [listings, setListings] = useState([]);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ product: '', price: '', description: '', shippingOptions: 'STANDARD' });

  useEffect(() => {
    fetchListings();
    fetchProducts();
  }, []);
  
  const fetchListings = async () => {
    const res = await axios.get('https://my-adhoc-dianomi-7a115e6467ad.herokuapp.com/api/trade-listings');
    const myListings = res.data.filter(listing => listing.postedBy === username);
    setListings(myListings);
  };

  const fetchProducts = async () => {
    const res = await axios.get('https://my-adhoc-dianomi-7a115e6467ad.herokuapp.com/api/products');
    const myProducts = res.data.filter(product => product.offeredBy === username);
    setProducts(myProducts);
  };

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const handleAddListing = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://my-adhoc-dianomi-7a115e6467ad.herokuapp.com/api/trade-listings', { ...form, postedBy: username });
      fetchListings();
      setForm({ product: '', price: '', description: '', shippingOptions: 'STANDARD' });
    } catch (error) {
      alert('Error adding listing');
    }
  };

  return (
    <div>
      <h2 className="text-xl mb-4">My Trade Listings</h2>
      {/* Add Trade Listing Form */}
      <form onSubmit={handleAddListing} className="mb-6">
        <div className="flex flex-col space-y-2">
          <select 
            name="product" 
            value={form.product} 
            onChange={handleChange}
            required 
            className="px-3 py-2 border rounded"
          >
            <option value="">Select Product</option>
            {products.map(prod => (
              <option key={prod._id} value={prod.name}>{prod.name}</option>
            ))}
          </select>
          <input 
            type="number" 
            name="price" 
            value={form.price} 
            onChange={handleChange}
            placeholder="Price" 
            required 
            className="px-3 py-2 border rounded"
          />
          <textarea 
            name="description" 
            value={form.description} 
            onChange={handleChange}
            placeholder="Description" 
            className="px-3 py-2 border rounded"
          />
          <select 
            name="shippingOptions" 
            value={form.shippingOptions} 
            onChange={handleChange}
            required 
            className="px-3 py-2 border rounded"
          >
            <option value="STANDARD">Standard</option>
            <option value="EXPRESS">Express</option>
            <option value="PICKUP">Pickup</option>
          </select>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Add Listing</button>
        </div>
      </form>

      {/* List of Listings */}
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-300">
            <th className="px-4 py-2">Product</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Shipping</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {listings.map(listing => (
            <tr key={listing._id} className="text-center">
              <td className="border px-4 py-2">{listing.product}</td>
              <td className="border px-4 py-2">{listing.price}</td>
              <td className="border px-4 py-2">{listing.shippingOptions}</td>
              <td className="border px-4 py-2">{listing.description}</td>
              <td className="border px-4 py-2">
                {/* Implement Edit/Delete as needed */}
                <button className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MyListings;
