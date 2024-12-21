// src/socket.js
import { io } from 'socket.io-client';

// Initialize the socket instance
const socket = io('http://localhost:5000');

// Export the socket instance for use in other components
export default socket;