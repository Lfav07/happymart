import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddProductPage() {
    const [product, setProduct] = useState({
        name: '',
        image: '',
        company: '',
        category: '',
        quantity: '',
        price: '',
        weight: '',
        description: ''
    });
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const token = localStorage.getItem('jwt');
                const response = await axios.get('http://localhost:8080/categories', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('jwt');
            await axios.post('http://localhost:8080/products', product, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            navigate('/admin/products');
        } catch (error) {
            console.error('There was an error adding the product!', error);
        }
    };

    return (
        <div>
            <h1>Add Product</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" value={product.name} onChange={handleChange} placeholder="Product Name" required />
                <input type="text" name="image" value={product.image} onChange={handleChange} placeholder="Image URL" required />
                <input type="text" name="company" value={product.company} onChange={handleChange} placeholder="Company" required />

                <label htmlFor="category">Category</label>
                <select name="category" value={product.category} onChange={handleChange} required>
                    <option value="" disabled>Select a category</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>

                <input type="number" name="quantity" value={product.quantity} onChange={handleChange} placeholder="Quantity" required />
                <input type="number" name="price" value={product.price} onChange={handleChange} placeholder="Price" required />
                <input type="number" name="weight" value={product.weight} onChange={handleChange} placeholder="Weight" required />
                <textarea name="description" value={product.description} onChange={handleChange} placeholder="Description" required />

                <button type="submit">Add Product</button>
            </form>
        </div>
    );
}

export default AddProductPage;
