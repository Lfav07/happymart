import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {

        const checkAuth = async () => {
            try {
                await axios.get('/api/auth/check');
                setIsAuthenticated(true);
            } catch (error) {
                setIsAuthenticated(false);
            }
        };
        checkAuth();
    }, []);

    const login = async (credentials) => {
        try {
            await axios.post('/api/auth/login', credentials);
            setIsAuthenticated(true);
            navigate('/');
        } catch (error) {

        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
