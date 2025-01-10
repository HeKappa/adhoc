// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

dotenv.config();

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const tradeListingRoutes = require('./routes/tradeListingRoutes');
const tradeRoutes = require('./routes/tradeRoutes');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_ORIGIN || "http://localhost:3000", // Frontend URL
        methods: ["GET", "POST"]
    }
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/trade-listings', tradeListingRoutes);
app.use('/api/trades', tradeRoutes);

// Socket.io for real-time communication
let onlineUsers = {}; // username: [socketIds]

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Handle user online status
    socket.on('userOnline', (username) => {
        console.log(`User Online: ${username}`);
        if (onlineUsers[username]) {
            onlineUsers[username].push(socket.id);
        } else {
            onlineUsers[username] = [socket.id];
        }
        io.emit('updateUserStatus', onlineUsers);
    });

    // Handle trade requests
    socket.on('sendTradeRequest', (data) => {
        console.log('Trade Request Received:', data);
        const receiverSockets = onlineUsers[data.receiver];
        if (receiverSockets && receiverSockets.length > 0) {
            receiverSockets.forEach(receiverSocketId => {
                io.to(receiverSocketId).emit('receiveTradeRequest', data);
                console.log(`Trade Request sent to ${data.receiver} at socket ${receiverSocketId}`);
            });
        } else {
            console.log(`User ${data.receiver} is offline. Trade request not sent.`);
        }
    });

    // Handle trade acceptance (if needed)
    socket.on('tradeAccepted', (data) => {
        console.log('Trade Accepted:', data);
        // Implement trade acceptance logic if needed
    });

    // Handle user offline on disconnect
    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
        // Remove socket ID from onlineUsers
        for (const [username, socketIds] of Object.entries(onlineUsers)) {
            const index = socketIds.indexOf(socket.id);
            if (index !== -1) {
                socketIds.splice(index, 1);
                if (socketIds.length === 0) {
                    delete onlineUsers[username];
                    console.log(`User Offline: ${username}`);
                }
                break;
            }
        }
        io.emit('updateUserStatus', onlineUsers);
    });
});

const path = require('path');

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
    });
}



// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    server.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    });
})
.catch((error) => {
    console.error('MongoDB connection error:', error);
});
