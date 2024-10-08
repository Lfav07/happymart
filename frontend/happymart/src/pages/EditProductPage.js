import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './css/EditProductPage.css';

function EditProductPage() {
    const [product, setProduct] = useState(null);
    const [categories, setCategories] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProductAndCategories = async () => {
            try {
                const token = localStorage.getItem('jwt');
                const [productResponse, categoriesResponse] = await Promise.all([
                    axios.get(`http://localhost:8080/products/${id}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    }),
                    axios.get('http://localhost:8080/categories', {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                ]);

                setProduct(productResponse.data);
                setCategories(categoriesResponse.data);


                const existingCategory = categoriesResponse.data.find(cat => cat.id === productResponse.data.category.id);
                if (!existingCategory) {

                    setProduct(prevProduct => ({
                        ...prevProduct,
                        category: categoriesResponse.data[0]
                    }));
                }
            } catch (error) {
                console.error('Error fetching product or categories:', error);
                setErrorMessage('Failed to load product or categories. Please try again.');
            }
        };

        fetchProductAndCategories();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'category') {
            const selectedCategory = categories.find(category => category.id === parseInt(value));
            setProduct(prevProduct => ({ ...prevProduct, category: selectedCategory }));
        } else {
            setProduct(prevProduct => ({ ...prevProduct, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('jwt');
            await axios.put(`http://localhost:8080/products/${id}`, product, {
                headers: { Authorization: `Bearer ${token}` }
            });
            navigate('/admin/products');
        } catch (error) {
            console.error('Error updating the product:', error);
            setErrorMessage('Failed to update the product. Please check your input and try again.');
        }
    };

    if (!product) return <p>Loading...</p>;

    return (
        <div>
            <h1>Edit Product</h1>
            {errorMessage && <p className="error">{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Product Name</label>
                <input type="text" name="name" value={product.name} onChange={handleChange} placeholder="Product Name" required />

                <label htmlFor="image">Image URL</label>
                <input type="text" name="image" value={product.image} onChange={handleChange} placeholder="Image URL" required />

                <label htmlFor="company">Company</label>
                <input type="text" name="company" value={product.company} onChange={handleChange} placeholder="Company" required />

                <label htmlFor="category">Category</label>
                <select name="category" value={product.category?.id || ''} onChange={handleChange} required>
                    <option value="" disabled>Select a category</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>

                <label htmlFor="quantity">Quantity</label>
                <input type="number" name="quantity" value={product.quantity} onChange={handleChange} placeholder="Quantity" required />

                <label htmlFor="price">Price</label>
                <input type="number" name="price" value={product.price} onChange={handleChange} placeholder="Price" required />

                <label htmlFor="weight">Weight</label>
                <input type="number" name="weight" value={product.weight} onChange={handleChange} placeholder="Weight" required />

                <label htmlFor="description">Description</label>
                <textarea name="description" value={product.description} onChange={handleChange} placeholder="Description" required />

                <button type="submit">Update Product</button>
                <button type="button" onClick={() => navigate('/admin/products')}>Back to catalog</button>
            </form>
        </div>
    );
}

export default EditProductPage;
