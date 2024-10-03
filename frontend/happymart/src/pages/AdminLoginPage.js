import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/AdminLoginPage.css';

const AdminLoginPage = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const loginResponse = await axios.post('http://localhost:8080/api/auth/login', {
                username,
                password
            });

            const { token, user } = loginResponse.data;

            localStorage.setItem('jwt', token);
            localStorage.setItem('userId', user.id);
            localStorage.setItem('username', user.username);
            localStorage.setItem('roles', JSON.stringify(user.roles));

            if (user.roles.includes('ROLE_ADMIN')) {
                setMessage('Login successful! Redirecting to home page!');
                setTimeout(() => {
                    navigate('/admin/home');
                }, 2000);

                if (onLogin) onLogin();
            } else {
                localStorage.removeItem('jwt');
                localStorage.removeItem('userId');
                localStorage.removeItem('username');
                localStorage.removeItem('roles');

                setMessage('Access denied. You do not have admin privileges.');
            }
        } catch (error) {
            setMessage(error.response ? error.response.data : 'Error occurred, please try again');
        }
    };

    return (
        <div className="container"> {}
            <div className="text">Admin Login</div>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="input-data">
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <label>Username</label>
                        <div className="underline"></div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="input-data">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <label>Password</label>
                        <div className="underline"></div>
                    </div>
                </div>
                <div className="submit-btn">
                    <div className="input-data">
                        <input type="submit" value="Login" />
                        <div className="inner"></div>
                    </div>
                </div>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AdminLoginPage;
