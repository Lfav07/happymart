import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './css/RegisterPage.css';

const AdminRegisterPage = () => {
    const { t, i18n } = useTranslation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !password || !email) {
            setMessage(t('register.allFieldsRequired'));
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/admin/create-admin', {
                username,
                password,
                email
            });
            setMessage(t('register.registrationSuccessful'));
            setTimeout(() => {
                navigate('/admin/login');
            }, 2000);
        } catch (error) {
            setMessage(error.response ? error.response.data : t('register.errorOccurred'));
        }
    };

    return (
        <div className="container">
        <button onClick={() => i18n.changeLanguage('pt-BR')}>Português (Brasil)</button>
                    <button onClick={() => i18n.changeLanguage('en')}>English</button>
            <h1 className="text">{t('admin.register.title')}</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="input-data">
                        <input
                            type="text"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <label>{t('register.username')}</label>
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
                        <label>{t('register.password')}</label>
                        <div className="underline"></div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="input-data">
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label>{t('register.email')}</label>
                        <div className="underline"></div>
                    </div>
                </div>
                <div className="form-row submit-btn">
                    <div className="input-data">
                        <input type="submit" value={t('register.registerButton')} />
                        <div className="inner"></div>
                    </div>
                </div>
                <div className="form-row submit-btn">
                    <div className="input-data">
                        <input type="button" value={t('register.loginButton')} onClick={() => navigate('/admin/login')} />
                        <div className="inner"></div>
                    </div>
                </div>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AdminRegisterPage;
