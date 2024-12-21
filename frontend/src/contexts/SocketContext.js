// frontend/src/contexts/SocketContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState({});
    const [tradeRequests, setTradeRequests] = useState([]);

    useEffect(() => {
        const newSocket = io('http://localhost:5000', {
            transports: ['websocket', 'polling'],
        });
        setSocket(newSocket);
        console.log('Socket.io client connected');

        return () => newSocket.close();
    }, []);

    useEffect(() => {
        if (!socket) return;

        const username = localStorage.getItem('username');
        if (username) {
            socket.emit('userOnline', username);
            console.log(`Emitted userOnline for: ${username}`);
        }

        socket.on('connect', () => {
            console.log('Connected to Socket.io server');
            if (username) {
                socket.emit('userOnline', username);
            }
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from Socket.io server');
        });

        socket.on('updateUserStatus', (users) => {
            setOnlineUsers(users);
            console.log('Received updateUserStatus:', users);
        });

        socket.on('receiveTradeRequest', (data) => {
            setTradeRequests((prev) => [...prev, data]);
            console.log('Received trade request:', data);
        });

        socket.on('tradeAccepted', (data) => {
            console.log('Trade accepted:', data);
            // Optionally handle trade acceptance
        });

        return () => {
            socket.off('updateUserStatus');
            socket.off('receiveTradeRequest');
            socket.off('tradeAccepted');
        };
    }, [socket]);

    const value = {
        socket,
        onlineUsers,
        tradeRequests,
        setTradeRequests,
    };

    return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};
