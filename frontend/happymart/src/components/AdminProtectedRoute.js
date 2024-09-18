import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminProtectedRoute = ({ element: Element, ...rest }) => {
    const token = localStorage.getItem('jwt');

    return token ? <Element {...rest} /> : <Navigate to="/admin/login" replace />;
};

export default AdminProtectedRoute;
