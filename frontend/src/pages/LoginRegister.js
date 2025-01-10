// frontend/src/pages/LoginRegister.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../contexts/SocketContext';

function LoginRegister() {
    const [isRegister, setIsRegister] = useState(false);
    const [form, setForm] = useState({ username: '', email: '', password: '' });
    const navigate = useNavigate();
    const { socket } = useSocket();

    const toggleForm = () => {
        setIsRegister(!isRegister);
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isRegister) {
                await axios.post('https://sleepy-lowlands-38727-25aa40ad3302.herokuapp.com/api/users/register', form);
                alert('Registration successful. Please login.');
                setIsRegister(false);
            } else {
                const res = await axios.post('https://sleepy-lowlands-38727-25aa40ad3302.herokuapp.com/api/users/login', form);
                if (res.data.message === 'Login successful') {
                    localStorage.setItem('username', res.data.username);
                    if (socket) {
                        socket.emit('userOnline', res.data.username);
                    }
                    navigate('/dashboard');
                }
            }
        } catch (error) {
            alert(error.response.data.message || 'Error occurred');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="w-96 p-8 bg-white rounded shadow">
                <h2 className="text-2xl mb-4 text-center">{isRegister ? 'Register' : 'Login'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-1">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>
                    {isRegister && (
                        <div className="mb-4">
                            <label className="block mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border rounded"
                            />
                        </div>
                    )}
                    <div className="mb-4">
                        <label className="block mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-500 text-white rounded"
                    >
                        {isRegister ? 'Register' : 'Login'}
                    </button>
                </form>
                <button
                    onClick={toggleForm}
                    className="mt-4 text-blue-500 hover:underline w-full"
                >
                    {isRegister ? 'Already have an account? Login' : 'New user? Register'}
                </button>
            </div>
        </div>
    );
}

export default LoginRegister;
