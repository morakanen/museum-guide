import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/userstateSlice';
import './Css/Loginpage.css';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import LoadingOverlay from '../components/LoadingOverlay';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false); // State for showing overlay
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5005/api/login', { username, password });
            const token = response.data.token;
            localStorage.setItem('token', token); // Persist the token
            const user = jwtDecode(token); // Decode to get user info
            dispatch(loginSuccess({ token, user })); // Update Redux store with user info
            
            setIsLoading(true); // Show the overlay

            // Delay for the overlay display before redirecting and refreshing
            setTimeout(() => {
                setIsLoading(false); // Hide overlay after timeout
                navigate('/homepage'); // Navigate to homepage
                window.location.reload(); // Refresh the page
            }, 2000);
        } catch (err) {
            setError('Invalid username or password');
        }
    };

    return (
        <div className="login-container">
            {isLoading && <LoadingOverlay />} {/* Show overlay if isLoading is true */}

            <form onSubmit={handleLogin} className="login-form">
                <h2>Login</h2>
                {error && <p className="error">{error}</p>}
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;
