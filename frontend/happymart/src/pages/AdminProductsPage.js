import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
                    navigate('/login', { replace: true }); // Redirect to login
                }
            }
        };

        fetchProducts();
    }, [navigate]);

    const handleAddProduct = () => {
        navigate('/admin/products/add'); // Navigate to the add product page
    };

    const handleEditProduct = (id) => {
        navigate(`/admin/products/edit/${id}`); // Navigate to the edit product page
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
                navigate('/login', { replace: true }); // Redirect to login
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
                            <strong>{product.name}</strong> <br/>
                            <img src={product.image} alt={product.name} width="100" /> <br/>
                            <strong>Company:</strong> {product.company} <br/>
                            <strong>Category:</strong> {product.category.name} <br/>
                            <strong>Price:</strong> ${product.price} <br/>
                            <strong>Quantity:</strong> {product.quantity} <br/>
                            <strong>Weight:</strong> {product.weight}g <br/>
                            <strong>Description:</strong> {product.description} <br/>
                            <button onClick={() => handleEditProduct(product.id)}>Edit</button>
                            <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
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
