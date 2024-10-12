import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminRedirect = () => {
    const navigate = useNavigate();

    useEffect(() => {

        window.location.href = 'http://localhost:3000/admin/login';
    }, [navigate]);

    return null;
};

export default AdminRedirect;
