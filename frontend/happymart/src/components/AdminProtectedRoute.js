import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminProtectedRoute = ({ element: Element, ...rest }) => {
    const token = localStorage.getItem('jwt');
    const securityCode = localStorage.getItem('securityCode');


    const isAdminAuthenticated = token && securityCode;

    return isAdminAuthenticated ? <Element {...rest} /> : <Navigate to="/admin/login" replace />;
};

export default AdminProtectedRoute;
