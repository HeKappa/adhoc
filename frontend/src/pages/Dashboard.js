// frontend/src/pages/Dashboard.js
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSocket } from '../contexts/SocketContext';
import axios from 'axios';

function Dashboard() {
    const navigate = useNavigate();
    const username = localStorage.getItem('username');
    const { onlineUsers, tradeRequests, setTradeRequests, socket } = useSocket();

    React.useEffect(() => {
        if (!username) {
            navigate('/');
        }
    }, [username, navigate]);

    const handleLogout = () => {
        const currentUsername = localStorage.getItem('username');
        localStorage.removeItem('username');
        if (socket) {
            socket.emit('userOffline', currentUsername);
            console.log(`Emitted userOffline for: ${currentUsername}`);
        }
        navigate('/');
    };

    const handleAcceptTradeRequest = async (request) => {
        console.log('Handling trade acceptance:', request);
        if (window.confirm(`Accept Trade Request from ${request.sender}: ${request.description}`)) {
            try {
                // Fetch the listing details
                const listingRes = await axios.get(`https://my-adhoc-dianomi-7a115e6467ad.herokuapp.com/api/trade-listings/${request.listingId}`);
                const listing = listingRes.data;

                // Create Trade
                const tradeRes = await axios.post('https://my-adhoc-dianomi-7a115e6467ad.herokuapp.com/api/trades', {
                    offerBy: request.sender,
                    acceptedBy: username,
                    productOffered: request.offeredProduct,
                    productGotten: listing.product
                });

                console.log('Trade created:', tradeRes.data);

                // Optionally, emit a socket event to notify the trade acceptance
                // e.g., to inform the sender

                alert('Trade accepted!');
                setTradeRequests(prev => prev.filter(req => req !== request));
            } catch (error) {
                alert('Error accepting trade');
                console.error('Error accepting trade:', error);
            }
        }
    };

    const handleDeclineTradeRequest = (request) => {
        if (window.confirm(`Decline Trade Request from ${request.sender}: ${request.description}`)) {
            // Optionally, notify the sender about the trade decline
            // Remove the request from tradeRequests
            setTradeRequests(prev => prev.filter(req => req !== request));
        }
    };

    return (
        <div className="flex flex-col h-screen">
            {/* Navbar */}
            <nav className="flex justify-between items-center p-4 bg-blue-500 text-white">
                <div>Welcome, {username}</div>
                <div className="flex items-center space-x-4">
                    <button onClick={() => navigate('/dashboard/change-password')} className="hover:underline">Profile</button>
                    <button onClick={handleLogout} className="hover:underline">Logout</button>
                    {tradeRequests.length > 0 && (
                        <div className="relative">
                            <span className="bg-red-500 rounded-full px-2 py-1 text-xs">{tradeRequests.length}</span>
                            <button className="ml-2">
                                Trade Requests
                            </button>
                        </div>
                    )}
                </div>
            </nav>

            {/* Trade Requests Modal */}
            {tradeRequests.length > 0 && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
                        <h3 className="text-lg mb-4">Incoming Trade Requests</h3>
                        <ul>
                            {tradeRequests.map((request, index) => (
                                <li key={index} className="mb-4">
                                    <p><strong>From:</strong> {request.sender}</p>
                                    <p><strong>Description:</strong> {request.description}</p>
                                    <button 
                                        onClick={() => handleAcceptTradeRequest(request)} 
                                        className="px-3 py-1 bg-green-500 text-white rounded mr-2"
                                    >
                                        Accept
                                    </button>
                                    <button 
                                        onClick={() => handleDeclineTradeRequest(request)} 
                                        className="px-3 py-1 bg-red-500 text-white rounded"
                                    >
                                        Decline
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <button 
                            onClick={() => setTradeRequests([])} 
                            className="mt-4 px-4 py-2 bg-gray-500 text-white rounded"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* Body */}
            <div className="flex flex-1">
                {/* Sidebar */}
                <aside className="w-1/5 bg-gray-200 p-4">
                    <button
                        className="w-full mb-2 px-4 py-2 bg-green-500 text-white rounded"
                        onClick={() => navigate('/dashboard/my-products')}
                    >
                        My Products
                    </button>
                    <button
                        className="w-full mb-2 px-4 py-2 bg-green-500 text-white rounded"
                        onClick={() => navigate('/dashboard/my-listings')}
                    >
                        My Listings
                    </button>
                    <button
                        className="w-full mb-2 px-4 py-2 bg-green-500 text-white rounded"
                        onClick={() => navigate('/dashboard/trade-interface')}
                    >
                        Trade Interface
                    </button>
                    <button
                        className="w-full px-4 py-2 bg-green-500 text-white rounded"
                        onClick={() => navigate('/dashboard/trade-history')}
                    >
                        Trade History
                    </button>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-4 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default Dashboard;
