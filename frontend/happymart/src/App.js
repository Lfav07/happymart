
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import { UserProvider } from './contexts/UserContext'; // Adjust path as needed
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import CompleteProductList from './pages/CompleteProductList';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage'
import CartPage from './pages/CartPage'
import LogoutPage from './pages/LogoutPage'

const App = () => {
    return (
    <UserProvider>
        <Router>
            <Routes>
                <Route path="/" element={<IndexPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/products" element={<ProtectedRoute element={CompleteProductList} />} />
                <Route path="/cart" element={<ProtectedRoute element={CartPage} />} />
                <Route path="/home" element={<ProtectedRoute element={HomePage} />} />
                <Route path="/logout" element={<ProtectedRoute element={LogoutPage} />} />
            </Routes>
        </Router>
        </UserProvider>
    );
};

export default App;
