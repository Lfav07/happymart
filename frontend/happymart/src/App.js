import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import { UserProvider } from './contexts/UserContext';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import CompleteProductList from './pages/CompleteProductList';
import ProtectedRoute from './components/ProtectedRoute';
import AdminProtectedRoute from './components/AdminProtectedRoute';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import LogoutPage from './pages/LogoutPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminRegisterPage from './pages/AdminRegisterPage';
import AdminLogoutPage from './pages/AdminLogoutPage';
import AdminProductsPage from './pages/AdminProductsPage';
import AddProductPage from './pages/AddProductPage';
import AdminHome from './pages/AdminHome';
import AdminManageUsersPage from './pages/AdminManageUsersPage';
import EditProductPage from './pages/EditProductPage';
import AdminCartPage from './pages/AdminCartPage';
import OrderPage from './pages/OrderPage';
import AdminOrderPage from './pages/AdminOrderPage';
import AdminRedirect from './pages/AdminRedirect';
import AdminCategoryPage from './pages/AdminCategoryPage';

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
                    <Route path="/orders" element={<ProtectedRoute element={OrderPage} />} />
                    <Route path="/logout" element={<ProtectedRoute element={LogoutPage} />} />
                    <Route path="/admin/login" element={<AdminLoginPage />} />
                    <Route path="/admin/register" element={<AdminRegisterPage />} />
                    <Route path="/admin/products" element={<AdminProtectedRoute element={AdminProductsPage} />} />
                    <Route path="/admin/products/edit/:id" element={<AdminProtectedRoute element={EditProductPage} />} />
                    <Route path="/admin/products/add" element={<AdminProtectedRoute element={AddProductPage} />} />
                    <Route path="/admin/home" element={<AdminProtectedRoute element={AdminHome} />} />
                    <Route path="/admin/logout" element={<AdminProtectedRoute element={AdminLogoutPage} />} />
                    <Route path="/admin/users" element={<AdminProtectedRoute element={AdminManageUsersPage} />} />\
                    <Route path="/admin/carts" element={<AdminProtectedRoute element={AdminCartPage} />} />
                    <Route path="/admin/orders" element={<AdminProtectedRoute element={AdminOrderPage} />} />
                    <Route path="/admin/categories" element={<AdminProtectedRoute element={AdminCategoryPage} />} />

                    <Route path="/admin/*" element={<AdminProtectedRoute element={AdminCategoryPage} />} />
                </Routes>
            </Router>
        </UserProvider>
    );
};

export default App;
