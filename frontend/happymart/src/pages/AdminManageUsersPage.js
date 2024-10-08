import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function AdminManageUsersPage() {
    const { t } = useTranslation();
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('jwt');
                const response = await axios.get('http://localhost:8080/api/auth/users', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users!', error);
                if (error.response && error.response.status === 403) {
                    navigate('/admin/login', { replace: true });
                }
            }
        };

        fetchUsers();
    }, [navigate]);

    const handleDeleteUser = async (userId) => {
        try {
            const token = localStorage.getItem('jwt');
            await axios.delete(`http://localhost:8080/api/auth/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUsers(users.filter(user => user.id !== userId));
        } catch (error) {
            console.error('Error deleting user!', error);
        }
    };

    return (
        <div className="admin-users-list">
            <h1>{t('usersList')}</h1>
            <ul>
                {users.length > 0 ? (
                    users.map(user => (
                        <li key={user.id}>
                            <strong>{t('username')}:</strong> {user.username} <br/>
                            <strong>{t('email')}:</strong> {user.email} <br/>
                            <button onClick={() => handleDeleteUser(user.id)}>{t('deleteUser')}</button>
                        </li>
                    ))
                ) : (
                    <li>{t('noUsersFound')}</li>
                )}
            </ul>
            <button onClick={() => navigate('/admin/home')}>{t('home')}</button>
        </div>
    );
}

export default AdminManageUsersPage;
