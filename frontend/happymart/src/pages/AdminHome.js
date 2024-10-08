import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './css/AdminHome.css';

const AdminHome = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const currentUsername = localStorage.getItem('username') || t('guest');

    return (
        <div className="admin-home-container">
            <button onClick={() => i18n.changeLanguage('pt-BR')}>Português (Brasil)</button>
            <button onClick={() => i18n.changeLanguage('en')}>English</button>

            <h1>{t('app_name')}</h1>  {}
            <h2>{t('welcome_admin', { name: currentUsername })}</h2>  {}
            <p>{t('choose_action')}</p>  {}

            <button onClick={() => navigate('/admin/products')}>{t('manage_products')}</button>  {}
            <button onClick={() => navigate('/admin/categories')}>{t('manage_categories')}</button>
            <button onClick={() => navigate('/admin/carts')}>{t('manage_carts')}</button>
            <button onClick={() => navigate('/admin/users')}>{t('manage_users')}</button>
            <button onClick={() => navigate('/admin/orders')}>{t('manage_orders')}</button>
            <button onClick={() => navigate('/admin/logout')}>{t('logout')}</button>
        </div>
    );
};

export default AdminHome;
