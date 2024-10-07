import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/UserLoginPage.css';

const LoginPage = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showResetForm, setShowResetForm] = useState(false);
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
            if (onLogin) onLogin();
            navigate('/home');
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setMessage('Incorrect username or password.');
            } else {
                setMessage(error.response?.data || 'Error occurred, Please try again');
            }
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/auth/reset-password', {
                email,
                newPassword
            });
            setMessage(response.data.message || 'Password reset successful!');
            setShowResetForm(false);
        } catch (error) {
            setMessage(error.response?.data || 'Error occurred, Please try again');
        }
    };

    const toggleResetForm = () => {
        setShowResetForm(!showResetForm);
        setEmail('');
        setNewPassword('');
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
                <button type="button" onClick={() => navigate('/register')}>Register</button>
            </form>

            {message && <p>{message}</p>}

            <button type="button" onClick={toggleResetForm}>
                Forgot your password?
            </button>

           {showResetForm && (
               <form onSubmit={handleResetPassword}>
                   <div className="form-row">
                       <div className="input-data">
                           <input
                               type="email"
                               required
                               value={email}
                               onChange={(e) => setEmail(e.target.value)}
                           />
                           <label>Email</label> {}
                           <div className="underline"></div>
                       </div>
                   </div>
                   <div className="form-row">
                       <div className="input-data">
                           <input
                               type="password"
                               required
                               value={newPassword}
                               onChange={(e) => setNewPassword(e.target.value)}
                           />
                           <label>New Password</label> {}
                           <div className="underline"></div>
                       </div>
                   </div>
                   <div className="form-row submit-btn">
                       <div className="input-data">
                           <div className="inner"></div>
                           <input type="submit" value="Reset Password"/>
                       </div>
                   </div>
               </form>
           )}

        </div>
    );
};

export default LoginPage;
