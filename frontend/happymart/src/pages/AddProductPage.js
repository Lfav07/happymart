import React, { useState } from 'react';
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
    const navigate = useNavigate();

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
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
                <input type="text" name="category" value={product.category} onChange={handleChange} placeholder="Category" required />
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
