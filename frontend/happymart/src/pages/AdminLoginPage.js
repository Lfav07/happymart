import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLoginPage = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [securityCode, setSecurityCode] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/api/admin/validate-security-code', { securityCode });

            if (!response.data) {
                setMessage('Invalid security code.');
                return;
            }

            const loginResponse = await axios.post('http://localhost:8080/api/auth/login', {
                username,
                password
            });

            // Destructure the token and user from the login response
            const { token, user } = loginResponse.data;

            localStorage.setItem('jwt', token);
            localStorage.setItem('userId', user.id); // Store the user ID
            localStorage.setItem('username', username);
            localStorage.setItem('securityCode', securityCode);

            setMessage('Login successful! Redirecting to home page!');
            setTimeout(() => {
                navigate('/admin/home');
            }, 2000);

            if (onLogin) onLogin();
        } catch (error) {
            setMessage(error.response ? error.response.data : 'Error occurred, please try again');
        }
    };



    return (
        <div>
            <h1>Admin Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label>Employee Security Code:</label>
                    <input
                        type="text"
                        value={securityCode}
                        onChange={(e) => setSecurityCode(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AdminLoginPage;
