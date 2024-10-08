import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const HomePage = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const currentUsername = localStorage.getItem('username') || t('guest');

    return (
        <div>
            <h1>{t('app_name')}</h1> {}

            <button onClick={() => i18n.changeLanguage('pt-BR')}>Português (Brasil)</button>
            <button onClick={() => i18n.changeLanguage('en')}>English</button>

            <h2>{t('welcome', { name: currentUsername })}</h2> {}
            <p>{t('choose_action')}</p> {}
            <button onClick={() => navigate('/products')}>{t('products_catalog')}</button> {}
            <button onClick={() => navigate('/cart')}>{t('cart')}</button>
            <button onClick={() => navigate('/orders')}>{t('orders')}</button>
            <button onClick={() => navigate('/logout')}>{t('logout')}</button>
        </div>
    );
};

export default HomePage;
