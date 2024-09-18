import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function EditProductPage() {
    const [product, setProduct] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const token = localStorage.getItem('jwt');
                const response = await axios.get(`http://localhost:8080/products/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setProduct(response.data);
            } catch (error) {
                console.error('There was an error fetching the product!', error);
            }
        };

        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('jwt');
            await axios.put(`http://localhost:8080/products/${id}`, product, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            navigate('/admin/products');
        } catch (error) {
            console.error('There was an error updating the product!', error);
        }
    };

    if (!product) return <p>Loading...</p>;

    return (
        <div>
            <h1>Edit Product</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" value={product.name} onChange={handleChange} placeholder="Product Name" required />
                <input type="text" name="image" value={product.image} onChange={handleChange} placeholder="Image URL" required />
                <input type="text" name="company" value={product.company} onChange={handleChange} placeholder="Company" required />
                <input type="text" name="category" value={product.category} onChange={handleChange} placeholder="Category" required />
                <input type="number" name="quantity" value={product.quantity} onChange={handleChange} placeholder="Quantity" required />
                <input type="number" name="price" value={product.price} onChange={handleChange} placeholder="Price" required />
                <input type="number" name="weight" value={product.weight} onChange={handleChange} placeholder="Weight" required />
                <textarea name="description" value={product.description} onChange={handleChange} placeholder="Description" required />
                <button type="submit">Update Product</button>
            </form>
        </div>
    );
}

export default EditProductPage;
