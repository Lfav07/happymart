import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminManageUsersPage() {
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
            <h1>Users List</h1>
            <ul>
                {users.length > 0 ? (
                    users.map(user => (
                        <li key={user.id}>
                            <strong>Username:</strong> {user.username} <br/>
                            <strong>Email:</strong> {user.email} <br/>
                            <button onClick={() => handleDeleteUser(user.id)}>Delete User</button>
                        </li>
                    ))
                ) : (
                    <li>No users found.</li>
                )}
            </ul>
            <button onClick={() => navigate('/admin/home')}>Home</button>
        </div>
    );
}

export default AdminManageUsersPage;
