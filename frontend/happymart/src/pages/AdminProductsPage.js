import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/AdminProductsPage.css';

function AdminProductsPage() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const token = localStorage.getItem('jwt');
                const response = await axios.get('http://localhost:8080/products', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setProducts(response.data);
            } catch (error) {
                console.error('There was an error fetching the products!', error);
                if (error.response && error.response.status === 403) {
                    navigate('/login', { replace: true });
                }
            }
        };

        fetchProducts();
    }, [navigate]);

    const handleAddProduct = () => {
        navigate('/admin/products/add');
    };

    const handleEditProduct = (id) => {
        navigate(`/admin/products/edit/${id}`);
    };

    const handleDeleteProduct = async (id) => {
        try {
            const token = localStorage.getItem('jwt');
            await axios.delete(`http://localhost:8080/products/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setProducts(products.filter(product => product.id !== id));
        } catch (error) {
            console.error('There was an error deleting the product!', error);
            if (error.response && error.response.status === 403) {
                navigate('/login', { replace: true });
            }
        }
    };

    return (
        <div className="CompleteProductList">
            <h1>Product List</h1>
            <button onClick={handleAddProduct}>Add Product</button>
            <ul>
                {products.length > 0 ? (
                    products.map(product => (
                        <li key={product.id}>
                            <img src={product.image} alt={product.name} />
                            <div>
                                <strong>{product.name}</strong>
                                <strong>Company:</strong> {product.company}
                                <strong>Category:</strong> {product.category.name}
                                <strong>Price:</strong> ${product.price}
                                <strong>Quantity:</strong> {product.quantity}
                                <strong>Weight:</strong> {product.weight}g
                                <strong>Description:</strong> {product.description}
                                <div>
                                    <button onClick={() => handleEditProduct(product.id)}>Edit</button>
                                    <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                                </div>
                            </div>
                        </li>
                    ))
                ) : (
                    <li>No products found.</li>
                )}
            </ul>
            <button onClick={() => navigate('/admin/home')}>Home</button>
        </div>
    );
}

export default AdminProductsPage;
