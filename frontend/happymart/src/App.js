
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import CompleteProductList from './pages/CompleteProductList';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<IndexPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/products" element={<ProtectedRoute element={CompleteProductList} />} />

            </Routes>
        </Router>
    );
};

export default App;
