
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, ...rest }) => {
    const token = localStorage.getItem('jwt');


    return token ? <Component {...rest} /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
