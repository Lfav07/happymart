
import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminProtectedRoute = ({ element: Component, ...rest }) => {
    const token = localStorage.getItem('jwt');


    return token ? <Component {...rest} /> : <Navigate to="/admin/login" replace />;
};

export default AdminProtectedRoute;
