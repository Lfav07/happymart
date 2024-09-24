import React from 'react';
 import { Navigate } from 'react-router-dom';

 const AdminProtectedRoute = ({ element: Element, ...rest }) => {
     // Retrieve roles from localStorage and parse the JSON string
     const roles = JSON.parse(localStorage.getItem('roles')) || [];
     const isAdminAuthenticated = roles.includes('ROLE_ADMIN'); // Check if ROLE_ADMIN is included in roles

     return isAdminAuthenticated ? <Element {...rest} /> : <Navigate to="/admin/login" replace />;
 };

 export default AdminProtectedRoute;
