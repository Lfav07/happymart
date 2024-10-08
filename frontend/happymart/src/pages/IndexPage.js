import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const IndexPage = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    return (
        <div>
            <h1>HappyMarket</h1>
            <button onClick={() => i18n.changeLanguage('pt-BR')}>Português (Brasil)</button>
                        <button onClick={() => i18n.changeLanguage('en')}>English</button>
            <p>{t('chooseAction')}</p>
            <button onClick={() => navigate('/login')}>{t('login')}</button>
            <button onClick={() => navigate('/register')}>{t('register')}</button>
        </div>
    );
};

export default IndexPage;
