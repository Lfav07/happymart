import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './css/UserLoginPage.css';

const LoginPage = ({ onLogin }) => {
 const { t, i18n } = useTranslation();
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
                setMessage(t('login_success'));
                if (onLogin) onLogin();
                navigate('/home');
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    setMessage(t('incorrect_credentials'));
                } else {
                    setMessage(error.response?.data || t('error_occurred'));
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
                setMessage(response.data.message || t('reset_password_success'));
                setShowResetForm(false);
            } catch (error) {
                setMessage(error.response?.data || t('error_occurred'));
            }
        };

        const toggleResetForm = () => {
            setShowResetForm(!showResetForm);
            setEmail('');
            setNewPassword('');
        };

        return (
            <div className="container">
            <button onClick={() => i18n.changeLanguage('pt-BR')}>Português (Brasil)</button>
                        <button onClick={() => i18n.changeLanguage('en')}>English</button>
                <div className="happytext">{t('app_name')}</div>
                <div className="text">{t('login')}</div>
                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="input-data">
                            <input
                                type="text"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <label>{t('username')}</label>
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
                            <label>{t('password')}</label>
                            <div className="underline"></div>
                        </div>
                    </div>
                    <div className="form-row submit-btn">
                        <div className="input-data">
                            <div className="inner"></div>
                            <input type="submit" value={t('login')} /> {}
                        </div>
                    </div>
                    <button type="button" onClick={() => navigate('/register')}>{t('register')}</button>
                </form>

                {message && <p>{message}</p>}

                <button type="button" onClick={toggleResetForm}>
                    {t('forgot_password')}
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
                               <label>{t('email')}</label>
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
                               <label>{t('new_password')}</label>
                               <div className="underline"></div>
                           </div>
                       </div>
                       <div className="form-row submit-btn">
                           <div className="input-data">
                               <div className="inner"></div>
                               <input type="submit" value={t('reset_password')} /> {}
                           </div>
                       </div>
                   </form>
               )}
            </div>
        );
    };

    export default LoginPage;