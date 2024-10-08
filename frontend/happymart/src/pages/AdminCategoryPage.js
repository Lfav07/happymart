import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/AdminCategoryPage.css';

function AdminCategoryPage() {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const [editCategory, setEditCategory] = useState({ id: null, name: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const token = localStorage.getItem('jwt');
                const response = await axios.get('http://localhost:8080/categories', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
                setErrorMessage('Failed to fetch categories.');
            }
        };

        fetchCategories();
    }, []);

    const handleAddCategory = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('jwt');
            const response = await axios.post('http://localhost:8080/categories', { name: newCategory }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCategories([...categories, response.data]);
            setNewCategory('');
        } catch (error) {
            console.error('Error adding category:', error);
            setErrorMessage('Failed to add category.');
        }
    };

    const handleEditCategory = async (e) => {
        e.preventDefault();
        if (editCategory.name.trim() === '') {
            setErrorMessage('Category name cannot be empty.');
            return;
        }
        try {
            const token = localStorage.getItem('jwt');
            const response = await axios.put(`http://localhost:8080/categories/${editCategory.id}`, { name: editCategory.name }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCategories(categories.map(cat => (cat.id === editCategory.id ? response.data : cat)));
            setEditCategory({ id: null, name: '' });
        } catch (error) {
            console.error('Error updating category:', error);
            setErrorMessage('Failed to update category.');
        }
    };

    const handleDeleteCategory = async (id) => {
        try {
            const token = localStorage.getItem('jwt');
            await axios.delete(`http://localhost:8080/categories/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCategories(categories.filter(cat => cat.id !== id));
        } catch (error) {
            console.error('Error deleting category:', error);
            setErrorMessage('Failed to delete category.');
        }
    };

    const handleEditClick = (category) => {
        setEditCategory({ id: category.id, name: category.name });
    };

    const handleChangeEdit = (e) => {
        setEditCategory({ ...editCategory, name: e.target.value });
    };

    return (
        <div className="admin-container">
            <h1 className="admin-title">Admin Category Management</h1>
            {errorMessage && <p className="error">{errorMessage}</p>}

            <h2 className="admin-subtitle">Add New Category</h2>
            <form className="category-form" onSubmit={handleAddCategory}>
                <input
                    className="category-input"
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Category Name"
                    required
                />
                <button className="category-button" type="submit">Add Category</button>
            </form>

            <h2 className="admin-subtitle">Existing Categories</h2>
            <ul className="category-list">
                {categories.map(category => (
                    <li key={category.id} className="category-item">
                        {editCategory.id === category.id ? (
                            <>
                                <input
                                    type="text"
                                    value={editCategory.name}
                                    onChange={handleChangeEdit}
                                    placeholder="Category Name"
                                />
                                <button className="category-button" onClick={handleEditCategory}>Save</button>
                            </>
                        ) : (
                            <>
                                {category.name}
                                <button className="edit-button" onClick={() => handleEditClick(category)}>Edit</button>
                                <button className="delete-button" onClick={() => handleDeleteCategory(category.id)}>Delete</button>
                            </>

                        )}

                    </li>

                ))}
            </ul>
 <button onClick={() => navigate('/admin/home')}>Home</button>
        </div>
    );
}

export default AdminCategoryPage;
