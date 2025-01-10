// frontend/src/pages/MyProducts.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MyProducts() {
  const username = localStorage.getItem('username');
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', category: '', location: '', quantity: '' });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get('https://my-adhoc-dianomi-7a115e6467ad.herokuapp.com/api/products');
    const myProducts = res.data.filter(product => product.offeredBy === username);
    setProducts(myProducts);
  };

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://my-adhoc-dianomi-7a115e6467ad.herokuapp.com/api/products', { ...form, offeredBy: username });
      fetchProducts();
      setForm({ name: '', category: '', location: '', quantity: '' });
    } catch (error) {
      alert('Error adding product');
    }
  };

  return (
    <div>
      <h2 className="text-xl mb-4">My Products</h2>
      {/* Add Product Form */}
      <form onSubmit={handleAddProduct} className="mb-6">
        <div className="flex space-x-2">
          <input 
            type="text" 
            name="name" 
            value={form.name} 
            onChange={handleChange}
            placeholder="Name" 
            required 
            className="px-3 py-2 border rounded flex-1"
          />
          <input 
            type="text" 
            name="category" 
            value={form.category} 
            onChange={handleChange}
            placeholder="Category" 
            required 
            className="px-3 py-2 border rounded flex-1"
          />
          <input 
            type="text" 
            name="location" 
            value={form.location} 
            onChange={handleChange}
            placeholder="Location" 
            required 
            className="px-3 py-2 border rounded flex-1"
          />
          <input 
            type="number" 
            name="quantity" 
            value={form.quantity} 
            onChange={handleChange}
            placeholder="Quantity" 
            required 
            className="px-3 py-2 border rounded w-24"
          />
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Add</button>
        </div>
      </form>

      {/* List of Products */}
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-300">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Location</th>
            <th className="px-4 py-2">Quantity</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(prod => (
            <tr key={prod._id} className="text-center">
              <td className="border px-4 py-2">{prod.name}</td>
              <td className="border px-4 py-2">{prod.category}</td>
              <td className="border px-4 py-2">{prod.location}</td>
              <td className="border px-4 py-2">{prod.quantity}</td>
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

export default MyProducts;
