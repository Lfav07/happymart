import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/UserLoginPage.css';

const LoginPage = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', {
                username,
                password
            });
            const { token, user } = response.data;
            localStorage.setItem('jwt', token);
            localStorage.setItem('userId', user.id);
            localStorage.setItem('username', user.username);
            setMessage('Login successful! Redirecting to home page!');
            setTimeout(() => {
                navigate('/home');
            }, 2000);
            if (onLogin) onLogin();
        } catch (error) {
            setMessage(error.response ? error.response.data : 'Error occurred, Please try again');
        }
    };

    return (
        <div className="container">

                <div className="happytext">HappyMarket</div>

            <div className="text">Login</div>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="input-data">
                        <input
                            type="text"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <label>Username</label>
                        <div className="underline"></div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="input-data">
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label>Password</label>
                        <div className="underline"></div>
                    </div>
                </div>
                <div className="form-row submit-btn">
                    <div className="input-data">
                        <div className="inner"></div>
                        <input type="submit" value="Login" />
                    </div>
                </div>
                <button type="button" onClick={() => navigate('/register')}>Go to Register</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default LoginPage;
