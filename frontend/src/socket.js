// src/socket.js
import { io } from 'socket.io-client';

// Initialize the socket instance
const socket = io('https://my-adhoc-dianomi-7a115e6467ad.herokuapp.com');

// Export the socket instance for use in other components
export default socket;