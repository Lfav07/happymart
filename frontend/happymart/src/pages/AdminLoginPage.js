import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/AdminLoginPage.css';
import { useTranslation } from 'react-i18next';

const AdminLoginPage = ({ onLogin }) => {
    const { t, i18n } = useTranslation();  // useTranslation hook for translations
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
                setMessage(t('login_success'));  // use translation for success message
                setTimeout(() => {
                    navigate('/admin/home');
                }, 2000);

                if (onLogin) onLogin();
            } else {
                localStorage.removeItem('jwt');
                localStorage.removeItem('userId');
                localStorage.removeItem('username');
                localStorage.removeItem('roles');

                setMessage(t('access_denied'));  // use translation for access denied
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setMessage(t('incorrect_credentials'));  // translate error messages
            } else {
                setMessage(error.response?.data || t('error_occurred'));
            }
        }
    };

    return (
        <div className="container">
            <button onClick={() => i18n.changeLanguage('pt-BR')}>Português (Brasil)</button>
            <button onClick={() => i18n.changeLanguage('en')}>English</button>
            <div className="text">{t('admin_login')}</div>  {/* translate admin login text */}
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="input-data">
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <label>{t('username')}</label>  {/* translate label */}
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
                        <label>{t('password')}</label>  {/* translate label */}
                        <div className="underline"></div>
                    </div>
                </div>
                <div className="submit-btn">
                    <div className="input-data">
                        <input type="submit" value={t('login')} />  {/* translate button */}
                        <div className="inner"></div>
                    </div>
                </div>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AdminLoginPage;
