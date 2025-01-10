// frontend/src/pages/TradeInterface.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSocket } from '../contexts/SocketContext'; 

function TradeInterface() {
    const { socket, onlineUsers } = useSocket();
    const username = localStorage.getItem('username');
    const [listings, setListings] = useState([]);
    const [availableProducts, setAvailableProducts] = useState([]);
    const [selectedListing, setSelectedListing] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState('');

    useEffect(() => {
        fetchListings();
        fetchAvailableProducts();
    }, []);

    const fetchListings = async () => {
        try {
            const res = await axios.get('https://my-adhoc-dianomi-7a115e6467ad.herokuapp.com/api/trade-listings');
            // Exclude own listings
            const otherListings = res.data.filter(listing => listing.postedBy !== username);
            setListings(otherListings);
            console.log('Fetched Listings:', otherListings);
        } catch (error) {
            console.error('Error fetching listings:', error);
        }
    };

    const fetchAvailableProducts = async () => {
        try {
            const res = await axios.get('https://my-adhoc-dianomi-7a115e6467ad.herokuapp.com/api/products');
            const myProducts = res.data.filter(product => product.offeredBy === username);
            setAvailableProducts(myProducts);
            console.log('Fetched Available Products:', myProducts);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleListingClick = (listing) => {
        if (onlineUsers[listing.postedBy]) {
            setSelectedListing(listing);
            console.log(`Selected Listing: ${listing._id}`);
        }
    };

    const handleSendTradeRequest = () => {
        if (!selectedProduct) {
            alert('Please select a product to offer.');
            return;
        }

        const tradeRequest = {
            sender: username,
            receiver: selectedListing.postedBy,
            listingId: selectedListing._id,
            offeredProduct: selectedProduct,
            description: `Trade for ${selectedListing.product}`
        };

        socket.emit('sendTradeRequest', tradeRequest);
        console.log('Sent Trade Request:', tradeRequest);
        alert('Trade request sent!');
        setSelectedListing(null);
        setSelectedProduct('');
    };

    return (
        <div>
            <h2 className="text-xl mb-4">Trade Interface</h2>
            <div className="grid grid-cols-3 gap-4">
                {listings.map(listing => {
                    const isOnline = onlineUsers[listing.postedBy];
                    return (
                        <div
                            key={listing._id}
                            className={`p-4 border rounded cursor-pointer ${isOnline ? 'bg-green-100' : 'bg-gray-200 cursor-not-allowed'}`}
                            onClick={() => isOnline && handleListingClick(listing)}
                        >
                            <h3 className="text-lg">{listing.product}</h3>
                            <p>Posted By: {listing.postedBy}</p>
                            <p>Price: {listing.price}</p>
                            <p>Shipping: {listing.shippingOptions}</p>
                            <p>{listing.description}</p>
                            <span className={`inline-block mt-2 px-2 py-1 text-xs rounded ${isOnline ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'}`}>
                                {isOnline ? 'Online' : 'Offline'}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* Trade Request Modal */}
            {selectedListing && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded">
                        <h3 className="text-lg mb-4">Trade with {selectedListing.postedBy}</h3>
                        <p>Listing: {selectedListing.product}</p>
                        <div className="mt-4">
                            <label className="block mb-1">Select Product to Offer</label>
                            <select
                                value={selectedProduct}
                                onChange={(e) => setSelectedProduct(e.target.value)}
                                className="w-full px-3 py-2 border rounded"
                            >
                                <option value="">Select Product</option>
                                {availableProducts.map(prod => (
                                    <option key={prod._id} value={prod.name}>{prod.name}</option>
                                ))}
                            </select>
                        </div>
                        <button
                            onClick={handleSendTradeRequest}
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                        >
                            Send Trade Request
                        </button>
                        <button
                            onClick={() => setSelectedListing(null)}
                            className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* Optional: Display Online Users for Debugging */}
            {/* <OnlineUsersDebug /> */}
        </div>
    );
}

export default TradeInterface;
