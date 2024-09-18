import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import { UserProvider } from './contexts/UserContext'; // Adjust path as needed
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import CompleteProductList from './pages/CompleteProductList';
import ProtectedRoute from './components/ProtectedRoute';
import AdminProtectedRoute from './components/AdminProtectedRoute';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import LogoutPage from './pages/LogoutPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminLogoutPage from './pages/AdminLogoutPage';
//import AdminProductsPage from './pages/AdminProductsPage';
//import AddProductPage from './pages/AddProductPage';
//import EditProductPage from './pages/EditProductPage';
 import AdminHome from './pages/AdminHome';

const App = () => {
    return (
        <UserProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<IndexPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/products" element={<ProtectedRoute><CompleteProductList /></ProtectedRoute>} />
                    <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
                    <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
                    <Route path="/logout" element={<ProtectedRoute><LogoutPage /></ProtectedRoute>} />
                    <Route path="/admin/login" element={<AdminLoginPage />} />
                   <Route path="/admin/home" element={<AdminProtectedRoute element={AdminHome} />} />
                   <Route path="/admin/logout" element={<AdminProtectedRoute element={AdminLogoutPage} />} />


                </Routes>
            </Router>
        </UserProvider>
    );
};

export default App;
